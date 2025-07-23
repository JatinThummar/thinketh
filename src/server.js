const express = require('express');
const path = require('path');
const pug = require('pug');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'gu'];
const DEFAULT_LANGUAGE = 'en';

// Serve static files
app.use(express.static(path.join(__dirname, '../build')));

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname);

// Redirect root to default language
app.get('/', (req, res) => {
  res.redirect(`/${DEFAULT_LANGUAGE}`);
});

// Language-specific routes
app.get('/:lang', (req, res) => {
  const lang = req.params.lang;
  
  // Validate language
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return res.redirect(`/${DEFAULT_LANGUAGE}`);
  }

  // Check if language content exists
  const contentPath = path.join(__dirname, 'includes', lang, 'content.pug');
  if (!fs.existsSync(contentPath)) {
    console.error(`Content not found for language: ${lang}`);
    return res.redirect(`/${DEFAULT_LANGUAGE}`);
  }

  res.render('index', { 
    currentLocale: lang,
    supportedLanguages: SUPPORTED_LANGUAGES
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).redirect(`/${DEFAULT_LANGUAGE}`);
});

// Only listen on port if not running on Vercel
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

// Export the app for Vercel
module.exports = app;
