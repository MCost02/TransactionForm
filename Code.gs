/* Menu Bar Function - Currently hidden
function onOpen() {
SpreadsheetApp.getUi()
  .createMenu("💰 Tracker")
  .addItem("➕ New Savings Transaction", "openSavingsTransactionForm")
  .addToUi();
}
*/

// Allows other sheets to use Styles.html as GAS doesn't support external style sheets over url
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function openSavingsTransactionForm() {
  const html = HtmlService.createTemplateFromFile("SavingsTransactionForm") // Gets form as .html template with placeholders
    .evaluate() // Processes template, replacing placeholders with styling from Styles.html 
    .setTitle("New Transaction");
  SpreadsheetApp.getUi().showSidebar(html);
}

function saveSavingsTransaction(date, type, amount, notes) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Savings");
  const nextRow = sheet.getLastRow() + 1;
  // Fills out corresponding columns Savings Sheet based on form input.
  sheet.getRange(nextRow, 1).setValue(new Date(date));
  sheet.getRange(nextRow, 2).setValue(type);
  sheet.getRange(nextRow, 3).setValue(Number(amount));
  sheet.getRange(nextRow, 5).setValue(notes);
}