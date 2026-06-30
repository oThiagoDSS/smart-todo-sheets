// ─── Configuration for Sheets and Columns ───────────────────────────
const CONFIG = {
  sheets: ["Movies/Series", "Books", "Games", "Albums", "To-Do"],
  titleCol: 1,       // Column A
  priorityCol: 2,    // Column B
  startRow: 2        // Row 1 = Header
};

const PRIORITY_ORDER = { "High": 1, "Medium": 2, "Low": 3 };

// ─── Automatic Trigger on Edit ──────────────────────────────────────
function onEdit(e) {
  // Protection against manual execution without event object
  if (!e || !e.range) return;

  const sheet = e.range.getSheet();
  const validSheets = CONFIG.sheets;

  if (!validSheets.includes(sheet.getName())) return;
  if (e.range.getColumn() !== CONFIG.priorityCol) return;

  Utilities.sleep(300);
  sortByPriority(sheet);
}

// ─── Sorting Function ───────────────────────────────────────────────
function sortByPriority(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < CONFIG.startRow) return; // No data

  const range = sheet.getRange(
    CONFIG.startRow,
    CONFIG.titleCol,
    lastRow - CONFIG.startRow + 1,
    2 // Title + Priority columns
  );

  const data = range.getValues();

  // Filter out empty rows before sorting
  const validData = data.filter(row => row[0] !== "" || row[1] !== "");

  validData.sort((a, b) => {
    const pa = PRIORITY_ORDER[a[1]] ?? 99;
    const pb = PRIORITY_ORDER[b[1]] ?? 99;
    if (pa !== pb) return pa - pb;
    return String(a[0]).localeCompare(String(b[0])); // Alphabetical fallback
  });

  // Rewrite the range with sorted data
  if (validData.length > 0) {
    sheet.getRange(CONFIG.startRow, CONFIG.titleCol, validData.length, 2)
         .setValues(validData);
  }
}

// ─── Manual Button to Sort All Sheets At Once ──────────────────────
function sortAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  CONFIG.sheets.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    if (sheet) sortByPriority(sheet);
  });
  SpreadsheetApp.getUi().alert("✅ All sheets have been sorted!");
}
