/*
  Warnings:

  - You are about to drop the column `accepted` on the `user_invites` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'PENDING');

-- AlterTable
ALTER TABLE "user_invites" DROP COLUMN "accepted",
ADD COLUMN     "status" "InviteStatus" NOT NULL DEFAULT 'PENDING';
