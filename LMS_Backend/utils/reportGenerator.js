const fs = require("fs");
const PDFDocument = require("pdfkit");  // THIS IMPORT IS MISSING
const ExcelJS = require("exceljs");

exports.generatePDFReport = (type, filePath, data, callback, meta = {}) => {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);
  doc.fontSize(20).text(`Library ${type.charAt(0).toUpperCase() + type.slice(1)} Report`, { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`);
  
  if (type === "custom") {
    doc.moveDown();
    doc.text(`Timeline: ${meta.startDate} to ${meta.endDate}`);
  }

  doc.moveDown(2);
  doc.fontSize(14).text("Report Data:");
  doc.moveDown();

  if (type === "custom") {
    data.forEach(row => {
      doc.text(`Borrowed: ${new Date(row.borrowed_date).toLocaleDateString()} | Due: ${new Date(row.due_date).toLocaleDateString()} | Returned: ${row.returned_date ? new Date(row.returned_date).toLocaleDateString() : "Not Returned"} | Status: ${row.status}`);
    });
  } else {
    data.forEach(row => {
      doc.text(Object.values(row).join(" | "));
    });
  }

  doc.moveDown(2);
  doc.text("End of Report.", { align: "center" });
  doc.end();

  stream.on("finish", callback);
};

exports.generateExcelReport = (type, filePath, data, callback, meta = {}) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(`${type.charAt(0).toUpperCase() + type.slice(1)} Report`);

  sheet.addRow([`Library ${type.charAt(0).toUpperCase() + type.slice(1)} Report`]);
  sheet.addRow([`Generated on: ${new Date().toLocaleString()}`]);

  if (type === "custom") {
    sheet.addRow([`Timeline: ${meta.startDate} to ${meta.endDate}`]);
  }

  sheet.addRow([]);

  if (type === "custom") {
    sheet.addRow(["Borrowed Date", "Due Date", "Returned Date", "Status"]);
    data.forEach(row => {
      sheet.addRow([
        new Date(row.borrowed_date).toLocaleDateString(),
        new Date(row.due_date).toLocaleDateString(),
        row.returned_date ? new Date(row.returned_date).toLocaleDateString() : "Not Returned",
        row.status
      ]);
    });
  } else {
    sheet.addRow(Object.keys(data[0] || {}));
    data.forEach(row => {
      sheet.addRow(Object.values(row));
    });
  }

  workbook.xlsx.writeFile(filePath)
    .then(() => callback(null))
    .catch(callback);
};
