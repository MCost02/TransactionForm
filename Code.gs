/* Menu Bar Function - Currently hidden
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("💰 Tracker")
    .addItem("➕ New Transaction", "openTransactionForm")
    .addToUi();
}
*/

function openTransactionForm() {
  const html = HtmlService.createHtmlOutputFromFile("TransactionForm")
    .setTitle("New Transaction");
  SpreadsheetApp.getUi().showSidebar(html);
}

function saveTransaction(date, type, amount, notes) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Savings");
  const nextRow = sheet.getLastRow() + 1;

  sheet.getRange(nextRow, 1).setValue(new Date(date));
  sheet.getRange(nextRow, 2).setValue(type);
  sheet.getRange(nextRow, 3).setValue(Number(amount));
  sheet.getRange(nextRow, 6).setValue(notes);
}