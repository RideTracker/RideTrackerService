-- Migration number: 0002 	 2023-07-30T08:58:55.115Z
CREATE TABLE "devices" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "device_verifications" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"code"	varchar(6) NOT NULL,
	"expires"	double NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
