const express = require('express');
const path = require('path');
const pug = require('pug');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3001;

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'hi'];
const DEFAULT_LANGUAGE = 'en';

// Serve static files
app.use(express.static(path.join(__dirname, '../build')));

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname);

// Add debug logging for template rendering
app.use((req, res, next) => {
  const render = res.render;
  res.render = function() {
    console.log('Render called with:', arguments);
    return render.apply(this, arguments);
  }
  next();
});

// Redirect root to default language
app.get('/', (req, res) => {
  res.redirect(`/${DEFAULT_LANGUAGE}`);
});

// Language-specific routes
app.get('/:lang', (req, res) => {
  const lang = req.params.lang;
  
  // Validate language
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    console.log(`Invalid language requested: ${lang}, redirecting to ${DEFAULT_LANGUAGE}`);
    return res.redirect(`/${DEFAULT_LANGUAGE}`);
  }

  // Check if language content exists
  const contentPath = path.join(__dirname, 'includes', lang, 'content.pug');
  console.log('Looking for content at:', contentPath);
  
  if (!fs.existsSync(contentPath)) {
    console.error(`Content not found for language: ${lang} at path: ${contentPath}`);
    return res.redirect(`/${DEFAULT_LANGUAGE}`);
  }

  console.log(`Rendering page for language: ${lang}`);
  res.render('index', { 
    currentLocale: lang,
    supportedLanguages: SUPPORTED_LANGUAGES
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`);
  console.log(`Default language: ${DEFAULT_LANGUAGE}`);
});
