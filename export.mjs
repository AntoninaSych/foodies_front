// export.js — дамп проєкту у project_dump.txt, з урахуванням .gitignore
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ignore from 'ignore';

// налаштовуємо __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// читаємо .gitignore
const gitignorePath = path.join(__dirname, '.gitignore');
const ig = ignore();
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  ig.add(gitignoreContent);
}

const outFile = path.join(__dirname, 'project_dump.txt');
const stream = fs.createWriteStream(outFile, { encoding: 'utf8' });

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const dirent of entries) {
    // складуємо відносний шлях від кореня
    const relPath = path.relative(__dirname, path.join(dir, dirent.name));

    // пропускаємо сам файл дампу та .git
    if (
      relPath === 'project_dump.txt' ||
      relPath.startsWith('.git' + path.sep)
    ) continue;

    // пропускаємо за .gitignore
    if (ig.ignores(relPath)) continue;

    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      walk(fullPath);
    } else {
      stream.write(`=== File: ${relPath} ===\n`);
      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        stream.write(content);
      } catch (err) {
        stream.write(`[Error reading file: ${err.message}]\n`);
      }
      stream.write('\n\n');
    }
  }
}

walk(__dirname);
stream.end(() => console.log(`Готово: ${outFile}`));
