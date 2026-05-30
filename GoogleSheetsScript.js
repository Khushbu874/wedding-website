/**
 * Shivangi & Satyam - Wedding Website Google Sheets Backend
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Spreadsheet ("Shivangi & Satyam").
 * 2. Click on "Extensions" > "Apps Script".
 * 3. Delete any code in the editor and paste this entire code.
 * 4. Click "Save" (disk icon).
 * 5. Click "Deploy" > "New deployment".
 * 6. Select Type: "Web app" (click gear icon if not visible).
 * 7. Set Description: "Wedding Backend".
 * 8. Set Execute as: "Me" (your email).
 * 9. Set Who has access: "Anyone" (CRITICAL: this must be "Anyone" so guests can post wishes/RSVPs!).
 * 10. Click "Deploy" and authorize permissions if prompted.
 * 11. Copy the "Web app URL" (looks like https://script.google.com/macros/s/XXXX/exec).
 * 12. Paste this URL in your React code config (defined in WishesWall.jsx and RSVP.jsx).
 */

function doGet(e) {
  var action = e.parameter.action;
  
  if (action === 'wishes') {
    return getWishes();
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var action = "";
  var data = {};
  
  // Extract and parse POST parameters robustly
  if (e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
      action = data.action;
    } catch (err) {
      action = e.parameter.action;
      data = e.parameter;
    }
  } else {
    action = e.parameter.action;
    data = e.parameter;
  }
  
  if (action === 'wishes') {
    return addWish(data);
  } else if (action === 'rsvp') {
    return addRSVP(data);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Invalid action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------------------- LOGIC METHODS ----------------------

function getWishes() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Wishes Wall");
    
    if (!sheet) {
      return createErrorOutput("Wishes Wall tab not found in spreadsheet");
    }
    
    var rows = sheet.getDataRange().getValues();
    var wishesList = [];
    
    // Start at i=1 to skip the header row (Time Stamp, Name, Wishes)
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][1] || rows[i][2]) { // Make sure name or wish is not empty
        wishesList.push({
          id: i,
          name: rows[i][1],
          message: rows[i][2],
          timestamp: formatTimestamp(rows[i][0])
        });
      }
    }
    
    // Return newest wishes first (to match frontend display)
    wishesList.reverse();
    
    return createJSONOutput({ status: "success", data: wishesList });
  } catch (err) {
    return createErrorOutput(err.toString());
  }
}

function addWish(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Wishes Wall");
    
    if (!sheet) {
      return createErrorOutput("Wishes Wall tab not found in spreadsheet");
    }
    
    var name = data.name || "Anonymous";
    var message = data.message || "";
    var timestamp = new Date();
    
    // Append row: Time Stamp, Name, Wishes
    sheet.appendRow([timestamp, name, message]);
    
    return createJSONOutput({ status: "success", message: "Wish added successfully" });
  } catch (err) {
    return createErrorOutput(err.toString());
  }
}

function addRSVP(data) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("RSVP");
    
    if (!sheet) {
      return createErrorOutput("RSVP tab not found in spreadsheet");
    }
    
    var fullName = data.fullName || "";
    var noOfGuests = data.guests || "1";
    var attendance = data.attendance || "";
    var foodPreference = data.foodPreference || "";
    var message = data.message || "";
    var timestamp = new Date();
    
    // Append row: Time Stamp, Full Name, No. of Guests, Attendance, Food Preference, Message or Blessings...
    sheet.appendRow([timestamp, fullName, noOfGuests, attendance, foodPreference, message]);
    
    return createJSONOutput({ status: "success", message: "RSVP added successfully" });
  } catch (err) {
    return createErrorOutput(err.toString());
  }
}

// ---------------------- UTILITIES ----------------------

function formatTimestamp(dateObj) {
  if (!dateObj) {
    return "";
  }
  
  var date;
  if (dateObj instanceof Date) {
    date = dateObj;
  } else {
    try {
      date = new Date(dateObj);
      if (isNaN(date.getTime())) {
        return dateObj.toString();
      }
    } catch (e) {
      return dateObj.toString();
    }
  }
  
  try {
    return date.toISOString();
  } catch (e) {
    return date.toString();
  }
}

function createJSONOutput(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
  
  // Enable CORS
  return output;
}

function createErrorOutput(message) {
  return createJSONOutput({ status: "error", message: message });
}
