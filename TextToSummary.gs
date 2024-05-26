/**
 * Generates summaries for text data in a spreadsheet.
 */
function generateSummaries() {
  // Get the active spreadsheet and the first sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Get the data range in column 2
  var dataRange = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1);
  var texts = dataRange.getValues();
  // Loop through each text in column 2
  for (var i = 0; i < texts.length; i++) {
    var text = texts[i][0];
    var existingSummary = sheet.getRange(i + 2, 3).getValue(); // Get existing summary from the same row in column 3
    // Generate summary only if there is no existing summary
    if (!existingSummary || existingSummary.trim() === '') {
      // Log the text being sent to the API
      Logger.log('Text sent to API: ' + text);
      var summary = generateSummary(text);
      // Write the summary in the adjacent column (column 3)
      sheet.getRange(i + 2, 3).setValue(summary);
    }
  }
}

/**
 * Generates a summary for the given text using a Generative Language API.
 * @param {string} text - The text to generate a summary for.
 * @returns {string} The generated summary.
 */
function generateSummary(text) {
  var apiKey = 'GEMINI_API_KEY'; // Replace with your actual API key
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
  var payload = {
    "contents": [
      {
        "parts": [
          {
            "text": text
          }
        ]
      }
    ]
  };
  // Log the API request payload
  Logger.log('API Request Payload: ' + JSON.stringify(payload));
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    var contentText = response.getContentText();
    Logger.log('API Response Status Code: ' + statusCode);
    Logger.log('API Response Content: ' + contentText);
    var jsonResponse = JSON.parse(contentText);
    // Correct response parsing
    if (jsonResponse && jsonResponse.candidates && jsonResponse.candidates.length > 0 && jsonResponse.candidates[0].content && jsonResponse.candidates[0].content.parts.length > 0) {
      var generatedContent = jsonResponse.candidates[0].content.parts[0].text;
      Logger.log('Generated Content: ' + generatedContent);
      return generatedContent;
    } else {
      Logger.log('No content found in API response.');
      return 'No summary found';
    }
  } catch (e) {
    // Log any errors
    Logger.log('Error fetching data from Generative Language API: ' + e.message);
    return 'Error generating summary.';
  }
}
function generateSummaries() {
  // Get the active spreadsheet and the first sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Get the data range in column 2
  var dataRange = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1);
  var texts = dataRange.getValues();
  // Loop through each text in column 2
  for (var i = 0; i < texts.length; i++) {
    var text = texts[i][0];
    var existingSummary = sheet.getRange(i + 2, 3).getValue(); // Get existing summary from the same row in column 3
    // Generate summary only if there is no existing summary
    if (!existingSummary || existingSummary.trim() === '') {
      // Log the text being sent to the API
      Logger.log('Text sent to API: ' + text);
      var summary = generateSummary(text);
      // Write the summary in the adjacent column (column 3)
      sheet.getRange(i + 2, 3).setValue(summary);
    }
  }
}
function generateSummary(text) {
  var apiKey = 'GEMINI_API_KEY'; // Replace with your actual API key
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey;
  var payload = {
    "contents": [
      {
        "parts": [
          {
            "text": text
          }
        ]
      }
    ]
  };
  // Log the API request payload
  Logger.log('API Request Payload: ' + JSON.stringify(payload));
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload),
    'muteHttpExceptions': true
  };
  try {
    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    var contentText = response.getContentText();
    Logger.log('API Response Status Code: ' + statusCode);
    Logger.log('API Response Content: ' + contentText);
    var jsonResponse = JSON.parse(contentText);
    // Correct response parsing
    if (jsonResponse && jsonResponse.candidates && jsonResponse.candidates.length > 0 && jsonResponse.candidates[0].content && jsonResponse.candidates[0].content.parts.length > 0) {
      var generatedContent = jsonResponse.candidates[0].content.parts[0].text;
      Logger.log('Generated Content: ' + generatedContent);
      return generatedContent;
    } else {
      Logger.log('No content found in API response.');
      return 'No summary found';
    }
  } catch (e) {
    // Log any errors
    Logger.log('Error fetching data from Generative Language API: ' + e.message);
    return 'Error generating summary.';
  }
}
