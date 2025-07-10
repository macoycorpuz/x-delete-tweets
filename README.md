# 🧹 Tweet Deleter – Console-Based Tool to Bulk Delete Tweets from Your Twitter Archive

**Tweet Deleter** is a simple, privacy-first tool that helps you bulk delete tweets directly from your browser using your Twitter archive.

✅ No login  
✅ No installations  
✅ No server or extension needed  
✅ Deletes tweets using your logged-in Twitter session  
✅ Runs entirely in the browser via the DevTools Console

---

## ✨ Features

- Upload your `tweet-headers.js` from Twitter's official Data Export
- Extracts tweet IDs locally from the file
- Deletes tweets using Twitter’s internal API and your logged-in session
- Uses a visible file input for easier upload
- Shows real-time progress in the browser console
- Respects rate limits with controlled concurrency

---

## 📦 How to Use

### Step 1: Download Your Twitter Archive

Visit [https://twitter.com/settings/your_twitter_data](https://twitter.com/settings/your_twitter_data)  
Wait for Twitter to email your archive, then unzip it and locate:

```
/data/tweet-headers.js
```

---

### Step 2: Run the Deleter Script

1. Open your browser (Chrome or Firefox)
2. Go to your Twitter profile: `https://x.com/YOUR_USERNAME`
3. Open **DevTools Console** (Right-click → Inspect → Console tab)
4. Paste the contents of [`tweet-deleter.js`](./tweet-deleter.js) into the console
5. A visible upload box will appear at the top-left
6. Upload your `tweet-headers.js` file
7. The script will begin deleting tweets and show progress in the console

---

## 🛠️ Technical Notes

- Uses Twitter’s internal GraphQL API:

```
/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet
```

 Uses your current session cookies (`ct0`, OAuth token) to authenticate
- Deletes in batches (5 at a time with 1.5s delay) to avoid rate-limiting

---

## 🔐 Privacy & Security

- All operations happen **locally in your browser**
- Your archive file is never uploaded or sent anywhere
- Your login/session is used *only* to authenticate against Twitter while you're actively logged in

---

## ⚠️ Disclaimer

This tool is provided as-is. Use responsibly.  
**Deletions are permanent** and cannot be undone.  
Not affiliated with Twitter/X.

---

Want to contribute or request a feature? Feel free to open an issue or PR!