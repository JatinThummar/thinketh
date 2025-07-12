const fs = require('fs');
const path = require('path');

class I18n {
  constructor(locale = 'en') {
    this.locale = locale;
    this.translations = this.loadTranslations(locale);
  }

  loadTranslations(locale) {
    try {
      const filePath = path.join(__dirname, 'locales', locale, 'translation.json');
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error);
      return {};
    }
  }

  setLocale(locale) {
    this.locale = locale;
    this.translations = this.loadTranslations(locale);
  }

  t(key) {
    return this.translations[key] || key;
  }
}

module.exports = I18n;
