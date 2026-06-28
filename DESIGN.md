# Goth-Tech 設計系統

本文件是設計 token 與元件模式的唯一真實來源 (Single Source of Truth)。
所有 token 定義於 [src/styles/global.css](src/styles/global.css) 的 `:root` 區塊。

> **注意：** `src/styles/style.css` 是舊 Tunis 模板殘留，非現行設計系統的一部分，請勿參考或延伸。

---

## 目錄

1. [色彩 Tokens](#1-色彩-tokens)
2. [字型](#2-字型)
3. [Type Scale](#3-type-scale)
4. [間距](#4-間距)
5. [過渡動畫](#5-過渡動畫)
6. [全域元件模式](#6-全域元件模式)
7. [開發規範](#7-開發規範)

---

## 1. 色彩 Tokens

### 背景層級

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| `--bg` | `#020202` | 頁面最底層背景 |
| `--surface-1` | `#09090b` | Navbar 背景、頭像 placeholder |
| `--surface-2` | `#0a0a0c` | 卡片內層 (`.card-inner`) |
| `--surface-3` | `#111116` | 較高層的浮動元素 |

### 強調色

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| `--accent` | `#00e5ff` | 主要強調色：連結 hover、border、cursor |
| `--accent-dim` | `rgba(0, 229, 255, 0.08)` | 微光底色、hover 背景 |

### 文字色

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| `--text-primary` | `#e8e8e8` | 主要文字 |
| `--text-muted` | `#666680` | 次要文字、metadata、navbar 連結預設色 |

### 線條色

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| `--line` | `rgba(255, 255, 255, 0.05)` | 分隔線、卡片外框、navbar border |
| `--line-accent` | `rgba(0, 229, 255, 0.2)` | hover 時的強調框線 |

---

## 2. 字型

| Token | 值 | 角色 |
| :--- | :--- | :--- |
| `--font-display` | `'Syne', sans-serif` | 大標題、hero、section title |
| `--font-body` | `'Plus Jakarta Sans', sans-serif` | 正文、段落 |
| `--font-mono` | `'Space Mono', monospace` | 標籤、metadata、navbar、日期 |

字型由 Google Fonts 載入（定義於 global.css `@import`）。

---

## 3. Type Scale

Token 命名以語意角色為準，非任意尺寸編號。`fs` = font-size，`fw` = font-weight，`ls` = letter-spacing，`lh` = line-height。

### Display / Hero

| Token | 值 |
| :--- | :--- |
| `--fs-hero` | `clamp(72px, 11vw, 140px)` |
| `--fw-hero` | `800` |
| `--ls-hero` | `0.02em` |
| `--lh-hero` | `0.9` |

### Section Title（h1 級別）

| Token | 值 |
| :--- | :--- |
| `--fs-section-title` | `clamp(36px, 5vw, 64px)` |

### Heading（h2 級別）

| Token | 值 |
| :--- | :--- |
| `--fs-heading` | `clamp(28px, 3.5vw, 48px)` |
| `--fw-heading` | `700` |
| `--ls-heading` | `-0.02em` |
| `--lh-heading` | `1.1` |

### Subheading（h3、公司名稱）

| Token | 值 |
| :--- | :--- |
| `--fs-subheading` | `clamp(16px, 2vw, 20px)` |
| `--fw-subheading` | `600` |
| `--ls-subheading` | `0em` |
| `--lh-subheading` | `1.25` |

### Body

| Token | 值 |
| :--- | :--- |
| `--fs-body` | `15px` |
| `--fw-body` | `400` |
| `--ls-body` | `0.01em` |
| `--lh-body` | `1.6` |

### Body Small / Caption

| Token | 值 |
| :--- | :--- |
| `--fs-body-sm` | `13px` |
| `--lh-body-sm` | `1.5` |

### Monospace（`--font-mono` 搭配使用）

| Token | 值 | 用途 |
| :--- | :--- | :--- |
| `--fs-mono-md` | `11px` | section label (`// 01 ·`) |
| `--fs-mono-sm` | `10px` | navbar 連結 |
| `--fs-mono-xs` | `9px` | navbar status、CV 連結 |
| `--ls-mono` | `0.06em` | 一般 mono 字距 |
| `--ls-mono-wide` | `0.14em` | section label 字距 |

---

## 4. 間距

| Token | 值 | 常見用途 |
| :--- | :--- | :--- |
| `--spacing-xs` | `10px` | 細間距、icon gap |
| `--spacing-sm` | `20px` | 卡片內距、小段落間距 |
| `--spacing-md` | `32px` | 欄位間距、元件間距 |
| `--spacing-lg` | `64px` | section 內部大間距 |
| `--spacing-xl` | `96px` | section 外邊距 |

---

## 5. 過渡動畫

| Token | 值 | 適用場景 |
| :--- | :--- | :--- |
| `--t-fast` | `150ms` | hover 色彩切換 |
| `--t-normal` | `250ms` | 元件狀態過渡 |
| `--t-slow` | `700ms` | 大區塊淡入、GSAP 補間 |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | 全站彈性緩出曲線 |

GSAP ScrollTrigger 動畫的時長與緩出以上方 token 為準；不要在 JS 裡 hardcode `duration`。

---

## 6. 全域元件模式

以下元件定義於 global.css，可直接套用 className。

### Cursor

```html
<div class="cursor-dot" />
<div class="cursor-ring" />
```

- `.cursor-ring.is-hovering`：互動元素 hover 時套用（收縮）
- `.cursor-ring.is-clicking`：mousedown 時套用（放大）
- `body { cursor: none }` 已全域關閉系統游標

### 大氣 Overlay（三層，固定 `z-index: 50–52`）

```html
<div class="scanline-overlay" />
<div class="vignette-overlay" />
<canvas id="film-grain" />
```

- `prefers-reduced-motion` 下自動隱藏 `scanline-overlay` 與 `#film-grain`

### Navbar

```html
<nav class="navbar">
  <a class="navbar-logo">…</a>
  <ul class="navbar-links">…</ul>
  <div class="navbar-status">
    <span class="navbar-status-dot" />
    …
  </div>
</nav>
```

- 固定頂部，高度 52px，背景 `rgba(9,9,11,0.85)` + `backdrop-filter: blur(16px)`
- 手機版（≤767px）維持頂部，高度 auto，padding 縮減

### Double-Bezel 卡片

```html
<div class="card-outer">
  <div class="card-inner">
    <!-- 內容 -->
  </div>
</div>
```

- hover 時 `card-outer` border 變 `rgba(0,229,255,0.15)`，`card-inner` border 變 `--line-accent`

### 文字連結

```html
<a class="text-link">…</a>
```

- hover 時文字變 `--text-primary`，底線從 `width: 0` 展開至 `width: 100%`，使用 `--ease-out`

---

## 7. 開發規範

**禁止 hardcode 顏色或尺寸，一律使用 token。**

```jsx
// ❌
const Title = styled.h1`
  font-size: 140px;
  color: #00e5ff;
  font-family: 'Syne', sans-serif;
`

// ✅
const Title = styled.h1`
  font-size: var(--fs-hero);
  font-weight: var(--fw-hero);
  color: var(--accent);
  font-family: var(--font-display);
  letter-spacing: var(--ls-hero);
  line-height: var(--lh-hero);
`
```

**新增 token 的時機：** 若一個值重複出現超過兩次，就在 `:root` 裡定義 token；不要為單次使用定義 token。
