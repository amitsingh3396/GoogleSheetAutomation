Sure! Here is a README file that explains the usage and functionality of the provided Google Apps Script code:

---

# Google Sheets Script Project

## Overview

This project consists of a Google Apps Script that enhances the functionality of a Google Sheet. The script performs three main functions:

1. Restricts editing based on user roles.
2. Generates summaries for texts in the sheet using the Gemini API.
3. Sends the generated summaries to specified email addresses.

## Features

1. **Edit Restriction**: Ensures only the respective user or an admin can edit certain rows.
2. **Text Summarization**: Uses the Gemini API to generate summaries for texts in the sheet.
3. **Email Summaries**: Sends the generated summaries to specified email addresses.

## Files

The project consists of three main script files:

1. `onEdit.js` - Handles the edit restrictions.
2. `generateSummaries.js` - Manages text summarization.
3. `sendSummariesByEmail.js` - Sends the generated summaries via email.

## Installation and Setup

1. **Create a Google Sheet**:
   - Create a new Google Sheet.
   - Add two sheets within the Google Sheet: `Student` and `Admins`.

2. **Configure the Sheets**:
   - **Student Sheet**: The first column (A) should contain the student email addresses, the second column (B) should have the text entries, and the third column (C) will store the generated summaries.
   - **Admins Sheet**: The first column (A) should contain the email addresses of the admin users.

3. **Open the Script Editor**:
   - In your Google Sheet, navigate to `Extensions` > `Apps Script`.

4. **Create the Script Files**:
   - Create the three script files (`onEdit.js`, `generateSummaries.js`, and `sendSummariesByEmail.js`) in the Apps Script editor.

5. **Copy the Provided Code**:
   - Copy the provided code into their respective script files in the Apps Script editor.

6. **Save the Scripts**:
   - Save each script file.

7. **Set Up Triggers**:
   - Set up an `onEdit` trigger for the `onEdit` function:
     - Go to `Triggers` > `Add Trigger`.
     - Choose `onEdit` from the function dropdown.
     - Choose `From spreadsheet` as the event source.
     - Choose `On edit` as the event type.

## Usage

### 1. Edit Restriction

The `onEdit` function checks if the user attempting to edit a row is either the owner of the email in the first column or an admin. If the user is not authorized, the change is reverted and a message is shown.

### 2. Generating Summaries

The `generateSummaries` function fetches text entries from column B of the `Student` sheet, sends them to the Gemini API for summarization, and writes the summaries to column C.

- **API Key**: Ensure you have a valid Gemini API key and replace the placeholder in the script with your actual key.

### 3. Sending Summaries by Email

The `sendSummariesByEmail` function retrieves the email addresses from column A and the corresponding summaries from column C of the `Student` sheet, then sends the summaries to the respective emails.

### Running the Scripts

- To generate summaries, manually run the `generateSummaries` function or set up a trigger to run it periodically.
- To send summaries by email, run the `sendSummariesByEmail` function manually or set up a trigger to run it periodically.

## Debugging

- Use `Logger.log` statements to debug and view logs in the Apps Script editor under `View > Logs`.
- Ensure proper permissions are granted to the script for accessing the Google Sheet and sending emails.


