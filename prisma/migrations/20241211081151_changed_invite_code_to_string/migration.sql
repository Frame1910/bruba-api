/*
  Warnings:

  - The primary key for the `invites` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user_invites` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "invites" DROP CONSTRAINT "invites_pkey",
ALTER COLUMN "code" SET DATA TYPE TEXT,
ADD CONSTRAINT "invites_pkey" PRIMARY KEY ("code");

-- AlterTable
ALTER TABLE "user_invites" DROP CONSTRAINT "user_invites_pkey",
ALTER COLUMN "inviteCode" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_invites_pkey" PRIMARY KEY ("userId", "inviteCode");
