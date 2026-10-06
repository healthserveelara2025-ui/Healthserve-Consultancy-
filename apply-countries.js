const fs = require('fs');
const { generatePhoneCodeOptions, generateReviewCountryOptions } = require('./build-countries.js');

const indexPath = 'index.html';
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Replace #gateCountryCode
const gateRegex = /<select id="gateCountryCode"[^>]*>([\s\S]*?)<\/select>/;
const gateMatch = html.match(gateRegex);
if (!gateMatch) {
  console.error('Could not find #gateCountryCode in index.html');
  process.exit(1);
}
const newGatePhoneOptions = `\n${generatePhoneCodeOptions('            ')}\n          `;
html = html.replace(gateRegex, `<select id="gateCountryCode" class="country-code-select" aria-label="Country Code">${newGatePhoneOptions}</select>`);
console.log('Updated #gateCountryCode');

// 2. Replace #hookCountryCode
const hookRegex = /<select id="hookCountryCode"[^>]*>([\s\S]*?)<\/select>/;
const hookMatch = html.match(hookRegex);
if (!hookMatch) {
  console.error('Could not find #hookCountryCode in index.html');
  process.exit(1);
}
const newHookPhoneOptions = `\n${generatePhoneCodeOptions('                    ')}\n                  `;
// Notice we remove inline style="max-width: 120px;" so responsive CSS takes effect
html = html.replace(hookRegex, `<select id="hookCountryCode" class="country-code-select">${newHookPhoneOptions}</select>`);
console.log('Updated #hookCountryCode');

// 3. Replace #reviewCountrySelect
const reviewRegex = /<select id="reviewCountrySelect"[^>]*>([\s\S]*?)<\/select>/;
const reviewMatch = html.match(reviewRegex);
if (!reviewMatch) {
  console.error('Could not find #reviewCountrySelect in index.html');
  process.exit(1);
}
const newReviewOptions = `\n${generateReviewCountryOptions('                ')}\n              `;
html = html.replace(reviewRegex, `<select id="reviewCountrySelect" class="review-form-select" required>${newReviewOptions}</select>`);
console.log('Updated #reviewCountrySelect');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully updated index.html with all countries and country codes!');
