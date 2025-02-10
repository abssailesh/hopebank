const fs = require("fs");
const PDFDocument = require("pdfkit");
const { createObjectCsvWriter } = require("csv-writer");

// Generate a PDF Report
const generatePDFReport = async (data, filePath, title) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Title
    doc.fontSize(20).text(title, { align: "center" }).moveDown();

    // Table Headers
    doc.fontSize(12).text("ID", 50, 120);
    doc.text("Reason", 150, 120);
    doc.text("Status", 400, 120);

    // Add each dispute record
    let y = 140;
    data.forEach((item) => {
      doc.text(item._id.toString(), 50, y);
      doc.text(item.reason, 150, y);
      doc.text(item.status, 400, y);
      y += 20;
    });

    doc.end();
    stream.on("finish", () => resolve(filePath));
    stream.on("error", reject);
  });
};

// Generate a CSV Report
const generateCSVReport = async (data, filePath, headers) => {
  return new Promise((resolve, reject) => {
    const csvWriter = createObjectCsvWriter({
      path: filePath,
      header: headers,
    });

    csvWriter
      .writeRecords(data)
      .then(() => resolve(filePath))
      .catch(reject);
  });
};

module.exports = { generatePDFReport, generateCSVReport };
