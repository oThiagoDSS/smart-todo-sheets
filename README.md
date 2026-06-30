# Minimalist Smart To-Do List (Google Sheets + Apps Script)

A lightweight, automated productivity and media-tracking system built directly inside Google Sheets. This project uses **Google Apps Script (JavaScript)** to dynamically prioritize and organize lists in real-time based on custom user inputs.

## 📊 Live Template

To use this system yourself without having to configure everything from scratch, click the link below to generate a clean copy directly to your Google Drive (the automation script is already included):

👉 **[Make a Copy of the Google Sheets Template](https://docs.google.com/spreadsheets/d/1s2BfbpayAXjUklATmjqDRnMZq2AVSCMVMzmhzT5sE7o/copy?gid=258249414#gid=258249414)**

*Note: When editing for the first time, Google will ask for permission to run the script. This is standard security behavior for Apps Script.*

## 🚀 Features

- **Automated Real-Time Sorting:** Whenever a task's priority is set or modified, the script automatically pushes higher priority items to the top.
- **Alphabetical Tie-Breaking:** If two items share the same priority, they are automatically sorted alphabetically.
- **Multi-Tab Architecture:** Unified logic applied across multiple categorized sheets (`Movies/Series`, `Books`, `Games`, `Albums`, `To-Do`).
- **Data Integrity Protection:** Built-in safeguards that prevent empty rows from breaking the sorting execution or wiping out layout structures.
- **Global Manual Sort:** Includes a macro function to batch-sort all sheets instantly.

## 🛠️ Tech Stack

- **Platform:** Google Sheets
- **Language:** JavaScript (Google Apps Script Environment)

## 📋 How It Works

The core system relies on an `onEdit(e)` trigger that listens for changes specifically in the **Priority** column (Column B). 

1. The script validates if the active sheet is part of the tracked categories.
2. It fetches the dynamic range of active tasks using `getLastRow()`.
3. It maps text priorities (`High`, `Medium`, `Low`) into numerical weights (`1`, `2`, `3`).
4. Array sorting happens in-memory for optimal performance before rewriting the sorted values back to the spreadsheet.

## 🔧 Setup Instructions

1. Create a Google Spreadsheet with columns: `A1: Title` and `B1: Priority`.
2. Name your tabs exactly as configured in the script (e.g., `To-Do`, `Games`, etc.).
3. In the top menu, go to **Extensions** > **Apps Script**.
4. Paste the code from `Code.js` into the editor.
5. Save the project and you are ready to go! The automation triggers automatically on every edit in Column B.

## 📈 Future Roadmap

- [ ] Add a "Status" column (Pending / Done) and move completed items to the bottom or an archive tab.
- [ ] Implement a Telegram/Discord Webhook notification for high-priority tasks left incomplete.
- [ ] Build a simple web frontend using HTML Service to interact with the sheet without opening it.
