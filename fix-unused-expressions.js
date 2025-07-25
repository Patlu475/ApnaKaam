const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fixed = content
    .split('\n')
    // Remove lines that are just an identifier/expression followed by a semicolon
    .filter(line => !/^\s*[\w\d_]+\s*;\s*$/.test(line))
    .join('\n');
  fs.writeFileSync(filePath, fixed, 'utf8');
}

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(f)) processFile(full);
  });
}

walk('./src');
console.log('Unused expression lines removed from .ts/.tsx files in ./src'); 