import { Prisma, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
const prisma = new PrismaClient();

const rawUserData: any[] = JSON.parse(
  fs.readFileSync('prisma/MOCK_USER_DATA.json', 'utf-8'),
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
    data: [
      {
        code: '740521',
        allowPlusOne: true,
        firstSeenAt: '2025-04-26T15:39:44Z',
        lastSeenAt: '2025-07-26T23:08:58Z',
        sportsCarnival: false,
      },
      {
        code: '760004',
        allowPlusOne: false,
        firstSeenAt: '2025-05-20T10:39:31Z',
        lastSeenAt: '2025-03-17T23:56:56Z',
        sportsCarnival: true,
      },
      {
        code: '119858',
        allowPlusOne: false,
        firstSeenAt: '2025-09-10T18:56:38Z',
        lastSeenAt: '2025-02-28T06:30:39Z',
        sportsCarnival: true,
      },
    ],
  });

  const singlePlusOne = [
    {
      userId: users[0].id,
      inviteCode: '740521',
      isPlusOne: false,
    },
    {
      userId: users[1].id,
      inviteCode: '740521',
      isPlusOne: true,
    },
  ];

  const couple = [
    {
      userId: users[2].id,
      inviteCode: '760004',
      isPlusOne: false,
    },
    {
      userId: users[3].id,
      inviteCode: '760004',
      isPlusOne: false,
    },
  ];

  const singleNoPlusOne = [
    {
      userId: users[4].id,
      inviteCode: '119858',
      isPlusOne: false,
    },
  ];

  // const userInviteData = sampleInvites.map((invite) => {
  //   return sampleUsers.map((user) => {
  //     return {
  //       userId: user.id,
  //       inviteCode: invite.code,
  //       isPlusOne: false,
  //     };
  //   });
  // });

  const combined_data = [...singlePlusOne, ...couple, ...singleNoPlusOne];

  const userInvite = await prisma.userInvite.createMany({
    data: combined_data,
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
