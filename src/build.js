const pug = require('pug');
const fs = require('fs-extra');
const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'hi'];
const BUILD_DIR = path.join(__dirname, '../docs');
// Base path for GitHub Pages (empty string for local development)
const BASE_PATH = '/thinketh';

// Ensure build directory exists and is empty
fs.emptyDirSync(BUILD_DIR);

// Copy CSS file
const cssDir = path.join(BUILD_DIR, 'css');
fs.ensureDirSync(cssDir);
fs.copyFileSync(
  path.join(__dirname, '../build/css/screen.css'),  // Original CSS path
  path.join(cssDir, 'style.css')  // New CSS path
);

// Compile index for each language
SUPPORTED_LANGUAGES.forEach(lang => {
  // Create language directory
  const langDir = path.join(BUILD_DIR, lang);
  fs.ensureDirSync(langDir);

  // Render page with appropriate content
  const html = pug.renderFile(path.join(__dirname, 'index.pug'), {
    currentLocale: lang,
    supportedLanguages: SUPPORTED_LANGUAGES,
    basePath: BASE_PATH,
    pretty: true
  });

  // Write HTML file
  fs.writeFileSync(path.join(langDir, 'index.html'), html);
});

// Create root index.html that redirects to default language
const redirectHTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${BASE_PATH}/en/">
    <script>window.location.href = "${BASE_PATH}/en/";</script>
  </head>
  <body>
    <p>Redirecting to <a href="${BASE_PATH}/en/">English version</a>...</p>
  </body>
</html>
`;

fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), redirectHTML);

console.log('Static site generated in /docs directory!');
