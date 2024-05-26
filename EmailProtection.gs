function onEdit(e) {
  if (!e) {
    return;
  }

  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var userEmail = Session.getActiveUser().getEmail();
  var row = range.getRow();

  if (sheet.getName() === "Student" && row > 1) {
    var studentEmail = sheet.getRange(row, 1).getValue().trim();
    var isAdmin = checkAdmin(userEmail);

    Logger.log('Editing row: ' + row);
    Logger.log('User email: ' + userEmail);
    Logger.log('Student email: ' + studentEmail);
    Logger.log('Is admin: ' + isAdmin);

    if (userEmail !== studentEmail && !isAdmin) {
      e.range.setValue(e.oldValue); // Restore old value
      SpreadsheetApp.getUi().alert('You are not allowed to edit this row.');
    }
  }
}

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
