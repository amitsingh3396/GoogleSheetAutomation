function sendSummariesByEmail() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();

  // Get data range for emails (column A) and summaries (column C)
  var emailRange = sheet.getRange(2, 1, lastRow - 1, 1);
  var summaryRange = sheet.getRange(2, 3, lastRow - 1, 1);
  
  // Get values from the ranges
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
