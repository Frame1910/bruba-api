import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();

const rawUserData: any[] = JSON.parse(
  fs.readFileSync('prisma/MOCK_USER_DATA.json', 'utf-8')
);
const rawInviteData: any[] = JSON.parse(
  fs.readFileSync('prisma/MOCK_INVITE_DATA.json', 'utf-8')
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
  const user = await prisma.user.createMany({
    data: userData,
  });

  const invites = await prisma.invite.createMany({
    data: rawInviteData,
  });

  const userInvite = await prisma.userInvite.createMany({
    data: [
      {
        userId: '95b05686-5ea5-433a-8bab-71d56b5c9d04',
        inviteCode: '740521',
        isPlusOne: false,
      },
      {
        userId: '5bde44aa-a48c-497c-ad8a-e6c26c1bf969',
        inviteCode: '740521',
        isPlusOne: true,
      },
      {
        userId: '42e2770a-83fa-40d4-90db-edf65354f46b',
        inviteCode: '760004',
        isPlusOne: false,
      },
      {
        userId: 'a697319d-7863-4339-aeda-e54fe72e2e94',
        inviteCode: '760004',
        isPlusOne: true,
      },
    ],
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
