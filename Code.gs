/* Menu Bar Function - Currently hidden
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("New Transaction")
    .addItem("➕ New Savings Transaction", "openSavingsTransactionForm")
    .addItem("➕ New Options Transaction", "openOptionsTransactionForm")
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
    .setTitle("New Savings Transaction");
  SpreadsheetApp.getUi().showSidebar(html);
}

function saveSavingsTransaction(date, type, amount, notes) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Savings");
  const nextRow = sheet.getLastRow() + 1;
  // Fills out corresponding columns in Savings Sheet based on form input.
  sheet.getRange(nextRow, 1).setValue(new Date(date));
  sheet.getRange(nextRow, 2).setValue(type);
  sheet.getRange(nextRow, 3).setValue(Number(amount));
  sheet.getRange(nextRow, 5).setValue(notes);
}

function openOptionsTransactionForm() {
  const html = HtmlService.createTemplateFromFile("OptionsTransactionForm") // Gets form as .html template with placeholders
    .evaluate() // Processes template, replacing placeholders with styling from Styles.html 
    .setTitle("New Options Transaction");
  SpreadsheetApp.getUi().showSidebar(html);
}

function saveOptionsTransaction(symbol, strikePrice, putCall, expiration, buyDate, buyPrice, sellDate, sellPrice) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Options");
  const nextRow = sheet.getLastRow() + 1;
  // Fills out corresponding columns in Options Sheet based on form input.
  sheet.getRange(nextRow, 1).setValue(symbol);
  sheet.getRange(nextRow, 2).setValue(Number(strikePrice));
  sheet.getRange(nextRow, 3).setValue(putCall);
  sheet.getRange(nextRow, 4).setValue(new Date(expiration));
  sheet.getRange(nextRow, 5).setValue(new Date(buyDate));
  sheet.getRange(nextRow, 6).setValue(Number(buyPrice));
  if (sellDate) sheet.getRange(nextRow, 7).setValue(new Date(sellDate));
  if (sellPrice) sheet.getRange(nextRow, 8).setValue(Number(sellPrice));
}
