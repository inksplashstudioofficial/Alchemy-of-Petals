import fs from 'fs';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

async function extract() {
    console.log("Starting script");
    const apiKey = "AIzaSyBXa7BTOp-csD7hUBSEVoXsfm2e6Nxu7mY";
    const fileManager = new GoogleAIFileManager(apiKey);
    const genAI = new GoogleGenerativeAI(apiKey);

    const cwd = process.cwd();
    const files = fs.readdirSync(cwd);
    const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));

    if (!pdfFile) {
        console.error("No PDF found.");
        return;
    }

    console.log(`Uploading ${pdfFile}...`);
    try {
        const uploadResult = await fileManager.uploadFile(pdfFile, {
            mimeType: "application/pdf",
            displayName: "Bougainvillea Catalog",
        });
        console.log(`Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`);

        console.log("Analyzing with Gemini Vision...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent([
            "Extract a exhaustive list of all distinct bougainvillea plant names/varieties mentioned in this catalog. Your response must be ONLY a raw JSON array of strings. Example: [\"Barbara Karst\", \"San Diego Red\"]. No markdown, no other text.",
            {
                fileData: {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType
                }
            }
        ]);
        
        const rawResponse = result.response.text();
        console.log("Raw Response Received Length:", rawResponse.length);
        
        fs.writeFileSync("bougainvillea_names.json", rawResponse);
        console.log("Successfully extracted to bougainvillea_names.json");
    } catch (e) {
        console.error("Gemini API Error:", e);
    }
}

extract();
