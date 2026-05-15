const fs = require('fs');
const path = require('path');

function extractPathFromUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname || '/';
  } catch {
    return url;
  }
}

function mergeSchemas(schemasDir, outputFile) {
  const files = fs.readdirSync(schemasDir)
    .filter(f => f.endsWith('.json') && f.startsWith('url-'));

  const merged = {};

  for (const file of files) {
    const filePath = path.join(schemasDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    let jsonData;
    try {
      jsonData = JSON.parse(content);
    } catch {
      console.warn(`Warning: ${file} is not valid JSON, skipping`);
      continue;
    }

    const urlMatch = file.match(/url-(\d+)/);
    if (!urlMatch) continue;

    const urlListPath = path.join(schemasDir.replace('/schemas', '/prompts'), 'url-list.json');
    if (fs.existsSync(urlListPath)) {
      const urlList = JSON.parse(fs.readFileSync(urlListPath, 'utf-8'));
      const entry = urlList.find(e => e.index === parseInt(urlMatch[1]));
      if (entry) {
        const pagePath = extractPathFromUrl(entry.url);
        merged[pagePath] = JSON.stringify(jsonData);
      }
    } else {
      merged[`/${file.replace('.json', '')}`] = JSON.stringify(jsonData);
    }
  }

  const tsContent = `export const schemas: Record<string, string> = ${JSON.stringify(merged, null, 2)};\n`;
  fs.writeFileSync(outputFile, tsContent);
  console.log(`Merged ${files.length} schemas into ${outputFile}`);

  return merged;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Usage: node merge-schemas.js <schemas_dir> <output_file.ts>');
    console.log('Example: node merge-schemas.js ./schemas ./schemas-merged.ts');
    process.exit(1);
  }

  const schemasDir = args[0];
  const outputFile = args[1];

  if (!fs.existsSync(schemasDir)) {
    console.error(`Error: Directory ${schemasDir} does not exist`);
    process.exit(1);
  }

  mergeSchemas(schemasDir, outputFile);
}

main();