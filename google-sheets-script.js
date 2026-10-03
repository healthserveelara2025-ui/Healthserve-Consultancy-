/**
 * GOOGLE APPS SCRIPT FOR HEALTHSERVE PPC LEAD CAPTURE
 * Bound Spreadsheet: G Ads Lead Sheet
 * Target Sheet URL: https://docs.google.com/spreadsheets/d/1g6W43-BMVKRhh_C87RNIshg3TF54gIt9Mcq8bQLn6pQ/edit
 *
 * HOW TO ACTIVATE IN 30 SECONDS:
 * 1. Open your sheet: https://docs.google.com/spreadsheets/d/1g6W43-BMVKRhh_C87RNIshg3TF54gIt9Mcq8bQLn6pQ/edit
 * 2. In top menu, click: Extensions > Apps Script
 * 3. Delete any code in the editor window and paste THIS ENTIRE FILE.
 * 4. Click "Deploy" (blue button at top right) > "New deployment"
 * 5. Click the gear icon next to "Select type" and choose "Web app"
 * 6. Set the settings:
 *    - Description: Healthserve Lead Collector
 *    - Execute as: Me (healthserve.ae@gmail.com)
 *    - Who has access: Anyone  (IMPORTANT: this allows form submissions to reach your sheet)
 * 7. Click "Deploy", click "Authorize access", choose your Google account and click "Allow".
 * 8. Copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 9. Provide that URL or paste it into app.js in `GOOGLE_SHEET_WEBHOOK_URL`.
 */

var SPREADSHEET_ID = "1g6W43-BMVKRhh_C87RNIshg3TF54gIt9Mcq8bQLn6pQ";

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();

    // Setup headers on row 1 if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (Dubai GST)",
        "Candidate Name",
        "WhatsApp / Phone",
        "Profession",
        "Target Destination",
        "Years Experience",
        "Current Journey Stage",
        "English Comfort",
        "Source Form",
        "UTM Campaign",
        "UTM Source",
        "GCLID"
      ]);
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#E0F2FE");
      headerRange.setFontColor("#0369A1");
      sheet.setFrozenRows(1);
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var dubaiTime = Utilities.formatDate(new Date(), "Asia/Dubai", "yyyy-MM-dd HH:mm:ss");
    var name = data.name || 'Anonymous Candidate';
    var whatsapp = data.whatsapp || '';
    var englishComfort = data.english_comfort || 'Not specified';
    var profession = data.profession || 'Not specified';
    var destination = data.destination || 'GCC';
    var experience = data.experience || 'Not specified';
    var journeyStage = data.journey_stage || data.stage || 'Planning & Exploring';
    var sourceForm = data.source_form || data.source_action || 'Landing Page Form';
    var utmCampaign = data.utm_campaign || 'gcc_healthcare';
    var utmSource = data.utm_source || 'google_search_ads';
    var gclid = data.gclid || '';

    // Append to sheet
    sheet.appendRow([
      dubaiTime,
      name,
      whatsapp,
      profession,
      destination,
      experience,
      journeyStage,
      englishComfort,
      sourceForm,
      utmCampaign,
      utmSource,
      gclid
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead recorded to G Ads Lead Sheet' }))
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
    .createTextOutput(JSON.stringify({
      status: 'active',
      sheet: 'G Ads Lead Sheet',
      spreadsheet_id: SPREADSHEET_ID,
      message: 'Healthserve Google Sheet Webhook is active and listening.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
