-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SELLER', 'CUSTOMER');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reply_comment_id" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CUSTOMER';

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reply_comment_id_fkey" FOREIGN KEY ("reply_comment_id") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
