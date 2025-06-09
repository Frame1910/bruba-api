-- AlterTable
ALTER TABLE "invites" ADD COLUMN     "address" TEXT,
ADD COLUMN     "bustransport" "InviteStatus" NOT NULL DEFAULT 'PENDING';
