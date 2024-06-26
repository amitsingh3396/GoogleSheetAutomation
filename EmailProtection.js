/**
 * Sends summaries by email to recipients listed in a Google Sheet.
 * Retrieves email addresses and corresponding summaries from the sheet,
 * and sends an email with the summary to each recipient.
 */
function sendSummariesByEmail() {
  // Get the active sheet in the spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the last row number in the sheet
  var lastRow = sheet.getLastRow();

  // Get the range of email addresses (column A) and summaries (column C)
  var emailRange = sheet.getRange(2, 1, lastRow - 1, 1);
  var summaryRange = sheet.getRange(2, 3, lastRow - 1, 1);

  // Get the values from the email and summary ranges
  var emails = emailRange.getValues();
  var summaries = summaryRange.getValues();

  // Loop through each row
  for (var i = 0; i < emails.length; i++) {
    var email = emails[i][0];
    var summary = summaries[i][0];

    // Check if email and summary are not empty
    if (email && summary) {
      sendEmail(email, summary);
    }
  }
}

function sendEmail(email, summary) {
  var subject = "Summary of Your Text";
  var message = "Dear User,\n\nHere is the summary of your text:\n\n" + summary + "\n\nBest regards,\nYour Company";
  
  MailApp.sendEmail(email, subject, message);
}
