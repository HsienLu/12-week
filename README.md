12 週計畫追蹤器（React + Vite）

說明

- 本專案已轉為使用 React + Vite 開發，原本的單檔版 `index.html` 已改為 Vite entry，最終可編譯成靜態檔案放上 GitHub Pages。
- 使用 localStorage 儲存，key 為 `twelve_week_tracker_v1`。

如何在本機啟動開發環境

1. 確認已安裝 Node.js 與 npm。
2. 在專案根目錄開啟 PowerShell，執行：

```powershell
cd 'd:\user\Desktop\12-week'
npm install
npm run dev
```

3. 打開開發伺服器提供的本機網址（預設 http://localhost:5173）。

部署

- 執行 `npm run build`，會在 `dist/` 產生靜態檔，適合放到 GitHub Pages 或任何靜態主機。

測試與 CI

- 已加入 Vitest 作為測試框架，並提供簡單的單元測試 `src/utils.test.js`。
- 本機執行測試：

```powershell
cd 'd:\user\Desktop\12-week'
npm install
npm test
```

- 已加入 GitHub Actions workflow (`.github/workflows/ci.yml`)：push / PR 時會自動安裝並執行 `npm test`。

備註

- 專案目前同時保留 `web/` 資料夾（若為冗餘可刪除）。
- 若要我替你跑一次安裝並啟動（在此環境我無法直接啟動瀏覽器，但可以提供命令與排錯指引），請告訴我。
