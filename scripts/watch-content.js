const fs = require('fs');
const path = require('path');
let chokidar = null;
try {
  chokidar = require('chokidar');
} catch (e) {
  // optional dependency; we'll fallback to fs.watch
}

const contentGlob = path.join(process.cwd(), 'content');
const versionFile = path.join(process.cwd(), 'lib', 'contentVersion.js');

function writeVersion() {
  const v = Date.now().toString();
  const data = `// Auto-generated. Triggers dev HMR when content changes\nexport const version = "${v}";\n`;
  fs.writeFileSync(versionFile, data);
  console.log(`[watch-content] Updated version: ${v}`);
}

writeVersion();

if (chokidar) {
  const watcher = chokidar.watch(['**/*.pug'], { cwd: contentGlob, ignoreInitial: true });
  watcher.on('all', (event, file) => {
    console.log(`[watch-content] ${event}: ${file}`);
    writeVersion();
  });
  process.on('SIGINT', () => { watcher.close(); process.exit(0); });
  console.log('[watch-content] Using chokidar');
} else {
  console.log('[watch-content] chokidar not found, using fs.watch fallback');
  try {
    fs.watch(contentGlob, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.pug')) {
        console.log(`[watch-content] ${eventType}: ${filename}`);
        writeVersion();
      }
    });
  } catch (e) {
    // Non-macOS platforms may not support recursive; watch subdirs
    const stack = [contentGlob];
    while (stack.length) {
      const dir = stack.pop();
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) stack.push(full);
      }
      fs.watch(dir, (eventType, filename) => {
        if (filename && filename.endsWith('.pug')) {
          console.log(`[watch-content] ${eventType}: ${path.join(dir, filename)}`);
          writeVersion();
        }
      });
    }
  }
}
