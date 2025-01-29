import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();

const rawUserData: any[] = JSON.parse(
  fs.readFileSync('prisma/MOCK_USER_DATA.json', 'utf-8'),
);
const rawInviteData: any[] = JSON.parse(
  fs.readFileSync('prisma/MOCK_INVITE_DATA.json', 'utf-8'),
);

const userData = rawUserData.map((user): Prisma.UserCreateManyInput => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
    email: user.email,
    status: user.status,
    relation: user.relation,
    dietary: [user.dietary],
  };
});

async function main() {
  // Creating users
  const users = await prisma.user.createManyAndReturn({
    data: userData,
  });

  const invites = await prisma.invite.createManyAndReturn({
    data: rawInviteData,
  });

  const sampleInvites = invites.slice(0, 2);
  const sampleUsers = users.slice(0, 4);

  const userInviteData = sampleInvites.map((invite) => {
    return sampleUsers.map((user) => {
      return {
        userId: user.id,
        inviteCode: invite.code,
        isPlusOne: false,
      };
    });
  });

  const userInvite = await prisma.userInvite.createMany({
    data: userInviteData.flat(),
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
