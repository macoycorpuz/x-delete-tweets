(() => {
  let tweetIds = []

  const log = (...args) => console.log("[Tweet Deleter]", ...args)

  const extractTweetIds = (text) => {
    try {
      const cut = text.indexOf("=")
      const raw = text.slice(cut + 1)
      const json = JSON.parse(raw)
      return json.map(t => t.tweet?.tweet_id || t.tweet?.id_str).filter(Boolean)
    } catch (err) {
      log("❌ Failed to parse file:", err.message)
      return []
    }
  }

  const showUI = () => {
    const container = document.createElement("div")
    container.id = "tweetDeleterUI"
    container.style = `
      position: fixed; top: 20px; left: 20px; z-index: 9999;
      background: white; padding: 12px; border: 1px solid #ccc;
      border-radius: 8px; font-family: sans-serif; font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 280px;
    `

    container.innerHTML = `
      <label><strong>📁 Select tweet-headers.js</strong></label><br/>
      <input type="file" id="tweetFile" accept=".js,.json" style="margin: 8px 0; width: 100%;" />
      <progress id="tweetProgress" value="0" max="100" style="width: 100%; height: 16px;"></progress>
      <div id="tweetStatus" style="margin-top: 6px;">Waiting for file...</div>
    `
    document.body.appendChild(container)

    document.getElementById("tweetFile").addEventListener("change", async (e) => {
      const file = e.target.files[0]
      const text = await file.text()
      tweetIds = extractTweetIds(text)

      if (!tweetIds.length) {
        updateStatus("❌ No tweet IDs found.")
        return
      }

      updateStatus(`✅ ${tweetIds.length} tweets loaded.`)
      deleteTweets(tweetIds)
    })
  }

  const updateProgress = (value, total) => {
    const progress = document.getElementById("tweetProgress")
    const percent = Math.floor((value / total) * 100)
    progress.value = percent
    updateStatus(`🗑️ ${value} / ${total} deleted...`)
  }

  const updateStatus = (msg) => {
    const status = document.getElementById("tweetStatus")
    if (status) status.textContent = msg
  }

  const deleteTweets = async (ids) => {
    const ct0 = document.cookie.match(/ct0=([^;]+)/)?.[1]
    const bearer = "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA"
    const url = "https://x.com/i/api/graphql/VaenaVgh5q5ih7kvyVjgtg/DeleteTweet"
    const concurrency = 5
    const delay = 1500
    let deleted = 0

    for (let i = 0; i < ids.length; i += concurrency) {
      const batch = ids.slice(i, i + concurrency)

      await Promise.all(batch.map(async (id, index) => {
        const res = await fetch(url, {
          method: "POST",
          credentials: "include",
          headers: {
            authorization: bearer,
            "content-type": "application/json",
            "x-csrf-token": ct0,
            "x-twitter-auth-type": "OAuth2Session",
            "x-twitter-active-user": "yes"
          },
          body: JSON.stringify({
            variables: { tweet_id: id, dark_request: false },
            queryId: "VaenaVgh5q5ih7kvyVjgtg"
          })
        })

        deleted++
        if (res.status === 200) {
          log(`✅ ${deleted}/${ids.length} Deleted ${id}`)
        } else {
          log(`❌ ${deleted}/${ids.length} Failed ${id} (${res.status})`)
        }

        updateProgress(deleted, ids.length)
      }))

      await new Promise(r => setTimeout(r, delay))
    }

    updateStatus("🎉 All done.")
    log("🎉 All tweets deleted.")
  }

  showUI()
  log("📁 Upload UI displayed in top-left corner.")
})()
