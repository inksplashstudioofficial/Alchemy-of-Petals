import fs from 'fs';
import pdf from 'pdf-parse';

async function parse() {
    const cwd = process.cwd();
    const files = fs.readdirSync(cwd);
    const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));
    if (!pdfFile) {
        console.error("No PDF found!");
        return;
    }
    
    console.log(`Parsing ${pdfFile}...`);
    let dataBuffer = fs.readFileSync(pdfFile);
    
    try {
        const data = await pdf(dataBuffer);
        fs.writeFileSync('parsed_plants.txt', data.text);
        console.log("Successfully wrote parsed_plants.txt");
    } catch (err) {
        console.error("Error parsing PDF:", err);
    }
}

parse();
