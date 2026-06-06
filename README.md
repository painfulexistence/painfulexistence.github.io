# painfulexistence.github.io

這是一個高互動性、結合 WebGL (React Three Fiber) 與流暢動畫 (GSAP / Motion) 的個人工程師履歷網站。

---

## 🚀 快速開始

### 開發指令
專案基於 **Bun** 與 **Vite** 進行開發：

```bash
# 安裝依賴項目
bun install

# 啟動開發伺服器
bun run dev

# 專案編譯打包 (打包成果位於 /dist)
bun run build
```

---

## 🎨 主題與外觀指南 (Theming Guide)

專案全面採用 **CSS Custom Properties (CSS 變數)** 來管理全站的視覺配色。這意味著您不再需要多個重複選擇器的 Skin CSS 檔案，而是可以透過動態屬性在客戶端秒速切換配色。

### 1. 動態切換全站配色 (Dynamic Theme Switching)
全站的主要強調色 (Accent Color) 綁定在 `--color-accent` 變數上。您可以透過修改 HTML 的 `data-theme` 屬性來即時變更全站配色：

```javascript
// 切換至皇家藍 (Blue)
document.documentElement.setAttribute('data-theme', 'blue');

// 切換至金黃色 (Yellow)
document.documentElement.setAttribute('data-theme', 'yellow');

// 還原至預設配色 (洋紅 Magenta)
document.documentElement.removeAttribute('data-theme');
```

這項操作不需要重新載入頁面，全站所有引用了該設計標記的 React 元件與 CSS 樣式均會自動流暢地更新。

### 2. 內建主題配色一覽 (Available Themes)
在 [src/styles/global.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/global.css) 中定義了以下內建主題屬性值：
* 🟥 `red` (鮮紅): `#ff1e38`
* 🟦 `blue` (皇家藍): `#4169e1`
* 🟪 `blueviolet` (藍紫): `#8a2be2`
* 🟨 `goldenrod` (秋金): `#daa520`
* 🟩 `green` (清新綠): `#2ecc71`
* 🟧 `orange` (活力橘): `#fa5b0f`
* 🟪 `purple` (深紫): `#9b59b6`
* 🟨 `yellow` (金黃): `#f1c40f`
* 🟩 `yellowgreen` (黃綠): `#9acd32`
* 🌸 *(預設)* `magenta` (洋紅): `#ee6192` （當沒有 `data-theme` 屬性時自動套用）

### 3. 如何新增主題 (Add a New Theme)
若想新增自訂的主題配色（例如 Tiffany 藍 `#00b4d8`），只需至 [src/styles/global.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/global.css) 的主題區塊追加一行 CSS 變數定義：

```css
/* src/styles/global.css */
[data-theme="tiffany"] { --color-accent: #00b4d8; }
```
隨後在 JavaScript 中執行 `setAttribute('data-theme', 'tiffany')` 即可立刻看見效果。

---

## 📐 設計系統與標記規格 (Design System Spec)
關於顏色、字型大小、字重比例、全域間距與邊界比例等詳細設計規格，請參考專案中的 **[DESIGN.md (設計標記指南)](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/DESIGN.md)**。
此文件是專案的「唯一真實來源」(Source of Truth)，開發新元件時請務必遵循其防飄移 (Anti-Drift) 設計規範。
