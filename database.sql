DROP TABLE IF EXISTS "avatars";
CREATE TABLE IF NOT EXISTS "avatars" (
	"id"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"type"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"timestamp"	bigint NOT NULL,
	PRIMARY KEY("id")
);

INSERT INTO avatars VALUES('6e313ef9-2562-4970-93cd-91f90551ce56','female1','head','RideTracker_Avatars_female1',1684858055242);
INSERT INTO avatars VALUES('ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','female2','head','RideTracker_Avatars_female2',1684858092439);
INSERT INTO avatars VALUES('63995019-6e6b-47ea-8377-091af161b54e','male1','head','RideTracker_Avatars_male1',1684858124686);
INSERT INTO avatars VALUES('25b605f6-7142-4c9e-8278-19157981612a','male2','head','RideTracker_Avatars_male2',1684858160711);
INSERT INTO avatars VALUES('5439a536-8729-4d51-9052-19f4debe1938','helmet_1','helmet','RideTracker_Avatars_helmet_1',1684858191206);
INSERT INTO avatars VALUES('b64176ea-4c2c-4c7f-8384-9b99cc17cc0c','helmet_2','helmet','RideTracker_Avatars_helmet_2',1684858203435);
INSERT INTO avatars VALUES('5ca52d05-cd57-453f-bfe5-7c69b6ad6a61','helmet_3','helmet','RideTracker_Avatars_helmet_3',1684858215283);
INSERT INTO avatars VALUES('c61a4e8a-3e32-4d70-b62a-36ee85c29c37','helmet_4','helmet','RideTracker_Avatars_helmet_4',1684858226562);
INSERT INTO avatars VALUES('fa8c25bc-4c9d-4f1c-905c-f84ff01f8b71','jersey1','jersey','RideTracker_Avatars_jersey1',1684858239475);
INSERT INTO avatars VALUES('88ed6894-d649-4a11-81a2-475896859c7c','jersey2','jersey','RideTracker_Avatars_jersey2',1684858250243);
INSERT INTO avatars VALUES('8993e127-75b7-4d76-84be-527747135255','jersey3','jersey','RideTracker_Avatars_jersey3',1684858276429);
INSERT INTO avatars VALUES('97537d49-bf6c-4b1b-93a5-4266078c96a2','jersey4','jersey','RideTracker_Avatars_jersey4',1684858290052);
INSERT INTO avatars VALUES('38687a02-11bb-4c7a-a5a7-5eb14994a61f','sunglass1','sunglass','RideTracker_Avatars_sunglass1',1684858311999);
INSERT INTO avatars VALUES('0a93cfa5-903f-40e4-b3d0-e01204706bd1','sunglass2','sunglass','RideTracker_Avatars_sunglass2',1684858322669);
INSERT INTO avatars VALUES('5d4fbf2e-55dc-4736-b1f8-cf9a0a06a5fd','sunglass3','sunglass','RideTracker_Avatars_sunglass3',1684858332654);
INSERT INTO avatars VALUES('f6cab288-1c92-4866-a7b5-40004d586634','sunglass4','sunglass','RideTracker_Avatars_sunglass4',1684858342959);
INSERT INTO avatars VALUES('65425d49-0064-4611-93c5-614eb3d3626f','wallpaper1','wallpaper','RideTracker_Avatars_wallpaper1',1684858352440);
INSERT INTO avatars VALUES('b0584373-b31f-4757-b2bb-85c56977d861','wallpaper2','wallpaper','RideTracker_Avatars_wallpaper2',1684858360556);
INSERT INTO avatars VALUES('aa27eba8-a953-499f-841e-dddc5df0567e','wallpaper3','wallpaper','RideTracker_Avatars_wallpaper3',1684858367817);

DROP TABLE IF EXISTS "avatar_images";
CREATE TABLE IF NOT EXISTS "avatar_images" (
	"id"	varchar(255) NOT NULL,
	"avatar"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"index"	int NOT NULL,
	"color_type"	varchar(255) DEFAULT NULL,
	"timestamp"	bigint NOT NULL,
	PRIMARY KEY("id")
);

INSERT INTO avatar_images VALUES('173707cc-5633-4502-a42d-7dbcd891190c','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_1',1,'skin',1684858059335);
INSERT INTO avatar_images VALUES('1c7ce9b0-040a-42f2-bdf1-b919c1d6d54f','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_2',2,NULL,1684858063223);
INSERT INTO avatar_images VALUES('bbfb304d-795f-4f03-84af-4b72f414629d','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_3',3,'skin',1684858065392);
INSERT INTO avatar_images VALUES('d470592a-d0d1-4579-bea7-a5c23e8bf3e7','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_4',4,'lips',1684858068187);
INSERT INTO avatar_images VALUES('01576354-08a6-45db-80bc-e4651727f5e6','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_5',5,'hair',1684858071517);
INSERT INTO avatar_images VALUES('e35aec29-a7d8-4714-9543-8ba9b290a2bd','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_6',6,'eyes',1684858074550);
INSERT INTO avatar_images VALUES('65d39460-33a1-4aff-86d9-b8a6efb59aed','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_7',7,NULL,1684858077384);
INSERT INTO avatar_images VALUES('8c050c59-6edd-43ef-8ebb-030aa45019de','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_8',8,'hair',1684858080563);
INSERT INTO avatar_images VALUES('60093d24-9a8d-426a-b7f9-2754a9c6220f','6e313ef9-2562-4970-93cd-91f90551ce56','RideTracker_Avatars_female1_9',9,'hair',1684858083871);
INSERT INTO avatar_images VALUES('7dff4ebd-844f-47d4-ad5d-cc58c250f6e0','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_1',1,'skin',1684858095692);
INSERT INTO avatar_images VALUES('93be9935-efe6-4d58-bf97-4f7a59cd8781','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_2',2,NULL,1684858099018);
INSERT INTO avatar_images VALUES('9d477ffd-7a30-45e8-8f27-83e95317c990','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_3',3,'lips',1684858102268);
INSERT INTO avatar_images VALUES('3d8f0433-ca6f-4e78-a1a3-1c99c13a4874','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_4',4,'eyes',1684858104862);
INSERT INTO avatar_images VALUES('98a45339-20c1-4d88-9427-a777d6bd96e7','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_5',5,NULL,1684858107800);
INSERT INTO avatar_images VALUES('58db6267-633a-41ab-9b98-601abc7a738d','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_6',6,'skin',1684858110219);
INSERT INTO avatar_images VALUES('ae323491-1636-4c1b-af76-144b9d61dbb8','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','RideTracker_Avatars_female2_7',7,'hair',1684858114031);
INSERT INTO avatar_images VALUES('5b8b4353-3c49-4971-9578-8d4aa454f869','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_1',1,'skin',1684858127856);
INSERT INTO avatar_images VALUES('4498b972-b777-477d-8b53-f4059fa3f18f','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_10',10,'hair',1684858130841);
INSERT INTO avatar_images VALUES('bb03e656-dd9f-44a3-b569-ace647640735','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_2',2,NULL,1684858133959);
INSERT INTO avatar_images VALUES('bab38304-a3e4-49b0-b5ce-67c81ac7f5c3','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_3',3,'lips',1684858136570);
INSERT INTO avatar_images VALUES('20a888d7-b033-4f17-8034-c9a0e25bc221','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_4',4,'eyes',1684858139085);
INSERT INTO avatar_images VALUES('b1e8cc77-67c1-4dff-8bdc-e191898f06ea','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_5',5,NULL,1684858142355);
INSERT INTO avatar_images VALUES('080a8dbc-e2b9-4b17-b77a-aad465439517','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_6',6,'skin',1684858144809);
INSERT INTO avatar_images VALUES('ce5c4f19-4f6a-49f0-b854-e6c237b385aa','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_7',7,NULL,1684858147700);
INSERT INTO avatar_images VALUES('fd3defd1-3785-4865-8f5f-a0bb1d220207','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_8',8,'hair',1684858150883);
INSERT INTO avatar_images VALUES('21d66a84-466b-4fc9-844e-3797c4850a8f','63995019-6e6b-47ea-8377-091af161b54e','RideTracker_Avatars_male1_9',9,'hair',1684858153411);
INSERT INTO avatar_images VALUES('83f499e7-37c5-4006-95e8-04b8409f8321','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_1',1,'skin',1684858164140);
INSERT INTO avatar_images VALUES('4f54c722-4aa4-4899-beb9-3b97f4406781','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_2',2,NULL,1684858167474);
INSERT INTO avatar_images VALUES('b0af6f60-c3b5-4b37-bc66-4a0e03183b55','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_3',3,'lips',1684858171284);
INSERT INTO avatar_images VALUES('40ac98cd-9cdf-4690-a15c-52a7f02b3f48','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_4',4,'eyes',1684858174045);
INSERT INTO avatar_images VALUES('4c4c78eb-cb68-40ff-934f-f2e56858d179','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_5',5,NULL,1684858176523);
INSERT INTO avatar_images VALUES('e0ea3f49-3c91-46ff-8499-a4b50eb10273','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_6',6,'hair',1684858179291);
INSERT INTO avatar_images VALUES('c5c8695d-43ad-4f3a-aa1b-e11a24aa9462','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_7',7,'hair',1684858182675);
INSERT INTO avatar_images VALUES('5bae62d7-5c7c-44fc-a468-0920aa2ddf13','25b605f6-7142-4c9e-8278-19157981612a','RideTracker_Avatars_male2_8',8,'hair',1684858185923);
INSERT INTO avatar_images VALUES('f6514e5b-dacc-4a65-a2bc-28868ab2eb6f','5439a536-8729-4d51-9052-19f4debe1938','RideTracker_Avatars_helmet_1_1',1,'primary',1684858194095);
INSERT INTO avatar_images VALUES('57012294-8bc5-4dd1-ab71-c0eccf711920','5439a536-8729-4d51-9052-19f4debe1938','RideTracker_Avatars_helmet_1_2',2,NULL,1684858197214);
INSERT INTO avatar_images VALUES('9fe5c909-b189-4793-b342-ebf22ddf16ab','b64176ea-4c2c-4c7f-8384-9b99cc17cc0c','RideTracker_Avatars_helmet_2_1',1,NULL,1684858207783);
INSERT INTO avatar_images VALUES('0730fc8d-2f70-4b31-ad09-145ebfcc16e1','b64176ea-4c2c-4c7f-8384-9b99cc17cc0c','RideTracker_Avatars_helmet_2_2',2,'primary',1684858211050);
INSERT INTO avatar_images VALUES('9bdcac91-977f-42de-a059-bdde7f868612','5ca52d05-cd57-453f-bfe5-7c69b6ad6a61','RideTracker_Avatars_helmet_3_1',1,'primary',1684858219159);
INSERT INTO avatar_images VALUES('b5e76969-9955-468c-ad2b-9840d9cb293e','5ca52d05-cd57-453f-bfe5-7c69b6ad6a61','RideTracker_Avatars_helmet_3_2',2,NULL,1684858222358);
INSERT INTO avatar_images VALUES('c1fa4f77-f98b-483f-9fba-6ec680c62950','c61a4e8a-3e32-4d70-b62a-36ee85c29c37','RideTracker_Avatars_helmet_4_1',1,NULL,1684858229253);
INSERT INTO avatar_images VALUES('d7727f10-cdc7-48e1-86a2-362fdc789474','c61a4e8a-3e32-4d70-b62a-36ee85c29c37','RideTracker_Avatars_helmet_4_2',2,'primary',1684858232746);
INSERT INTO avatar_images VALUES('4f246999-9280-4667-9c38-07fc59154222','c61a4e8a-3e32-4d70-b62a-36ee85c29c37','RideTracker_Avatars_helmet_4_3',3,NULL,1684858235190);
INSERT INTO avatar_images VALUES('7dc9b4d9-30b9-4438-af78-a4d6947286e1','fa8c25bc-4c9d-4f1c-905c-f84ff01f8b71','RideTracker_Avatars_jersey1_1',1,'primary',1684858242773);
INSERT INTO avatar_images VALUES('55c83d57-cbfa-40b4-a2f2-db75b5fba718','fa8c25bc-4c9d-4f1c-905c-f84ff01f8b71','RideTracker_Avatars_jersey1_2',2,'secondary',1684858245559);
INSERT INTO avatar_images VALUES('7a4eca06-c1d5-4b3c-9025-f91c8fe6c8b3','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_1',1,NULL,1684858253347);
INSERT INTO avatar_images VALUES('6a4857e9-8b56-4b5a-8101-eb47e0fd8445','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_2',2,'primary',1684858256742);
INSERT INTO avatar_images VALUES('ddfdb922-62a4-4fde-91a1-87fdd6dee5cd','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_3',3,'secondary',1684858259710);
INSERT INTO avatar_images VALUES('9793e030-4a74-48c6-86fa-560cc777f12e','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_4',4,'primary',1684858262525);
INSERT INTO avatar_images VALUES('e790a91a-baa9-42ca-9c78-1ed341b3cc4e','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_5',5,NULL,1684858266046);
INSERT INTO avatar_images VALUES('8cf2ff99-b23b-4fd0-84b7-e13cb47ea33a','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_6',6,'primary',1684858268856);
INSERT INTO avatar_images VALUES('a930632c-e38e-4dd7-a0ed-18f39dc1f42c','88ed6894-d649-4a11-81a2-475896859c7c','RideTracker_Avatars_jersey2_7',7,NULL,1684858271757);
INSERT INTO avatar_images VALUES('07dc69b4-7d4b-452a-b77f-82a80dee1b8c','8993e127-75b7-4d76-84be-527747135255','RideTracker_Avatars_jersey3_1',1,'primary',1684858279460);
INSERT INTO avatar_images VALUES('4d1d460a-172f-4233-950f-432b1f85819b','8993e127-75b7-4d76-84be-527747135255','RideTracker_Avatars_jersey3_2',2,NULL,1684858282519);
INSERT INTO avatar_images VALUES('9d1dccc8-bdbf-48db-8b13-8e5953a32e34','8993e127-75b7-4d76-84be-527747135255','RideTracker_Avatars_jersey3_3',3,'primary',1684858285413);
INSERT INTO avatar_images VALUES('f37d71d4-72ed-4e70-b334-c10d8f8dc980','97537d49-bf6c-4b1b-93a5-4266078c96a2','RideTracker_Avatars_jersey4_1',1,'primary',1684858293757);
INSERT INTO avatar_images VALUES('92d06e06-69ee-474e-a9bd-e1302f8ff012','97537d49-bf6c-4b1b-93a5-4266078c96a2','RideTracker_Avatars_jersey4_2',2,'secondary',1684858296687);
INSERT INTO avatar_images VALUES('73059297-2a93-4ec5-b077-16009a6a1c75','97537d49-bf6c-4b1b-93a5-4266078c96a2','RideTracker_Avatars_jersey4_3',3,NULL,1684858300337);
INSERT INTO avatar_images VALUES('081a0a4a-c7ec-49f2-ae88-34666a22aebe','97537d49-bf6c-4b1b-93a5-4266078c96a2','RideTracker_Avatars_jersey4_4',4,'secondary',1684858303442);
INSERT INTO avatar_images VALUES('cbdf0244-d668-482f-816f-799a30fe9f66','97537d49-bf6c-4b1b-93a5-4266078c96a2','RideTracker_Avatars_jersey4_5',5,NULL,1684858306769);
INSERT INTO avatar_images VALUES('f663d284-836b-4bdd-9c3c-6d12bc95f144','38687a02-11bb-4c7a-a5a7-5eb14994a61f','RideTracker_Avatars_sunglass1_1',1,'visor',1684858314622);
INSERT INTO avatar_images VALUES('109d690c-1124-4be1-acad-798ba1941bfe','38687a02-11bb-4c7a-a5a7-5eb14994a61f','RideTracker_Avatars_sunglass1_2',2,NULL,1684858318449);
INSERT INTO avatar_images VALUES('42b1900f-a396-44ef-998f-ba5eddff2546','0a93cfa5-903f-40e4-b3d0-e01204706bd1','RideTracker_Avatars_sunglass2_1',1,'visor',1684858325391);
INSERT INTO avatar_images VALUES('a40a170c-5184-425e-9521-e9103d7c5cd7','0a93cfa5-903f-40e4-b3d0-e01204706bd1','RideTracker_Avatars_sunglass2_2',2,NULL,1684858328412);
INSERT INTO avatar_images VALUES('b29d5e9f-de38-48af-8a97-fcb59fef2296','5d4fbf2e-55dc-4736-b1f8-cf9a0a06a5fd','RideTracker_Avatars_sunglass3_1',1,'visor',1684858335802);
INSERT INTO avatar_images VALUES('c86b9446-913a-4f84-8f3b-a33e6f3a1156','5d4fbf2e-55dc-4736-b1f8-cf9a0a06a5fd','RideTracker_Avatars_sunglass3_2',2,NULL,1684858339076);
INSERT INTO avatar_images VALUES('9d2d70fc-3a69-41e6-bbaa-0e5530c75c6c','f6cab288-1c92-4866-a7b5-40004d586634','RideTracker_Avatars_sunglass4_1',1,'visor',1684858345447);
INSERT INTO avatar_images VALUES('7c7ac4dd-293d-440f-a53d-9bc953a6d237','f6cab288-1c92-4866-a7b5-40004d586634','RideTracker_Avatars_sunglass4_2',2,NULL,1684858348125);
INSERT INTO avatar_images VALUES('90a9d92c-3a1c-4415-854f-1f343d9bf518','65425d49-0064-4611-93c5-614eb3d3626f','RideTracker_Avatars_wallpaper1_1',1,NULL,1684858355997);
INSERT INTO avatar_images VALUES('7a99c90c-ef0b-4590-9eff-c55707781581','b0584373-b31f-4757-b2bb-85c56977d861','RideTracker_Avatars_wallpaper2_1',1,NULL,1684858363238);
INSERT INTO avatar_images VALUES('f12071ec-0c4f-452b-a4dc-d1dd9719f36e','aa27eba8-a953-499f-841e-dddc5df0567e','RideTracker_Avatars_wallpaper3_1',1,NULL,1684858371722);

DROP TABLE IF EXISTS "avatar_colors";
CREATE TABLE IF NOT EXISTS "avatar_colors" (

	"id"	varchar(255) NOT NULL,

	"avatar"	varchar(255) NOT NULL,

	"type"	varchar(255) NOT NULL,

	"index"	int NOT NULL,

	"default_color"	varchar(16) DEFAULT NULL,

	"timestamp"	bigint NOT NULL,

	PRIMARY KEY("id")

);
INSERT INTO avatar_colors VALUES('be58a7a2-6ff0-4ea2-b3d8-3bca6acb070a','6e313ef9-2562-4970-93cd-91f90551ce56','hair',0,'#231F20',1684858085771);
INSERT INTO avatar_colors VALUES('3f948ec7-7520-4bb4-9dc7-a9e3497e90d5','6e313ef9-2562-4970-93cd-91f90551ce56','skin',1,'#F1C8BF',1684858086030);
INSERT INTO avatar_colors VALUES('12b5d8f7-6681-4d66-a5d8-e37e60401cd7','6e313ef9-2562-4970-93cd-91f90551ce56','eyes',2,'#3C2415',1684858086273);
INSERT INTO avatar_colors VALUES('cfed7486-569c-4452-866d-36fc57420652','6e313ef9-2562-4970-93cd-91f90551ce56','lips',3,'#F37E8B',1684858086523);
INSERT INTO avatar_colors VALUES('0ca4a437-7d15-417a-83ac-ca47513326e4','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','hair',0,'#60403B',1684858116571);
INSERT INTO avatar_colors VALUES('9345c917-eb62-42f8-bc88-c495e5fc7681','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','skin',1,'#FAC1BB',1684858116817);
INSERT INTO avatar_colors VALUES('d79e8cc8-6d19-4f84-8d1d-20a88484da00','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','eyes',2,'#1B75BC',1684858117076);
INSERT INTO avatar_colors VALUES('960254ee-221d-4234-836f-41c89b87f352','ea8f4af7-59f7-4b6b-b095-cd2db03f9ede','lips',3,'#E77F84',1684858117312);
INSERT INTO avatar_colors VALUES('8ecc2493-8c42-436b-9a49-1ef7d624788d','63995019-6e6b-47ea-8377-091af161b54e','hair',0,'#3C2415',1684858155642);
INSERT INTO avatar_colors VALUES('658d3f15-ab54-44e1-a484-421537b57960','63995019-6e6b-47ea-8377-091af161b54e','skin',1,'#FBC8B8',1684858155895);
INSERT INTO avatar_colors VALUES('985e0e27-7120-493e-94e3-12e7f3cfcca5','63995019-6e6b-47ea-8377-091af161b54e','eyes',2,'#432512',1684858156151);
INSERT INTO avatar_colors VALUES('ca72fd80-855d-440b-9264-d11b5ebfadf7','63995019-6e6b-47ea-8377-091af161b54e','lips',3,'#EEA19A',1684858156466);
INSERT INTO avatar_colors VALUES('844c40e7-cce8-44fa-aaa2-9d47ffb7478b','25b605f6-7142-4c9e-8278-19157981612a','hair',0,'#151415',1684858188449);
INSERT INTO avatar_colors VALUES('eebe74c8-4594-418c-a290-75f9b2d58634','25b605f6-7142-4c9e-8278-19157981612a','skin',1,'#F9B3A1',1684858188690);
INSERT INTO avatar_colors VALUES('00e9ab25-40c1-46ea-acd1-e62798abd45a','25b605f6-7142-4c9e-8278-19157981612a','eyes',2,'#594A42',1684858188941);
INSERT INTO avatar_colors VALUES('70a8b5ee-e419-48f1-a7ba-ae912fb04290','25b605f6-7142-4c9e-8278-19157981612a','lips',3,'#DE9390',1684858189199);
INSERT INTO avatar_colors VALUES('3694694b-7745-4b81-b5bc-27647c20772a','5439a536-8729-4d51-9052-19f4debe1938','primary',0,'#D1D3D4',1684858199325);
INSERT INTO avatar_colors VALUES('9c2dbf31-fb4d-40be-8eb6-1a560276e121','b64176ea-4c2c-4c7f-8384-9b99cc17cc0c','primary',0,'#ED1C24',1684858213249);
INSERT INTO avatar_colors VALUES('379d09d8-c922-40e4-97f5-eb2732aa60f8','5ca52d05-cd57-453f-bfe5-7c69b6ad6a61','primary',0,'#D4DE25',1684858224496);
INSERT INTO avatar_colors VALUES('e83a14cc-6ba0-45bd-b025-c33321e48439','c61a4e8a-3e32-4d70-b62a-36ee85c29c37','primary',0,'#1B75BC',1684858237305);
INSERT INTO avatar_colors VALUES('2a3a794c-8f45-442a-a805-a06043fd768b','fa8c25bc-4c9d-4f1c-905c-f84ff01f8b71','primary',0,'#F37237',1684858248032);
INSERT INTO avatar_colors VALUES('affd7c0b-63c5-49a4-b05a-82887d13e4b6','fa8c25bc-4c9d-4f1c-905c-f84ff01f8b71','secondary',1,'#2B3C5D',1684858248298);
INSERT INTO avatar_colors VALUES('2a27f2cc-0ec0-40eb-a39d-cf1447f6361c','88ed6894-d649-4a11-81a2-475896859c7c','primary',0,'#294C3F',1684858273981);
INSERT INTO avatar_colors VALUES('5f7eb299-be3b-4eab-98ff-d3a1de12ab4c','88ed6894-d649-4a11-81a2-475896859c7c','secondary',1,'#ED1C24',1684858274256);
INSERT INTO avatar_colors VALUES('923c09c2-270f-4ff5-b6b3-a855f12d259a','8993e127-75b7-4d76-84be-527747135255','primary',0,'#414142',1684858287944);
INSERT INTO avatar_colors VALUES('8e7ddd20-5e74-4f61-bf2a-2224cd877f06','97537d49-bf6c-4b1b-93a5-4266078c96a2','primary',0,'#7C3A65',1684858309722);
INSERT INTO avatar_colors VALUES('6b4e53ba-dfe2-4703-93ec-ea304b05b639','97537d49-bf6c-4b1b-93a5-4266078c96a2','secondary',1,'#E12387',1684858310008);
INSERT INTO avatar_colors VALUES('ea020087-a22e-4273-bffa-c2965ad4fe08','38687a02-11bb-4c7a-a5a7-5eb14994a61f','visor',0,NULL,1684858320600);
INSERT INTO avatar_colors VALUES('dfeda49b-472f-4fee-a340-7b63f9ceed07','0a93cfa5-903f-40e4-b3d0-e01204706bd1','visor',0,NULL,1684858330577);
INSERT INTO avatar_colors VALUES('340bfd85-2e93-4c6f-96fb-988143032d6e','5d4fbf2e-55dc-4736-b1f8-cf9a0a06a5fd','visor',0,NULL,1684858340765);
INSERT INTO avatar_colors VALUES('9d824e1d-0dbb-4e40-b1a2-2575d6495951','f6cab288-1c92-4866-a7b5-40004d586634','visor',0,NULL,1684858350056);
