-- Migration number: 0000 	 2023-07-19T13:48:25.555Z
ALTER TABLE "activities" ADD COLUMN "local_id" varchar(255) DEFAULT NULL;
