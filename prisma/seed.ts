import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const invites = await prisma.invite.createManyAndReturn({
    data: [
      {
        code: '000000',
        allowPlusOne: true,
        firstSeenAt: '2025-04-26T15:39:44Z',
        lastSeenAt: '2025-07-26T23:08:58Z',
        sportsCarnival: false,
      },
      {
        code: '111111',
        allowPlusOne: false,
        firstSeenAt: '2025-05-20T10:39:31Z',
        lastSeenAt: '2025-03-17T23:56:56Z',
        sportsCarnival: true,
      },
      {
        code: '696969',
        allowPlusOne: false,
        firstSeenAt: '2025-09-10T18:56:38Z',
        lastSeenAt: '2025-02-28T06:30:39Z',
        sportsCarnival: true,
      },
    ],
  });
  const users = await prisma.user.createMany({
    data: [
      {
        firstName: 'Paige',
        lastName: 'Kniveton',
        mobile: '4846559663',
        email: 'pkniveton0@google.fr',
        relation: 'FRIEND',
        inviteCode: '000000',
        isPlusOne: false,
      },
      {
        firstName: 'Elton',
        lastName: 'Bilborough',
        mobile: '8921586709',
        email: 'ebilborough1@people.com.cn',
        relation: 'FRIEND',
        inviteCode: '111111',
        isPlusOne: false,
      },
      {
        firstName: 'Adham',
        lastName: 'Duggen',
        mobile: '6544334641',
        email: 'aduggen2@yellowpages.com',
        relation: 'PARENT',
        inviteCode: '111111',
        isPlusOne: false,
      },
      {
        firstName: 'Rex',
        lastName: 'Ealles',
        mobile: '9516947197',
        email: 'realles3@google.com.au',
        relation: 'PARENT',
        inviteCode: '696969',
        isPlusOne: false,
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
