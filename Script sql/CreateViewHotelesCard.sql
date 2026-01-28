-- Crear la vista vw_HotelesCard si no existe
CREATE OR ALTER VIEW dbo.vw_HotelesCard
AS
SELECT
    h.cedulaJuridica,
    h.nombre AS nombreHotel,
    p.nombre AS provincia,
    c.nombre AS canton,
    foto.url AS fotoHabitacion,
    servicios.servicios
FROM Hospedaje h

-- Ubicación
JOIN Distrito d ON h.distritoID = d.distritoID
JOIN Canton c   ON d.cantonID = c.cantonID
JOIN Provincia p ON c.provinciaID = p.provinciaID

OUTER APPLY (
    SELECT TOP 1 f.url
    FROM Habitacion ha
    JOIN FotoHabitacion fh ON ha.habitacionID = fh.habitacionID
    JOIN Foto f ON fh.fotoID = f.fotoID
    WHERE ha.cedulaJuridica = h.cedulaJuridica
    ORDER BY f.fotoID
) foto

OUTER APPLY (
    SELECT STRING_AGG(s.nombre, ', ') AS servicios
    FROM HospedajeServicio hs
    JOIN Servicio s ON hs.servicioID = s.servicioID
    WHERE hs.cedulaJuridica = h.cedulaJuridica
      AND hs.activo = 1
) servicios;
GO
