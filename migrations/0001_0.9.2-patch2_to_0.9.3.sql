-- Migration number: 0001 	 2023-07-20T10:12:05.966Z
ALTER TABLE "tokens" ADD COLUMN "type" DEFAULT 'user';
