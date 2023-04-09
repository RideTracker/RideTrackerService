DROP TABLE IF EXISTS "activities";
CREATE TABLE IF NOT EXISTS "activities" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"bike"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL
);
DROP TABLE IF EXISTS "activity_comments";
CREATE TABLE IF NOT EXISTS "activity_comments" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"parent"	varchar(255) DEFAULT NULL,
	"message"	varchar(255) NOT NULL,
	"timestamp"	bigint NOT NULL
);
DROP TABLE IF EXISTS "activity_likes";
CREATE TABLE IF NOT EXISTS "activity_likes" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "activity_summary";
CREATE TABLE IF NOT EXISTS "activity_summary" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"area"	varchar(255) NOT NULL,
	"distance"	double NOT NULL,
	"average_speed"	double NOT NULL,
	"elevation"	double NOT NULL,
	"max_speed"	double NOT NULL,
	"comments"	int NOT NULL,
	"timestamp"	bigint NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bikes";
CREATE TABLE IF NOT EXISTS "bikes" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"model"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bike_summary";
CREATE TABLE IF NOT EXISTS "bike_summary" (
	"id"	varchar(255) NOT NULL,
	"bike"	varchar(255) NOT NULL,
	"rides"	int NOT NULL,
	"distance"	double NOT NULL,
	"elevation"	double NOT NULL,
	"timestamp"	bigint NOT NULL DEFAULT '0',
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"id"	varchar(255) NOT NULL,
	"email"	varchar(255) NOT NULL,
	"password"	varchar(255) NOT NULL,
	"firstname"	varchar(255) NOT NULL,
	"lastname"	varchar(255) NOT NULL,
	"avatar"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_keys";
CREATE TABLE IF NOT EXISTS "user_keys" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
INSERT INTO "activities" VALUES ('7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','95c00e4b-607e-43d3-b871-4661ebc2cedd','844d20e9-a253-415e-9f5d-ae86a4c21947',1678300150558.0);
INSERT INTO "activities" VALUES ('6ecd9429-739d-45fa-bc09-489bd20a10fd','95c00e4b-607e-43d3-b871-4661ebc2cedd',NULL,1678303566794.0);
INSERT INTO "activity_comments" VALUES ('d4b22d54-8871-442e-87d3-abc2831b0822','7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','95c00e4b-607e-43d3-b871-4661ebc2cedd',NULL,'Nice one!',1679214607615);
INSERT INTO "activity_summary" VALUES ('188fd10c-4bcf-42f8-b30f-421619720565','7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','Vänersborg',7.3,23.7,33.0,36.5,0,1678553188986);
INSERT INTO "bikes" VALUES ('844d20e9-a253-415e-9f5d-ae86a4c21947','95c00e4b-607e-43d3-b871-4661ebc2cedd','Vittoria','Battaglin C11','https://i.imgur.com/Lol0MH3.jpg',1678313271079.0);
INSERT INTO "bike_summary" VALUES ('493992a7-7c2d-49af-9d09-fed49e3c7496','844d20e9-a253-415e-9f5d-ae86a4c21947',1,7.3,33.0,1678553980492);
INSERT INTO "users" VALUES ('256264be-d8ac-4e41-9099-f6d96c50ba3c','norasoderlund@icloud.com2','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Summerswille','https://i.imgur.com/dIV7nwq.png',1678613688440.0);
INSERT INTO "users" VALUES ('59174df4-1b1b-4d5f-9d6a-79f23a6b9e69','norasoderlund2@icloud.com','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Söderlund',NULL,1678485977894.0);
INSERT INTO "users" VALUES ('95c00e4b-607e-43d3-b871-4661ebc2cedd','norasoderlund@icloud.com','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Söderlund','https://avatars.githubusercontent.com/u/78360666?v=4',1678300150558.0);
INSERT INTO "user_keys" VALUES ('06ecb46f-010b-4724-a3a0-c41620240976','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678300150558.0);
INSERT INTO "user_keys" VALUES ('0b01cdb8-f29c-4425-ac6e-36d462085358','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678551471042.0);
INSERT INTO "user_keys" VALUES ('15f46022-c2a7-47f9-9148-7831fbbd5569','256264be-d8ac-4e41-9099-f6d96c50ba3c',1678618719397.0);
INSERT INTO "user_keys" VALUES ('179f19e8-5af3-4914-8d47-616f06a4f167','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678487288243.0);
INSERT INTO "user_keys" VALUES ('17a8b2e2-9e41-4621-acbb-04df3c378271','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678551278632.0);
INSERT INTO "user_keys" VALUES ('1edcfda1-2175-4881-ac0f-748efbebee18','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678486864558.0);
INSERT INTO "user_keys" VALUES ('1fc1198f-c83a-4b71-9e8d-d32d767b05b2','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679598381856.0);
INSERT INTO "user_keys" VALUES ('2a0e0584-e69b-4144-823b-a893721a3309','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678488594733.0);
INSERT INTO "user_keys" VALUES ('37c42bc0-6166-497e-a664-93ccb1c931d0','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678826773802.0);
INSERT INTO "user_keys" VALUES ('4185ca73-117d-44c0-a21b-056d34cdae18','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679592309240.0);
INSERT INTO "user_keys" VALUES ('42427ca5-1f87-4da7-bae9-4bf4e239a35b','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678488205960.0);
INSERT INTO "user_keys" VALUES ('437086c8-a25d-4f9e-b509-f61cc738fc27','256264be-d8ac-4e41-9099-f6d96c50ba3c',1678618032862.0);
INSERT INTO "user_keys" VALUES ('49285e9f-dfc3-4c23-9cd9-052f1c4cbfe3','256264be-d8ac-4e41-9099-f6d96c50ba3c',1678618292020.0);
INSERT INTO "user_keys" VALUES ('4a83fb88-5e70-476b-91c7-6563b005ddbd','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678487183792.0);
INSERT INTO "user_keys" VALUES ('4ab622ad-9b2f-4fbe-81f5-950084606cc4','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678487233926.0);
INSERT INTO "user_keys" VALUES ('6c75d365-8a33-46c8-8ce0-dd7e07730e2f','256264be-d8ac-4e41-9099-f6d96c50ba3c',1678724342202.0);
INSERT INTO "user_keys" VALUES ('774b1c54-110a-4f1c-9fa0-c6a44ba4a055','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678551551531.0);
INSERT INTO "user_keys" VALUES ('7d33a554-12fd-42ea-86c2-2699290ea1b6','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678488552643.0);
INSERT INTO "user_keys" VALUES ('8ab2999d-a7ae-488c-9267-310b6d7ea3d8','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679598253826.0);
INSERT INTO "user_keys" VALUES ('9145fd86-e10d-4d57-812f-0685040a2782','59174df4-1b1b-4d5f-9d6a-79f23a6b9e69',1678485977903.0);
INSERT INTO "user_keys" VALUES ('969e881f-9461-404f-9f0c-a502ecc35d40','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679215587512.0);
INSERT INTO "user_keys" VALUES ('9d88eb48-97f2-4d33-a772-2977efe55703','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679598681418.0);
INSERT INTO "user_keys" VALUES ('9e9d5675-e62d-44ed-b58c-77adc18fb28c','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679216649186.0);
INSERT INTO "user_keys" VALUES ('c87948d8-9c2d-4d65-a65c-2ff7d7bf0bd7','256264be-d8ac-4e41-9099-f6d96c50ba3c',1678618697587.0);
INSERT INTO "user_keys" VALUES ('de4401cb-e4ea-478c-923a-a659e87a7495','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678559593903.0);
INSERT INTO "user_keys" VALUES ('e2ca6626-e7d4-4507-9865-da00443f2c34','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678551395328.0);
INSERT INTO "user_keys" VALUES ('e2ebcc4c-59a6-44aa-8e3d-e516e4a1092e','256264be-d8ac-4e41-9099-f6d96c50ba3c',1679216393504.0);
INSERT INTO "user_keys" VALUES ('fb6efcfb-577b-4b02-a62f-5b9da1c1ed9b','95c00e4b-607e-43d3-b871-4661ebc2cedd',1678551087024.0);
