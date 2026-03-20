import fs from 'fs';
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(/import ReactDOM from 'react-dom\/client';/g, "import { createRoot } from 'react-dom/client';");
code = code.replace(/ReactDOM\.createRoot/g, "createRoot");

code = code.replace(/ðŸŒ¿/g, "🌿");
code = code.replace(/âœ•/g, "✕");
code = code.replace(/âœ“/g, "✓");
code = code.replace(/Â©/g, "©");
code = code.replace(/ðŸŒ±/g, "🌱");

fs.writeFileSync('index.html', code, 'utf8');
console.log('Fixed index.html');
