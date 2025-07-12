const pug = require('pug');
const fs = require('fs-extra');
const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'hi'];
const BUILD_DIR = path.join(__dirname, '../docs');

// Base path is conditional based on environment
const isDev = process.env.NODE_ENV === 'development';
const BASE_PATH = isDev ? '' : '/thinketh';

console.log(`Building for ${isDev ? 'development' : 'production'} with base path: "${BASE_PATH}"`);

// Ensure build directory exists and is empty
fs.emptyDirSync(BUILD_DIR);

// Copy CSS file - ensuring we copy the right CSS file
const cssDir = path.join(BUILD_DIR, 'css');
fs.ensureDirSync(cssDir);

// Copy and rename the CSS file
fs.copyFileSync(
  path.join(__dirname, '../build/css/screen.css'),
  path.join(cssDir, 'style.css')
);

console.log('CSS file copied to:', path.join(cssDir, 'style.css'));

// Function to render a page with given locale
const renderPage = (locale) => {
  return pug.renderFile(path.join(__dirname, 'index.pug'), {
    currentLocale: locale,
    supportedLanguages: SUPPORTED_LANGUAGES,
    basePath: BASE_PATH,
    isDev: isDev,
    pretty: true,
    cssPath: `${BASE_PATH}/css/style.css` // Explicit CSS path
  });
};

// Build language-specific pages
SUPPORTED_LANGUAGES.forEach(lang => {
  const langDir = path.join(BUILD_DIR, lang);
  fs.ensureDirSync(langDir);
  fs.writeFileSync(path.join(langDir, 'index.html'), renderPage(lang));
});

// Create root index.html with English content (no redirect)
fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), renderPage('en'));

console.log('Static site generated in /docs directory!');
