/**
 * GOOGLE APPS SCRIPT FOR HEALTHSERVE PPC LEAD CAPTURE
 * Automatically records all landing page enquiries to a Google Sheet
 * and sends instant notifications.
 *
 * HOW TO SET UP (Takes 2 minutes):
 * 1. Open Google Sheets (https://sheets.new)
 * 2. In row 1, set the following headers:
 *    A: Timestamp | B: Name | C: WhatsApp | D: English Comfort | E: Profession | F: Destination | G: Experience | H: Journey Stage | I: Source | J: Campaign | K: Keyword/Term | L: GCLID
 * 3. In Google Sheets menu, click: Extensions > Apps Script
 * 4. Delete any code in the editor and paste THIS ENTIRE FILE.
 * 5. Click "Deploy" > "New deployment"
 * 6. Select type: "Web app"
 * 7. Set:
 *    - Description: "Healthserve Lead Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT: allows the landing page to post data)
 * 8. Click "Deploy", copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 9. Paste your Web App URL into app.js in `GOOGLE_SHEET_WEBHOOK_URL`.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = new Date();
    var name = data.name || 'Anonymous';
    var whatsapp = data.whatsapp || '';
    var englishComfort = data.english_comfort || '';
    var profession = data.profession || '';
    var destination = data.destination || '';
    var experience = data.experience || '';
    var journeyStage = data.journey_stage || data.stage || '';
    var utmSource = data.utm_source || 'direct/cpc';
    var utmCampaign = data.utm_campaign || '';
    var utmTerm = data.utm_term || '';
    var gclid = data.gclid || '';

    // Append to sheet
    sheet.appendRow([
      timestamp,
      name,
      whatsapp,
      englishComfort,
      profession,
      destination,
      experience,
      journeyStage,
      utmSource,
      utmCampaign,
      utmTerm,
      gclid
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead recorded successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', message: 'Healthserve Lead Capture Endpoint is Live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
