/**
 * This script provides email protection for a Google Sheet.
 * It prevents unauthorized users from editing rows in the "Student" sheet.
 * Only the student and admins are allowed to edit the rows.
 * If a non-admin user tries to edit a row that doesn't belong to them, the script restores the old value and displays an alert.
 * Admins are defined in the "Admins" sheet of the spreadsheet.
 */

function onEdit(e) {
  // Triggered when a cell is edited in the spreadsheet
  if (!e) {
    return;
  }

  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var userEmail = Session.getActiveUser().getEmail();
  var row = range.getRow();

  // Check if the edited sheet is the "Student" sheet and the row is not the header row
  if (sheet.getName() === "Student" && row > 1) {
    var studentEmail = sheet.getRange(row, 1).getValue().trim();
    var isAdmin = checkAdmin(userEmail);

    Logger.log('Editing row: ' + row);
    Logger.log('User email: ' + userEmail);
    Logger.log('Student email: ' + studentEmail);
    Logger.log('Is admin: ' + isAdmin);

    // Check if the user is not the student and not an admin
    if (userEmail !== studentEmail && !isAdmin) {
      e.range.setValue(e.oldValue); // Restore old value
      SpreadsheetApp.getUi().alert('You are not allowed to edit this row.');
    }
  }
}

/**
 * Checks if the given email is an admin.
 * Admins are defined in the "Admins" sheet of the spreadsheet.
 * @param {string} email - The email to check
 * @returns {boolean} - True if the email is an admin, false otherwise
 */
function checkAdmin(email) {
  var adminSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Admins");
  if (adminSheet) {
    var adminEmails = adminSheet.getRange("A2:A" + adminSheet.getLastRow()).getValues().flat().filter(String);
    Logger.log('Admin emails: ' + adminEmails);
    return adminEmails.includes(email);
  } else {
    Logger.log('Admins sheet not found');
    // If the Admins sheet doesn't exist, assume no one is an admin
    return false;
  }
}
