const pug = require('pug');
const fs = require('fs-extra');
const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'hi'];
const BUILD_DIR = path.join(__dirname, '../docs'); // GitHub Pages uses /docs or /root

// Ensure build directory exists and is empty
fs.emptyDirSync(BUILD_DIR);

// Copy static assets
fs.copySync(path.join(__dirname, '../build/css'), path.join(BUILD_DIR, 'css'));

// Compile layout template
const layoutTemplate = pug.compileFile(path.join(__dirname, 'includes/layout.pug'));

// Compile index for each language
SUPPORTED_LANGUAGES.forEach(lang => {
  // Create language directory
  const langDir = path.join(BUILD_DIR, lang);
  fs.ensureDirSync(langDir);

  // Render page with appropriate content
  const html = pug.renderFile(path.join(__dirname, 'index.pug'), {
    currentLocale: lang,
    supportedLanguages: SUPPORTED_LANGUAGES,
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
    <meta http-equiv="refresh" content="0; url=./en/">
    <script>window.location.href = "./en/";</script>
  </head>
  <body>
    <p>Redirecting to <a href="./en/">English version</a>...</p>
  </body>
</html>
`;

fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), redirectHTML);

console.log('Static site generated in /docs directory!');
