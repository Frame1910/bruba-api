/*
  Warnings:

  - You are about to drop the `user_invites` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inviteCode` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPlusOne` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_invites" DROP CONSTRAINT "user_invites_inviteCode_fkey";

-- DropForeignKey
ALTER TABLE "user_invites" DROP CONSTRAINT "user_invites_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "inviteCode" TEXT NOT NULL,
ADD COLUMN     "inviteStatus" "InviteStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "isPlusOne" BOOLEAN NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- DropTable
DROP TABLE "user_invites";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_inviteCode_fkey" FOREIGN KEY ("inviteCode") REFERENCES "invites"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
