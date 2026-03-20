const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let newFeatures = fs.readFileSync('new-features.jsx', 'utf8');

const splitPoint = html.indexOf("    ];");
if(splitPoint === -1) {
    console.error("Could not find array termination string.");
    process.exit(1);
}

let topHalf = html.substring(0, splitPoint + 6);

topHalf = topHalf.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>\\n  <script>tailwind.config = { darkMode: "class" }</script>');
topHalf = topHalf.replace('<body class="bg-slate-50 text-slate-900">', '<body class="bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 transition-colors duration-300">');

fs.writeFileSync('index.html', topHalf + '\\n\\n' + newFeatures);
console.log("Successfully rewrote React tree.");
