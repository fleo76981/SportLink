# SportLink - 運動揪團平台

一個基於 React + Vite + Firebase 建立的即時運動揪團平台。

## 🚀 快速開始

### 1. 安裝環境
請確保您的電腦已安裝 [Node.js](https://nodejs.org/)。

```bash
# 安裝依賴套件
npm install

# 啟動開發伺服器
npm run dev
```

### 2. 環境變數設定
本專案使用 Firebase 作為後端，請參考 `.env.example` 建立 `.env` 檔案並填入您的 Firebase 金鑰：

```env
VITE_FIREBASE_API_KEY=您的API金鑰
VITE_FIREBASE_AUTH_DOMAIN=您的專案網域
VITE_FIREBASE_PROJECT_ID=您的專案ID
...依此類推
```

---

## 📦 自動部署 (GitHub Pages)

本專案已設定 GitHub Actions 自動部署，每當您推送程式碼至 `main` 分支時，系統會自動編譯並發布。

### 部署設定步驟 (初次上傳至 GitHub)：

1. **GitHub Repository 設定**：
   * 在 GitHub 專案頁面點選 **Settings** -> **Pages**。
   * 在 **Build and deployment** -> **Source** 選擇 `GitHub Actions`。

2. **設定環境變數 (Secrets)**：
   * 由於 `.env` 不會上傳，您必須將金鑰存放在 GitHub。
   * 在 GitHub 專案頁面點選 **Settings** -> **Secrets and variables** -> **Actions**。
   * 點選 **New repository secret**，並依照 `.env.example` 的清單逐一新增以下項目：
     * `VITE_FIREBASE_API_KEY`
     * `VITE_FIREBASE_AUTH_DOMAIN`
     * `VITE_FIREBASE_PROJECT_ID`
     * `VITE_FIREBASE_STORAGE_BUCKET`
     * `VITE_FIREBASE_MESSAGING_SENDER_ID`
     * `VITE_FIREBASE_APP_ID`

3. **推送程式碼**：
   * 完成上述設定後，執行 `git push origin main`，您的網站就會在幾分鐘後於 `https://<您的帳號>.github.io/SportLink/` 上線！

---

## 🛠️ 開發技術
- **前端框架**: React + Vite
- **後端服務**: Firebase (Auth, Firestore)
- **樣式管理**: Tailwind CSS
- **部署工具**: GitHub Actions

*Developed by Antigravity*
