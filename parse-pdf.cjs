const fs = require('fs');
const PDFParser = require("pdf2json");

console.log("Starting script...");

const files = fs.readdirSync(process.cwd());
const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));

if (!pdfFile) {
    console.error("No PDF found.");
    process.exit(1);
}

console.log("Found PDF:", pdfFile);

const pdfParser = new PDFParser(this, 1);
pdfParser.on("pdfParser_dataError", errData => console.error("Error:", errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const text = pdfParser.getRawTextContent();
    fs.writeFileSync("parsed_plants.txt", text);
    console.log("Done writing text to parsed_plants.txt");
});

console.log("Loading PDF...");
pdfParser.loadPDF(pdfFile);
