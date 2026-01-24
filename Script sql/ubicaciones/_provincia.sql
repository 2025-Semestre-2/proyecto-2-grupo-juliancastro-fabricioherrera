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


