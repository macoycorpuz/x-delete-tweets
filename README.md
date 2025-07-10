# 🧹 Tweet Deleter – Local Tool to Delete Tweets in Bulk

**Tweet Deleter** is a lightweight, privacy-friendly HTML tool that lets you bulk-delete tweets from your Twitter archive — right from your browser.

No installs. No servers. No logins.  
Just open the file, upload your archive, and clean up your timeline.

---

## ✨ Features

- ✅ Upload your `tweet-headers.js` from Twitter Data Export
- ✅ Extracts all Tweet IDs locally
- ✅ Deletes tweets using your active Twitter session
- ✅ Displays progress in real time
- ✅ Runs entirely in your browser — **no data is ever uploaded**

---

## 🛠️ How It Works

1. Open `tweet-deleter.html` in your browser (Chrome or Firefox).
2. Upload your `tweet-headers.js` file from your [Twitter archive](https://twitter.com/settings/your_twitter_data).
3. The script extracts tweet IDs from the file.
4. It sends delete requests directly to Twitter’s API using your current logged-in session (via `fetch` with `credentials: include`).
5. Deletes tweets in batches with controlled concurrency to avoid rate-limiting.

---

## 🧪 Requirements

- You must be **logged into Twitter/X** in the same browser
- Use the official `tweet-headers.js` file from your Twitter archive

---

## 📦 File Included

- `tweet-deleter.html` – Open this file in your browser to use the tool

---

## 🔐 Privacy & Security

- All processing happens **locally in your browser**
- No data is collected, stored, or sent anywhere
- Your session cookies are used only to send delete requests to Twitter

---

## ⚠️ Disclaimer

Use responsibly. Deletions are permanent and **cannot be undone**.  
This tool is not affiliated with Twitter/X.
