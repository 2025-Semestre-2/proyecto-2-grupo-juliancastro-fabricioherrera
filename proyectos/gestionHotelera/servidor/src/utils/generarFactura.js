import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const generarFacturaPDF = (factura) => {
  return new Promise((resolve, reject) => {
    const fileName = `Factura_${factura.numFactura}.pdf`;
    const filePath = path.join('pdfs', fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text('Factura de Reserva', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12);
    doc.text(`Factura #: ${factura.numFactura}`);
    doc.text(`Reserva #: ${factura.numReservacion}`);
    doc.text(`Cliente: ${factura.identificacion}`);
    doc.text(`Noches: ${factura.noches}`);
    doc.text(`Total: $${factura.importeTotal}`);
    doc.text(`Fecha: ${factura.fechaCreacion}`);

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
};

export default generarFacturaPDF;
