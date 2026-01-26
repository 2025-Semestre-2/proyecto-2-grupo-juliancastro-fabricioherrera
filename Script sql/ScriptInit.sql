USE SistemaGestionHotelera

INSERT INTO Rol(rolID, nombre)
VALUES (1, 'User'),(2,'EAdmin'),(3,'HAdmin')

DELETE FROM Pais;
DBCC CHECKIDENT (Pais, RESEED, 0);

SET IDENTITY_INSERT Pais ON;

INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (1, 'AFGANISTÁN', '93');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (2, 'ALBANIA', '355');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (3, 'ALEMANIA', '49');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (4, 'ALGERIA', '213');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (5, 'ANDORRA', '376');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (6, 'ANGOLA', '244');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (7, 'ANGUILA', '1264');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (8, 'ANTÁRTIDA', '672');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (9, 'ANTIGUA Y BARBUDA', '1268');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (10, 'ANTILLAS NEERLANDESAS', '599');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (11, 'ARABIA SAUDITA', '966');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (12, 'ARGENTINA', '54');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (13, 'ARMENIA', '374');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (14, 'ARUBA', '297');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (15, 'AUSTRALIA', '61');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (16, 'AUSTRIA', '43');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (17, 'AZERBAYÁN', '994');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (18, 'BÉLGICA', '32');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (19, 'BAHAMAS', '1242');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (20, 'BAHREIN', '973');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (21, 'BANGLADESH', '880');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (22, 'BARBADOS', '1246');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (23, 'BELICE', '501');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (24, 'BENÍN', '229');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (25, 'BHUTÁN', '975');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (26, 'BIELORRUSIA', '375');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (27, 'BIRMANIA', '95');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (28, 'BOLIVIA', '591');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (29, 'BOSNIA Y HERZEGOVINA', '387');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (30, 'BOTSUANA', '267');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (31, 'BRASIL', '55');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (32, 'BRUNÉI', '673');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (33, 'BULGARIA', '359');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (34, 'BURKINA FASO', '226');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (35, 'BURUNDI', '257');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (36, 'CABO VERDE', '238');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (37, 'CAMBOYA', '855');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (38, 'CAMERÚN', '237');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (39, 'CANADÁ', '1');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (40, 'CHAD', '235');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (41, 'CHILE', '56');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (42, 'CHINA', '86');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (43, 'CHIPRE', '357');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (44, 'CIUDAD DEL VATICANO', '39');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (45, 'COLOMBIA', '57');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (46, 'COMORAS', '269');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (47, 'CONGO', '242');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (48, 'CONGO', '243');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (49, 'COREA DEL NORTE', '850');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (50, 'COREA DEL SUR', '82');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (51, 'COSTA DE MARFIL', '225');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (52, 'COSTA RICA', '506');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (53, 'CROACIA', '385');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (54, 'CUBA', '53');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (55, 'DINAMARCA', '45');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (56, 'DOMINICA', '1767');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (57, 'ECUADOR', '593');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (58, 'EGIPTO', '20');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (59, 'EL SALVADOR', '503');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (60, 'EMIRATOS ÁRABES UNIDOS', '971');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (61, 'ERITREA', '291');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (62, 'ESLOVAQUIA', '421');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (63, 'ESLOVENIA', '386');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (64, 'ESPAÑA', '34');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (65, 'ESTADOS UNIDOS DE AMÉRICA', '1');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (66, 'ESTONIA', '372');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (67, 'ETIOPÍA', '251');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (68, 'FILIPINAS', '63');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (69, 'FINLANDIA', '358');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (70, 'FIYI', '679');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (71, 'FRANCIA', '33');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (72, 'GABÓN', '241');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (73, 'GAMBIA', '220');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (74, 'GEORGIA', '995');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (75, 'GHANA', '233');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (76, 'GIBRALTAR', '350');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (77, 'GRANADA', '1473');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (78, 'GRECIA', '30');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (79, 'GROENLANDIA', '299');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (80, 'GUADALUPE', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (81, 'GUAM', '1671');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (82, 'GUATEMALA', '502');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (83, 'GUAYANA FRANCESA', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (84, 'GUERNSEY', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (85, 'GUINEA', '224');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (86, 'GUINEA ECUATORIAL', '240');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (87, 'GUINEA-BISSAU', '245');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (88, 'GUYANA', '592');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (89, 'HAITÍ', '509');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (90, 'HONDURAS', '504');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (91, 'HONG KONG', '852');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (92, 'HUNGRÍA', '36');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (93, 'INDIA', '91');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (94, 'INDONESIA', '62');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (95, 'IRÁN', '98');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (96, 'IRAK', '964');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (97, 'IRLANDA', '353');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (98, 'ISLA BOUVET', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (99, 'ISLA DE MAN', '44');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (100, 'ISLA DE NAVIDAD', '61');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (101, 'ISLA NORFOLK', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (102, 'ISLANDIA', '354');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (103, 'ISLAS BERMUDAS', '1441');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (104, 'ISLAS CAIMÁN', '1345');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (105, 'ISLAS COCOS (KEELING)', '61');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (106, 'ISLAS COOK', '682');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (107, 'ISLAS DE ÅLAND', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (108, 'ISLAS FEROE', '298');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (109, 'ISLAS GEORGIAS DEL SUR Y SANDWICH DEL SUR', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (110, 'ISLAS HEARD Y MCDONALD', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (111, 'ISLAS MALDIVAS', '960');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (112, 'ISLAS MALVINAS', '500');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (113, 'ISLAS MARIANAS DEL NORTE', '1670');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (114, 'ISLAS MARSHALL', '692');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (115, 'ISLAS PITCAIRN', '870');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (116, 'ISLAS SALOMÓN', '677');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (117, 'ISLAS TURCAS Y CAICOS', '1649');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (118, 'ISLAS ULTRAMARINAS MENORES DE ESTADOS UNIDOS', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (119, 'ISLAS VÍRGENES BRITÁNICAS','1284');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (120, 'ISLAS VÍRGENES DE LOS ESTADOS UNIDOS', '1340');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (121, 'ISRAEL', '972');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (122, 'ITALIA', '39');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (123, 'JAMAICA', '1876');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (124, 'JAPÓN', '81');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (125, 'JERSEY', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (126, 'JORDANIA', '962');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (127, 'KAZAJISTÁN', '7');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (128, 'KENIA', '254');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (129, 'KIRGIZSTÁN', '996');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (130, 'KIRIBATI', '686');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (131, 'KUWAIT', '965');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (132, 'LÍBANO', '961');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (133, 'LAOS', '856');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (134, 'LESOTO', '266');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (135, 'LETONIA', '371');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (136, 'LIBERIA', '231');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (137, 'LIBIA', '218');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (138, 'LIECHTENSTEIN', '423');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (139, 'LITUANIA', '370');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (140, 'LUXEMBURGO', '352');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (141, 'MÉXICO', '52');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (142, 'MÓNACO', '377');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (143, 'MACAO', '853');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (144, 'MACEDÔNIA', '389');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (145, 'MADAGASCAR', '261');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (146, 'MALASIA', '60');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (147, 'MALAWI', '265');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (148, 'MALI', '223');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (149, 'MALTA', '356');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (150, 'MARRUECOS', '212');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (151, 'MARTINICA', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (152, 'MAURICIO', '230');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (153, 'MAURITANIA', '222');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (154, 'MAYOTTE', '262');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (155, 'MICRONESIA', '691');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (156, 'MOLDAVIA', '373');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (157, 'MONGOLIA', '976');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (158, 'MONTENEGRO', '382');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (159, 'MONTSERRAT', '1664');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (160, 'MOZAMBIQUE', '258');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (161, 'NAMIBIA', '264');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (162, 'NAURU', '674');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (163, 'NEPAL', '977');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (164, 'NICARAGUA', '505');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (165, 'NIGER', '227');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (166, 'NIGERIA', '234');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (167, 'NIUE', '683');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (168, 'NORUEGA', '47');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (169, 'NUEVA CALEDONIA', '687');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (170, 'NUEVA ZELANDA', '64');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (171, 'OMÁN', '968');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (172, 'PAÍSES BAJOS', '31');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (173, 'PAKISTÁN', '92');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (174, 'PALAU', '680');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (175, 'PALESTINA', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (176, 'PANAMÁ', '507');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (177, 'PAPÚA NUEVA GUINEA', '675');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (178, 'PARAGUAY', '595');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (179, 'PERÚ', '51');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (180, 'POLINESIA FRANCESA', '689');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (181, 'POLONIA', '48');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (182, 'PORTUGAL', '351');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (183, 'PUERTO RICO', '1');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (184, 'QATAR', '974');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (185, 'REINO UNIDO', '44');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (186, 'REPÚBLICA CENTROAFRICANA', '236');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (187, 'REPÚBLICA CHECA', '420');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (188, 'REPÚBLICA DOMINICANA', '1809');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (189, 'REUNIÓN', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (190, 'RUANDA', '250');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (191, 'RUMANÍA', '40');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (192, 'RUSIA', '7');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (193, 'SAHARA OCCIDENTAL', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (194, 'SAMOA', '685');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (195, 'SAMOA AMERICANA', '1684');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (196, 'SAN BARTOLOMÉ', '590');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (197, 'SAN CRISTÓBAL Y NIEVES', '1869');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (198, 'SAN MARINO', '378');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (199, 'SAN MARTÍN (FRANCIA)', '1599');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (200, 'SAN PEDRO Y MIQUELÓN', '508');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (201, 'SAN VICENTE Y LAS GRANADINAS', '1784');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (202, 'SANTA ELENA', '290');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (203, 'SANTA LUCÍA', '1758');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (204, 'SANTO TOMÉ Y PRÍNCIPE', '239');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (205, 'SENEGAL', '221');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (206, 'SERBIA', '381');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (207, 'SEYCHELLES', '248');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (208, 'SIERRA LEONA', '232');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (209, 'SINGAPUR', '65');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (210, 'SIRIA', '963');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (211, 'SOMALIA', '252');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (212, 'SRI LANKA', '94');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (213, 'SUDÁFRICA', '27');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (214, 'SUDÁN', '249');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (215, 'SUECIA', '46');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (216, 'SUIZA', '41');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (217, 'SURINÁM', '597');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (218, 'SVALBARD Y JAN MAYEN', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (219, 'SWAZILANDIA', '268');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (220, 'TADJIKISTÁN', '992');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (221, 'TAILANDIA', '66');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (222, 'TAIWÁN', '886');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (223, 'TANZANIA', '255');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (224, 'TERRITORIO BRITÁNICO DEL OCÉANO ÍNDICO', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (225, 'TERRITORIOS AUSTRALES Y ANTÁRTICAS FRANCESES', '0');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (226, 'TIMOR ORIENTAL', '670');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (227, 'TOGO', '228');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (228, 'TOKELAU', '690');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (229, 'TONGA', '676');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (230, 'TRINIDAD Y TOBAGO', '1868');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (231, 'TUNEZ', '216');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (232, 'TURKMENISTÁN', '993');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (233, 'TURQUÍA', '90');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (234, 'TUVALU', '688');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (235, 'UCRANIA', '380');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (236, 'UGANDA', '256');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (237, 'URUGUAY', '598');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (238, 'UZBEKISTÁN', '998');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (239, 'VANUATU', '678');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (240, 'VENEZUELA', '58');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (241, 'VIETNAM', '84');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (242, 'WALLIS Y FUTUNA', '681');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (243, 'YEMEN', '967');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (244, 'YIBUTI', '253');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (245, 'ZAMBIA', '260');
INSERT INTO Pais (paisID, nombre, codigoTelefonico) VALUES (246, 'ZIMBABUE', '263');

SET IDENTITY_INSERT Pais OFF;

DELETE FROM Provincia;
DBCC CHECKIDENT (Provincia, RESEED, 0);

SET IDENTITY_INSERT Provincia ON;

INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (1, 'San José', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (2, 'Alajuela', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (3, 'Cartago', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (4, 'Heredia', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (5, 'Guanacaste', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (6, 'Puntarenas', 52);
INSERT INTO Provincia (provinciaID, nombre, paisID) VALUES (7, 'Limón', 52);

SET IDENTITY_INSERT Provincia OFF;

DELETE FROM Canton;

INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (1, 1, 'San José');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (2, 1, 'Escazú');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (3, 1, 'Desamparados');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (4, 1, 'Puriscal');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (5, 1, 'Tarrazú');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (6, 1, 'Aserrí');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (7, 1, 'Mora');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (8, 1, 'Goicoechea');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (9, 1, 'Santa Ana');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (10, 1, 'Alajuelita');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (11, 1, 'Vásquez de Coronado');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (12, 1, 'Acosta');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (13, 1, 'Tibás');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (14, 1, 'Moravia');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (15, 1, 'Montes de Oca');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (16, 1, 'Turrubares');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (17, 1, 'Dota');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (18, 1, 'Curridabat');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (19, 1, 'Pérez Zeledón');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (20, 1, 'León Cortéz Castro');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (21, 2, 'Alajuela');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (22, 2, 'San Ramón');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (23, 2, 'Grecia');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (24, 2, 'San Mateo');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (25, 2, 'Atenas');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (26, 2, 'Naranjo');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (27, 2, 'Palmares');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (28, 2, 'Poás');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (29, 2, 'Orotina');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (30, 2, 'San Carlos');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (31, 2, 'Zarcero');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (32, 2, 'Valverde Vega');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (33, 2, 'Upala');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (34, 2, 'Los Chiles');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (35, 2, 'Guatuso');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (36, 3, 'Cartago');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (37, 3, 'Paraíso');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (38, 3, 'La Unión');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (39, 3, 'Jiménez');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (40, 3, 'Turrialba');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (41, 3, 'Alvarado');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (42, 3, 'Oreamuno');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (43, 3, 'El Guarco');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (44, 4, 'Heredia');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (45, 4, 'Barva');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (46, 4, 'Santo Domingo');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (47, 4, 'Santa Bárbara');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (48, 4, 'San Rafaél');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (49, 4, 'San Isidro');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (50, 4, 'Belén');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (51, 4, 'Flores');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (52, 4, 'San Pablo');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (53, 4, 'Sarapiquí');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (54, 5, 'Liberia');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (55, 5, 'Nicoya');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (56, 5, 'Santa Cruz');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (57, 5, 'Bagaces');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (58, 5, 'Carrillo');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (59, 5, 'Cañas');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (60, 5, 'Abangáres');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (61, 5, 'Tilarán');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (62, 5, 'Nandayure');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (63, 5, 'La Cruz');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (64, 5, 'Hojancha');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (65, 6, 'Puntarenas');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (66, 6, 'Esparza');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (67, 6, 'Buenos Aires');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (68, 6, 'Montes de Oro');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (69, 6, 'Osa');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (70, 6, 'Aguirre');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (71, 6, 'Golfito');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (72, 6, 'Coto Brus');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (73, 6, 'Parrita');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (74, 6, 'Corredores');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (75, 6, 'Garabito');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (76, 7, 'Limón');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (77, 7, 'Pococí');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (78, 7, 'Siquirres');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (79, 7, 'Talamanca');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (80, 7, 'Matina');
INSERT INTO Canton (cantonID, provinciaID, nombre) VALUES (81, 7, 'Guácimo');




DELETE FROM Distrito;
DBCC CHECKIDENT (Distrito, RESEED, 0);

SET IDENTITY_INSERT Distrito ON;

INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (1, 01, 'CARMEN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (2, 01, 'MERCED');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (3, 01, 'HOSPITAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (4, 01, 'CATEDRAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (5, 01, 'ZAPOTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (6, 01, 'SAN FRANCISCO DE DOS RÍOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (7, 01, 'URUCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (8, 01, 'MATA REDONDA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (9, 01, 'PAVAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (10, 01, 'HATILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (11, 01, 'SAN SEBASTIÁN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (12, 02, 'ESCAZÚ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (13, 02, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (14, 02, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (15, 03, 'DESAMPARADOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (16, 03, 'SAN MIGUEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (17, 03, 'SAN JUAN DE DIOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (18, 03, 'SAN RAFAEL ARRIBA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (19, 03, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (20, 03, 'FRAILES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (21, 03, 'PATARRÁ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (22, 03, 'SAN CRISTÓBAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (23, 03, 'ROSARIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (24, 03, 'DAMAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (25, 03, 'SAN RAFAEL ABAJO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (26, 03, 'GRAVILIAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (27, 03, 'LOS GUIDO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (28, 04, 'SANTIAGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (29, 04, 'MERCEDES SUR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (30, 04, 'BARBACOAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (31, 04, 'GRIFO ALTO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (32, 04, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (33, 04, 'CANDELARITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (34, 04, 'DESAMPARADITOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (35, 04, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (36, 04, 'CHIRES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (37, 05, 'SAN MARCOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (38, 05, 'SAN LORENZO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (39, 05, 'SAN CARLOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (40, 06, 'ASERRI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (41, 06, 'TARBACA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (42, 06, 'VUELTA DE JORCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (43, 06, 'SAN GABRIEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (44, 06, 'LEGUA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (45, 06, 'MONTERREY');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (46, 06, 'SALITRILLOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (47, 07, 'COLÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (48, 07, 'GUAYABO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (49, 07, 'TABARCIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (50, 07, 'PIEDRAS NEGRAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (51, 07, 'PICAGRES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (52, 07, 'JARIS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (53, 07, 'QUITIRRISI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (54, 08, 'GUADALUPE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (55, 08, 'SAN FRANCISCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (56, 08, 'CALLE BLANCOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (57, 08, 'MATA DE PLÁTANO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (58, 08, 'IPÍS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (59, 08, 'RANCHO REDONDO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (60, 08, 'PURRAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (61, 09, 'SANTA ANA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (62, 09, 'SALITRAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (63, 09, 'POZOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (64, 09, 'URUCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (65, 09, 'PIEDADES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (66, 09, 'BRASIL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (67, 10, 'ALAJUELITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (68, 10, 'SAN JOSECITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (69, 10, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (70, 10, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (71, 10, 'SAN FELIPE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (72, 11, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (73, 11, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (74, 11, 'DULCE NOMBRE DE JESÚS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (75, 11, 'PATALILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (76, 11, 'CASCAJAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (77, 12, 'SAN IGNACIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (78, 12, 'GUAITIL Villa');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (79, 12, 'PALMICHAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (80, 12, 'CANGREJAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (81, 12, 'SABANILLAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (82, 13, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (83, 13, 'CINCO ESQUINAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (84, 13, 'ANSELMO LLORENTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (85, 13, 'LEON XIII');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (86, 13, 'COLIMA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (87, 14, 'SAN VICENTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (88, 14, 'SAN JERÓNIMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (89, 14, 'LA TRINIDAD');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (90, 15, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (91, 15, 'SABANILLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (92, 15, 'MERCEDES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (93, 15, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (94, 16, 'SAN PABLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (95, 16, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (96, 16, 'SAN JUAN DE MATA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (97, 16, 'SAN LUIS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (98, 16, 'CARARA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (99, 17, 'SANTA MARÍA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (100, 17, 'JARDÍN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (101, 17, 'COPEY');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (102, 18, 'CURRIDABAT');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (103, 18, 'GRANADILLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (104, 18, 'SÁNCHEZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (105, 18, 'TIRRASES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (106, 19, 'SAN ISIDRO DE EL GENERAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (107, 19, 'EL GENERAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (108, 19, 'DANIEL FLORES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (109, 19, 'RIVAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (110, 19, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (111, 19, 'PLATANARES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (112, 19, 'PEJIBAYE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (113, 19, 'CAJÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (114, 19, 'BARÚ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (115, 19, 'RÍO NUEVO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (116, 19, 'PÁRAMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (117, 20, 'SAN PABLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (118, 20, 'SAN ANDRÉS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (119, 20, 'LLANO BONITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (120, 20, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (121, 20, 'SANTA CRUZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (122, 20, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (123, 21, 'ALAJUELA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (124, 21, 'SAN JOSÉ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (125, 21, 'CARRIZAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (126, 21, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (127, 21, 'GUÁCIMA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (128, 21, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (129, 21, 'SABANILLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (130, 21, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (131, 21, 'RÍO SEGUNDO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (132, 21, 'DESAMPARADOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (133, 21, 'TURRÚCARES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (134, 21, 'TAMBOR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (135, 21, 'GARITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (136, 21, 'SARAPIQUÍ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (137, 22, 'SAN RAMÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (138, 22, 'SANTIAGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (139, 22, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (140, 22, 'PIEDADES NORTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (141, 22, 'PIEDADES SUR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (142, 22, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (143, 22, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (144, 22, 'ÁNGELES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (145, 22, 'ALFARO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (146, 22, 'VOLIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (147, 22, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (148, 22, 'ZAPOTAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (149, 22, 'PEÑAS BLANCAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (150, 23, 'GRECIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (151, 23, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (152, 23, 'SAN JOSÉ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (153, 23, 'SAN ROQUE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (154, 23, 'TACARES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (155, 23, 'RÍO CUARTO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (156, 23, 'PUENTE DE PIEDRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (157, 23, 'BOLÍVAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (158, 24, 'SAN MATEO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (159, 24, 'DESMONTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (160, 24, 'JESÚS MARÍA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (161, 24, 'LABRADOR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (162, 25, 'ATENAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (163, 25, 'JESÚS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (164, 25, 'MERCEDES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (165, 25, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (166, 25, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (167, 25, 'SAN JOSE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (168, 25, 'SANTA EULALIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (169, 25, 'ESCOBAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (170, 26, 'NARANJO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (171, 26, 'SAN MIGUEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (172, 26, 'SAN JOSÉ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (173, 26, 'CIRRÍ SUR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (174, 26, 'SAN JERÓNIMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (175, 26, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (176, 26, 'EL ROSARIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (177, 26, 'PALMITOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (178, 27, 'PALMARES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (179, 27, 'ZARAGOZA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (180, 27, 'BUENOS AIRES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (181, 27, 'SANTIAGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (182, 27, 'CANDELARIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (183, 27, 'ESQUÍPULAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (184, 27, 'LA GRANJA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (185, 28, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (186, 28, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (187, 28, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (188, 28, 'CARRILLOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (189, 28, 'SABANA REDONDA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (190, 29, 'OROTINA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (191, 29, 'EL MASTATE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (192, 29, 'HACIENDA VIEJA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (193, 29, 'COYOLAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (194, 29, 'LA CEIBA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (195, 30, 'QUESADA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (196, 30, 'FLORENCIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (197, 30, 'BUENAVISTA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (198, 30, 'AGUAS ZARCAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (199, 30, 'VENECIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (200, 30, 'PITAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (201, 30, 'LA FORTUNA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (202, 30, 'LA TIGRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (203, 30, 'LA PALMERA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (204, 30, 'VENADO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (205, 30, 'CUTRIS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (206, 30, 'MONTERREY');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (207, 30, 'POCOSOL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (208, 31, 'ZARCERO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (209, 31, 'LAGUNA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (210, 31, 'GUADALUPE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (211, 31, 'PALMIRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (212, 31, 'ZAPOTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (213, 31, 'BRISAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (214, 32, 'SARCHÍ NORTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (215, 32, 'SARCHÍ SUR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (216, 32, 'TORO AMARILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (217, 32, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (218, 32, 'RODRÍGUEZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (219, 33, 'UPALA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (220, 33, 'AGUAS CLARAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (221, 33, 'SAN JOSÉ o PIZOTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (222, 33, 'BIJAGUA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (223, 33, 'DELICIAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (224, 33, 'DOS RÍOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (225, 33, 'YOLILLAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (226, 33, 'CANALETE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (227, 34, 'LOS CHILES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (228, 34, 'CAÑO NEGRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (229, 34, 'EL AMPARO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (230, 34, 'SAN JORGE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (231, 35, 'BUENAVISTA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (232, 35, 'COTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (233, 35, 'KATIRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (234, 36, 'ORIENTAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (235, 36, 'OCCIDENTAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (236, 36, 'CARMEN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (237, 36, 'SAN NICOLÁS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (238, 36, 'AGUACALIENTE o SAN FRANCISCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (239, 36, 'GUADALUPE o ARENILLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (240, 36, 'CORRALILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (241, 36, 'TIERRA BLANCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (242, 36, 'DULCE NOMBRE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (243, 36, 'LLANO GRANDE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (244, 36, 'QUEBRADILLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (245, 37, 'PARAÍSO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (246, 37, 'SANTIAGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (247, 37, 'OROSI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (248, 37, 'CACHÍ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (249, 37, 'LLANOS DE SANTA LUCÍA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (250, 38, 'TRES RÍOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (251, 38, 'SAN DIEGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (252, 38, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (253, 38, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (254, 38, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (255, 38, 'DULCE NOMBRE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (256, 38, 'SAN RAMÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (257, 38, 'RÍO AZUL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (258, 39, 'JUAN VIÑAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (259, 39, 'TUCURRIQUE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (260, 39, 'PEJIBAYE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (261, 40, 'TURRIALBA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (262, 40, 'LA SUIZA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (263, 40, 'PERALTA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (264, 40, 'SANTA CRUZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (265, 40, 'SANTA TERESITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (266, 40, 'PAVONES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (267, 40, 'TUIS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (268, 40, 'TAYUTIC');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (269, 40, 'SANTA ROSA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (270, 40, 'TRES EQUIS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (271, 40, 'LA ISABEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (272, 40, 'CHIRRIPÓ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (273, 41, 'PACAYAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (274, 41, 'CERVANTES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (275, 41, 'CAPELLADES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (276, 42, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (277, 42, 'COT');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (278, 42, 'POTRERO CERRADO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (279, 42, 'CIPRESES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (280, 42, 'SANTA ROSA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (281, 43, 'EL TEJAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (282, 43, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (283, 43, 'TOBOSI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (284, 43, 'PATIO DE AGUA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (285, 44, 'HEREDIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (286, 44, 'MERCEDES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (287, 44, 'SAN FRANCISCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (288, 44, 'ULLOA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (289, 44, 'VARABLANCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (290, 45, 'BARVA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (291, 45, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (292, 45, 'SAN PABLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (293, 45, 'SAN ROQUE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (294, 45, 'SANTA LUCÍA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (295, 45, 'SAN JOSÉ DE LA MONTAÑA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (296, 46, 'SAN VICENTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (297, 46, 'SAN MIGUEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (298, 46, 'PARACITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (299, 46, 'SANTO TOMÁS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (300, 46, 'SANTA ROSA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (301, 46, 'TURES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (302, 46, 'PARÁ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (303, 47, 'SANTA BÁRBARA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (304, 47, 'SAN PEDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (305, 47, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (306, 47, 'JESÚS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (307, 47, 'SANTO DOMINGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (308, 47, 'PURABÁ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (309, 48, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (310, 48, 'SAN JOSECITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (311, 48, 'SANTIAGO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (312, 48, 'ÁNGELES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (313, 48, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (314, 49, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (315, 49, 'SAN JOSÉ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (316, 49, 'CONCEPCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (317, 49, 'SAN FRANCISCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (318, 50, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (319, 50, 'LA RIBERA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (320, 50, 'LA ASUNCIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (321, 51, 'SAN JOAQUÍN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (322, 51, 'BARRANTES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (323, 51, 'LLORENTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (324, 52, 'SAN PABLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (325, 53, 'PUERTO VIEJO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (326, 53, 'LA VIRGEN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (327, 53, 'LAS HORQUETAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (328, 53, 'LLANURAS DEL GASPAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (329, 53, 'CUREÑA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (330, 54, 'LIBERIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (331, 54, 'CAÑAS DULCES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (332, 54, 'MAYORGA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (333, 54, 'NACASCOLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (334, 54, 'CURUBANDÉ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (335, 55, 'NICOYA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (336, 55, 'MANSIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (337, 55, 'SAN ANTONIO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (338, 55, 'QUEBRADA HONDA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (339, 55, 'SÁMARA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (340, 55, 'NOSARA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (341, 55, 'BELÉN DE NOSARITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (342, 56, 'SANTA CRUZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (343, 56, 'BOLSÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (344, 56, 'VEINTISIETE DE ABRIL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (345, 56, 'TEMPATE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (346, 56, 'CARTAGENA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (347, 56, 'CUAJINIQUIL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (348, 56, 'DIRIÁ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (349, 56, 'CABO VELAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (350, 56, 'TAMARINDO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (351, 57, 'BAGACES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (352, 57, 'LA FORTUNA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (353, 57, 'MOGOTE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (354, 57, 'RÍO NARANJO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (355, 58, 'FILADELFIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (356, 58, 'PALMIRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (357, 58, 'SARDINAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (358, 58, 'BELÉN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (359, 59, 'CAÑAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (360, 59, 'PALMIRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (361, 59, 'SAN MIGUEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (362, 59, 'BEBEDERO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (363, 59, 'POROZAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (364, 60, 'LAS JUNTAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (365, 60, 'SIERRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (366, 60, 'SAN JUAN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (367, 60, 'COLORADO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (368, 61, 'TILARÁN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (369, 61, 'QUEBRADA GRANDE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (370, 61, 'TRONADORA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (371, 61, 'SANTA ROSA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (372, 61, 'LÍBANO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (373, 61, 'TIERRAS MORENAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (374, 61, 'ARENAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (375, 62, 'CARMONA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (376, 62, 'SANTA RITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (377, 62, 'ZAPOTAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (378, 62, 'SAN PABLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (379, 62, 'PORVENIR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (380, 62, 'BEJUCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (381, 63, 'LA CRUZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (382, 63, 'SANTA CECILIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (383, 63, 'LA GARITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (384, 63, 'SANTA ELENA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (385, 64, 'HOJANCHA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (386, 64, 'MONTE ROMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (387, 64, 'PUERTO CARRILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (388, 64, 'HUACAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (389, 65, 'PUNTARENAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (390, 65, 'PITAHAYA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (391, 65, 'CHOMES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (392, 65, 'LEPANTO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (393, 65, 'PAQUERA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (394, 65, 'MANZANILLO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (395, 65, 'GUACIMAL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (396, 65, 'BARRANCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (397, 65, 'MONTE VERDE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (398, 65, 'CÓBANO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (399, 65, 'CHACARITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (400, 65, 'CHIRA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (401, 65, 'ACAPULCO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (402, 65, 'EL ROBLE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (403, 65, 'ARANCIBIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (404, 66, 'ESPÍRITU SANTO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (405, 66, 'SAN JUAN GRANDE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (406, 66, 'MACACONA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (407, 66, 'SAN RAFAEL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (408, 66, 'SAN JERÓNIMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (409, 66, 'CALDERA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (410, 67, 'BUENOS AIRES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (411, 67, 'VOLCÁN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (412, 67, 'POTRERO GRANDE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (413, 67, 'BORUCA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (414, 67, 'PILAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (415, 67, 'COLINAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (416, 67, 'CHÁNGUENA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (417, 67, 'BIOLLEY');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (418, 67, 'BRUNKA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (419, 68, 'MIRAMAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (420, 68, 'LA UNIÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (421, 68, 'SAN ISIDRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (422, 69, 'PUERTO CORTÉS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (423, 69, 'PALMAR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (424, 69, 'SIERPE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (425, 69, 'BAHÍA BALLENA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (426, 69, 'PIEDRAS BLANCAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (427, 69, 'BAHÍA DRAKE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (428, 70, 'QUEPOS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (429, 70, 'SAVEGRE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (430, 70, 'NARANJITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (431, 71, 'GOLFITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (432, 71, 'PUERTO JIMÉNEZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (433, 71, 'GUAYCARÁ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (434, 71, 'PAVÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (435, 72, 'SAN VITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (436, 72, 'SABALITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (437, 72, 'AGUABUENA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (438, 72, 'LIMONCITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (439, 72, 'PITTIER');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (440, 72, 'GUTIERREZ BRAUN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (441, 73, 'PARRITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (442, 74, 'CORREDOR');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (443, 74, 'LA CUESTA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (444, 74, 'CANOAS');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (445, 74, 'LAUREL');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (446, 75, 'JACÓ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (447, 75, 'TÁRCOLES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (448, 76, 'LIMÓN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (449, 76, 'VALLE LA ESTRELLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (450, 76, 'MATAMA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (451, 77, 'GUÁPILES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (452, 77, 'JIMÉNEZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (453, 77, 'RITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (454, 77, 'ROXANA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (455, 77, 'CARIARI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (456, 77, 'COLORADO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (457, 77, 'LA COLONIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (458, 78, 'SIQUIRRES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (459, 78, 'PACUARITO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (460, 78, 'FLORIDA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (461, 78, 'GERMANIA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (462, 78, 'EL CAIRO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (463, 78, 'ALEGRÍA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (464, 79, 'BRATSI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (465, 79, 'SIXAOLA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (466, 79, 'CAHUITA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (467, 79, 'TELIRE');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (468, 80, 'MATINA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (469, 80, 'BATÁN');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (470, 80, 'CARRANDI');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (471, 81, 'GUÁCIMO');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (472, 81, 'MERCEDES');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (473, 81, 'POCORA');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (474, 81, 'RÍO JIMÉNEZ');
INSERT INTO Distrito (distritoID, cantonID, nombre) VALUES (475, 81, 'DUACARÍ');

SET IDENTITY_INSERT Distrito OFF;

INSERT INTO RedSocial(nombre, iconUrl)
VALUES 
('Instagram', '/instagram.png'),
('Facebook', '/facebook.png'),
('AirBnB',  '/airbnb.png'),
('Tik-Tok', '/tiktok.png'),
('X', '/x.png'),
('YouTube', '/youtube.png')

INSERT INTO Servicio (nombre) VALUES
-- Alojamiento
('Alojamiento'),
('Hospedaje'),
('Estancia'),
('Uso de habitación'),
('Habitación estándar'),
('Habitación superior'),
('Habitación privada'),
('Habitación compartida'),
('Cama adicional'),
('Configuración especial de habitación'),

-- Limpieza y mantenimiento
('Limpieza de habitación'),
('Mantenimiento general'),
('Cambio de ropa de cama'),
('Servicio de aseo'),
('Reposición de insumos'),

-- Áreas comunes e instalaciones
('Acceso a áreas comunes'),
('Uso de instalaciones'),
('Acceso a zonas recreativas'),
('Uso de áreas compartidas'),
('Acceso a espacios privados'),
('Área de descanso'),

-- Bienestar y relajación
('Área de piscina'),
('Área acuática'),
('Área de relajación'),
('Zona de descanso'),
('Zona de bienestar'),

-- Actividad física
('Área de ejercicio'),
('Zona fitness'),
('Espacio de actividad física'),

-- Servicios operativos del hospedaje
('Recepción'),
('Atención al huésped'),
('Gestión de estadía'),
('Asistencia general'),
('Soporte al cliente'),

-- Servicios de alimentación
('Servicio de alimentación'),
('Servicio de comidas'),
('Servicio de bebidas'),
('Área de comedor'),

-- Comodidades generales
('Parqueo'),
('Conectividad'),
('Acceso a internet'),
('Acceso a servicios básicos'),

-- Servicios complementarios
('Servicio adicional'),
('Servicio complementario'),
('Servicio estándar'),
('Servicio extendido'),
('Servicio premium');

INSERT INTO TipoHospedaje (nombre) VALUES
('Hotel'),
('Motel'),
('Hostal'),
('Hospedaje turístico'),
('Alojamiento rural'),
('Casa de huéspedes'),
('Casa compartida'),
('Casa privada'),
('Apartamento'),
('Apartamento amueblado'),
('Condominio'),
('Residencia turística'),
('Cabaña'),
('Bungalow'),
('Villa'),
('Lodge'),
('Posada'),
('Pensión'),
('Refugio'),
('Centro de hospedaje'),
('Complejo turístico'),
('Alojamiento temporal'),
('Alojamiento permanente'),
('Alojamiento económico'),
('Alojamiento estándar'),
('Alojamiento premium'),
('Alojamiento familiar'),
('Alojamiento compartido'),
('Alojamiento independiente');





