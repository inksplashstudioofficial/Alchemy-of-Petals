import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

async function extract() {
    console.log("Starting script");
    const ai = new GoogleGenAI({ apiKey: "AIzaSyBXa7BTOp-csD7hUBSEVoXsfm2e6Nxu7mY" });
    const cwd = process.cwd();
    const files = fs.readdirSync(cwd);
    const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));

    if (!pdfFile) {
        console.error("No PDF found!");
        return;
    }

    console.log(`Uploading ${pdfFile} to Gemini API...`);
    try {
        const uploadResult = await ai.files.upload({ file: pdfFile, mimeType: "application/pdf" });
        console.log("File uploaded. Generating content...");
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                uploadResult,
                "Extract a list of all bougainvillea plant names mentioned in this catalog. Only return a JSON array of strings containing the exact unique plant names. For example: [\"Barbara Karst\", \"San Diego Red\"]. Output nothing else, just the JSON array."
            ]
        });
        
        fs.writeFileSync("bougainvillea_names.json", response.text);
        console.log("Successfully extracted to bougainvillea_names.json");
    } catch (e) {
        console.error("Gemini API Error:", e);
    }
}

extract();
