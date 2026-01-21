CREATE PROCEDURE SP_InitDB
AS
BEGIN
	INSERT INTO Rol(rolID, nombre)
	VALUES (1, 'User'),(2,'EAdmin'),(3,'HAdmin')
END