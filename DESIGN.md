# 專案設計系統與設計標記 (Design Tokens) 指南

本文件旨在定義專案的 **設計標記 (Design Tokens)**，作為網站視覺樣式的唯一真實來源 (Single Source of Truth)，藉此確保團隊在後續開發新元件或頁面時，不會發生樣式偏離 (Styling Drift) 的問題。

---

## 目錄
1. [什麼是設計標記 (Design Tokens)？](#什麼是設計標記-design-tokens)
2. [設計標記定義表 (Tokens Specification)](#設計標記定義表-tokens-specification)
   - [色彩標記 (Color Tokens)](#1-色彩標記-color-tokens)
   - [字型與排版標記 (Typography Tokens)](#2-字型與排版標記-typography-tokens)
   - [間距與版面佈局標記 (Spacing Tokens)](#3-間距與版面佈局標記-spacing-tokens)
   - [圓角標記 (Border Radius Tokens)](#4-圓角標記-border-radius-tokens)
   - [動畫過渡標記 (Transition Tokens)](#5-動畫過渡標記-transition-tokens)
3. [如何在開發中應用以確保不會 Drift？](#如何在開發中應用以確保不會-drift)
   - [在 React Emotion Styled Components 中使用](#1-在-react-emotion-styled-components-中使用)
   - [在全域 CSS 中使用](#2-在全域-css-中使用)
   - [動態更換皮膚配色 (Skins 擴充)](#3-動態更換皮膚配色-skins-擴充)
4. [審查與防飄移檢驗機制 (Drift Audit)](#4-審查與防飄移檢驗機制-drift-audit)

---

## 什麼是設計標記 (Design Tokens)？

設計標記是設計系統中最小的視覺元素單位（例如顏色、字型大小、間距、圓角等），以抽象命名的變數形式存在。
本專案全面採用 **CSS Custom Properties (CSS 變數)** 來管理設計標記，這使得它們不僅能應用於原生 CSS 檔案，還能無縫嵌入到 React 的 Emotion `styled` 元件中。

---

## 設計標記定義表 (Tokens Specification)

所有全域設計標記皆集中定義於 [src/styles/global.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/global.css) 的最頂端 `:root` 區塊。

### 1. 色彩標記 (Color Tokens)

#### 品牌與主題色
| 標記名稱 | 預設值 | 使用場景與設計意圖 |
| :--- | :--- | :--- |
| `--color-accent` | `#ee6192` (洋紅) | 全站的主要強調色 (Accent)，會隨著切換 Skin CSS 檔案動態覆蓋。用於按鈕、活動狀態、高亮標題。 |

#### 系統底色與文字色
| 標記名稱 | 預設值 | 使用場景與設計意圖 |
| :--- | :--- | :--- |
| `--color-bg-dark` | `#111111` | 暗色模式的主背景色。 |
| `--color-bg-light` | `#ffffff` | 亮色模式的主背景色。 |
| `--color-text-dark-primary` | `#ffffff` | 暗色模式下的主要文字顏色。 |
| `--color-text-dark-secondary`| `#eeeeee` | 暗色模式下的次要/輔助文字顏色。 |
| `--color-text-light-primary`| `#666666` | 亮色模式下的主要文字顏色。 |
| `--color-text-light-secondary`| `#777777` | 亮色模式下的次要/輔助文字顏色。 |
| `--color-border-dark` | `#252525` | 暗色模式下的框線、區隔線。 |
| `--color-border-light` | `#dddddd` | 亮色模式下的框線、區隔線。 |
| `--color-glass-bg` | `rgba(1, 1, 1, 0.1)` | 毛玻璃容器 (Glassmorphism) 的半透明背景。 |
| `--color-overlay` | `rgba(0, 0, 0, 0.25)` | 覆蓋在 3D 背景之上的半透明遮罩。 |
| `--color-bg-3d` | `#001e0f` | Three.js 畫布的背景色與霧效 (Fog) 顏色。 |
| `--color-cursor-dot` | `rgba(255, 0, 255, 0.3)` | 自訂滑鼠游標的主色。 |

---

### 2. 字型與排版標記 (Typography Tokens)

#### 字型家族 (Font Families)
- **主要字型家族** (`--font-primary`)：`'Montserrat', sans-serif` (定義在 [global.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/global.css))
- **次要標題字型** (`--font-secondary`)：`'Noto Serif TC', 'Open Sans', 'Poppins', sans-serif` (定義在 [style.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/style.css))
- **等寬字型** (`--font-mono`)：`'monospace'` (用於 [ScrambleText.jsx](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/components/ScrambleText.jsx) 特效)

#### 字級大小 (Font Sizes)
| 標記名稱 | 像素值 | 使用場景與設計意圖 |
| :--- | :--- | :--- |
| `--font-size-xs` | `12px` | 最小輔助文字（如性能監控面版）。 |
| `--font-size-sm` | `15px` | 預設網頁正文 (Body Base)。 |
| `--font-size-md` | `20px` | 卡片標題、區段副標題。 |
| `--font-size-lg` | `26px` | 中型標題、副標題。 |
| `--font-size-xl` | `40px` | 大區段標題（如 "Projects", "Experiences"）。 |
| `--font-size-xxl` | `56px` | Tunis 樣式頁面大標題。 |
| `--font-size-hero` | `60px` | 首頁落地 Hero 區塊的 Loïc Chen 大姓名。 |
| `--font-size-watermark` | `110px` | 背景巨型浮水印裝飾字（`.title-bg`）。 |

#### 字型權重 (Font Weights)
- `--font-weight-regular`: `400`
- `--font-weight-medium`: `500`
- `--font-weight-semibold`: `600`
- `--font-weight-bold`: `700`
- `--font-weight-extrabold`: `800`
- `--font-weight-black`: `900`

---

### 3. 間距與版面佈局標記 (Spacing Tokens)
為防止邊距和內距無序發散，請一律使用間距比例標記：
| 標記名稱 | 像素值 | 使用場景範例 |
| :--- | :--- | :--- |
| `--spacing-xs` | `10px` | 側邊導覽列的間距、滑鼠 dot 補償。 |
| `--spacing-sm` | `20px` | 卡片內距、段落間距。 |
| `--spacing-md` | `30px` | 網格間距、時間軸項目下邊距。 |
| `--spacing-lg` | `40px` | 標題底邊內距。 |
| `--spacing-xl` | `60px` | 區段外距 (Section Padding)。 |
| `--spacing-xxl` | `80px` | 標題頂部大邊距。 |

---

### 4. 圓角標記 (Border Radius Tokens)
| 標記名稱 | 像素值 | 使用場景範例 |
| :--- | :--- | :--- |
| `--border-radius-sm` | `5px` | 統計盒子、微型邊框圓角。 |
| `--border-radius-md` | `15px` | 首頁背景區塊圓角。 |
| `--border-radius-lg` | `26px` | 全站按鈕藥丸形圓角 (`.btn`)。 |
| `--border-radius-xl` | `30px` | 毛玻璃經歷容器、側邊導覽選單。 |

---

### 5. 動畫過渡標記 (Transition Tokens)
| 標記名稱 | 時間值與曲線 | 使用場景範例 |
| :--- | :--- | :--- |
| `--transition-fast` | `0.2s` | 按鈕 hover 背景色過渡、游標樣式變換。 |
| `--transition-normal` | `0.3s` | 選單啟動狀態切換、透明度淡入淡出。 |
| `--transition-slow` | `0.8s` | 頁面切換、大區塊淡入淡出。 |
| `--transition-ease` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 全站互動緩和曲線。 |

---

## 如何在開發中應用以確保不會 Drift？

要防止樣式 Drift，最核心的規則是：**「絕不在程式碼中寫死 (Hardcode) 任何顏色代碼或像素數值」**。

### 1. 在 React Emotion Styled Components 中使用
當您編寫 CSS-in-JS 元件時，請直接引用 CSS 變數：

```javascript
import styled from "@emotion/styled"

// ❌ 錯誤示範 (容易造成樣式 drift)
const SectionTitle = styled.h1`
  font-size: 40px;
  padding-bottom: 30px;
  color: #ee6192;
  font-family: 'Poppins', sans-serif;
`

//  正確示範 (綁定 Design Tokens)
const SectionTitle = styled.h1`
  font-size: var(--font-size-xl);
  padding-bottom: var(--spacing-md);
  color: var(--color-accent);
  font-family: var(--font-secondary);
`
```

### 2. 在全域 CSS 中使用
在編寫普通 `.css` 檔時，同樣直接使用 `var()` 函數：

```css
/* ❌ 錯誤示範 */
.custom-card {
  background: rgba(1, 1, 1, 0.1);
  border-radius: 30px;
  padding: 20px;
}

/*  正確示範 */
.custom-card {
  background: var(--color-glass-bg);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-sm);
}
```

### 3. 動態更換皮膚配色 (Skins 屬性切換與擴充)
在導入 `data-theme` 屬性命名空間後，切換全站色調不再需要導入不同 CSS 檔案，只需直接修改 HTML 根節點的屬性：

```javascript
// 切換至皇家藍 (Blue)
document.documentElement.setAttribute('data-theme', 'blue');

// 清除屬性即可自動回復為預設洋紅色 (Magenta)
document.documentElement.removeAttribute('data-theme');
```

若要擴充新主題配色，您只需在 [global.css](file:///Users/loicchen/Desktop/code/etc/painfulexistence.github.io/src/styles/global.css) 底下追加新的屬性選取器並重設變數即可，樣式完全不需重寫：

```css
[data-theme="tiffany"] {
  --color-accent: #00b4d8; /* 擴充為 Tiffany 藍 */
}
```

---

## 4. 審查與防飄移檢驗機制 (Drift Audit)
1. **程式碼審查 (PR Review)**：在提交 Pull Request 時，任何在 CSS 或 styled components 中包含硬編碼色彩（如 `#fff`, `#ee6192`）或空間配置（如 `margin-bottom: 25px`）的程式碼應被拒絕，並要求重構為對應的設計標記變數。
2. **靜態檢查**：在未來可以加入 Stylelint 規則（例如安裝 `stylelint-declaration-strict-value` 套件），強制規定特定的視覺屬性（如 `color`, `font-size`, `margin`, `padding`）一律必須使用變數值。
