<!-- Top banner / logo -->
<p align="center">⚙️

<h1 align="center">MultiTask — MCP Frontend</h1>

<p align="center">
  A compact, utility-first React SPA (Calculator, File Reader, Text Analyzer, Todo Manager) that communicates with an MCP-style backend.
</p>

<p align="center">
  <a href="https://multitask-mcp-server.vercel.app" target="_blank">🌐 Live Demo</a> ·
  <a href="#features">✨ Features</a> ·
  <a href="#project-structure">📂 Project Structure</a> ·
  <a href="#getting-started">⚡ Getting Started</a> ·
  <a href="#deep-analysis--security-notes">🔐 Analysis & Security</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-live-brightgreen?style=for-the-badge" alt="live" />
  <img src="https://img.shields.io/badge/frontend-react-blue?style=for-the-badge&logo=react" alt="react" />
  <img src="https://img.shields.io/badge/deployed-vercel-black?style=for-the-badge&logo=vercel" alt="vercel" />
</p>

---

## ✨ Features

- 🧮 **Calculator** — basic arithmetic via backend compute endpoint.  
- 📄 **File Reader** — request file contents from server for review (use carefully).  
- 🧾 **Text Analyzer** — analyze text file: lines, words, most common words.  
- ✅ **Todo Manager** — list/add/edit/delete tasks via backend.  
- ⚡ Fast single-page app using Create React App + Axios.

---

## 🛠 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,ai,react,nodejs,js,nextjs,expressjs" alt="tech" />
</p>

- **Frontend:** React (Create React App), React 19, Axios  
- **Styling:** Custom CSS (index.css / App.css)  
- **Build / Deploy:** CRA (`npm start`, `npm run build`), Vercel-friendly  
- **Backend (expected):** REST endpoints (see *API Endpoints* below)

---

## 📂 Project Structure

```

MultiTask/
├── public/
│   ├── index.html
│   ├── logo192.png
│   └── ...
├── src/
│   ├── components/
│   │   ├── Calculator.js
│   │   ├── FileReader.js
│   │   ├── TextAnalyzer.js
│   │   └── TodoManager.js
│   ├── api.js               # axios instance + BASE\_URL
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md

````

---

## 📡 API Endpoints (observed / expected)

> The frontend calls these endpoints on the configured `BASE_URL`:

- `GET /calculate?a=&b=&op=`  
  - Returns `{ result: number }` or `{ error: string }`.

- `GET /read_file?path=`  
  - Returns `{ content: "file contents..." }` or `{ error: string }`.
  - **Warning:** If server accepts arbitrary paths → **file disclosure risk**.

- `GET /analyze_text?path=`  
  - Returns text statistics: `{ lines, words, characters, most_common_words }`.

- `GET /todos`  
  - Plus `/todos` POST/PUT/DELETE depending on backend.

---

## ⚡ Getting Started (Developer)

> Uses Create React App. Node 16+ recommended.

```bash
# 1. Clone
git clone https://github.com/Harshsfd/Multitask-MCP-Server.git
cd your-repo

# 2. Install
npm install

# 3. Configure API base (recommended: use env)
# Option A: Quick edit (development)
# Edit src/api.js and set BASE_URL to your backend (default: https://mcp-server-qko7.onrender.com)

# Option B: Use an env variable (recommended)
# Create a .env file at project root with:
# REACT_APP_API_BASE_URL=https://your-backend.example.com
#
# Then either update src/api.js to use process.env.REACT_APP_API_BASE_URL (see snippet below)

# 4. Run locally
npm start
# Open http://localhost:3000
````

### Recommended change for `src/api.js` (use env var)

Replace the current hard-coded BASE\_URL with:

```js
// src/api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://mcp-server-qko7.onrender.com";
export const api = axios.create({ baseURL: BASE_URL });
```

Create `.env.example`:

```
# .env.example
REACT_APP_API_BASE_URL=https://your-backend.example.com
```

> **Important**: Add `.env` to `.gitignore` and never commit secrets.

---

## 🚀 Deployment

* For **Vercel**: push code to GitHub → import project into Vercel → add `REACT_APP_API_BASE_URL` in Environment Variables → Deploy.
* For general Node hosts: build with `npm run build` and serve `build/` folder.

---

## 🔍 Deep Analysis & Security Notes (ACTIONABLE)

### Summary of findings

* **Client code** is clean and readable; small utilities are implemented as separate components.
* `src/api.js` currently uses a **hard-coded backend URL** — move to env variables for flexibility and security.
* **Major risk:** `FileReader` component posts arbitrary `path` value to `GET /read_file`. If the server does not sanitize/whitelist allowed paths this can lead to:

  * Directory traversal (e.g. `../../etc/passwd`)
  * Disclosure of secrets and system files
  * Privacy breaches

### Security & hardening (PRIORITY)

1. **Never allow arbitrary filesystem reads.** Backend must enforce:

   * A **whitelist** of allowed directories or file IDs, OR
   * Map client file references to internal safe paths (do not accept raw paths).
2. **Input validation & sanitization** on all endpoints (`/read_file`, `/analyze_text`, `/calculate`, todos endpoints).
3. **Authentication & Authorization**:

   * Add auth for sensitive endpoints (reading files, editing todos if not public).
   * Rate-limit endpoints to prevent brute force and data extraction.
4. **CORS**: restrict `Access-Control-Allow-Origin` to your front-end domain in production.
5. **Logging & Monitoring**: log suspicious requests (e.g., `..` in `path`) and add alerts.
6. **Remove hard-coded backend URL** in client — use `REACT_APP_API_BASE_URL` env var as described above.
7. **HTTPS & CSP**: ensure backend certs are valid and consider CSP in `index.html`.

### Code-quality & developer improvements

* Add `.env.example`, `.gitignore` rules for env files.
* Add a small `README.dev.md` with backend contract (endpoints + expected JSON shape).
* Add GitHub Actions CI for `npm ci`, `npm run build`, basic unit tests (Jest).
* Add end-to-end smoke tests (Playwright) for critical flows.

---

## ✅ Quick mitigation patch suggestions (what to change now)

1. **Change `src/api.js` to use env var** (see snippet in *Getting Started*).
2. **Temporary UI safety note** — annotate `File Reader` with a warning and disable it in production until backend is hardened. Example UI notice in `FileReader.js`:

```jsx
// Short UI warning (add near input)
<p className="small warning">⚠️ This tool can read server files. Make sure the backend restricts allowed paths before using in production.</p>
```

3. **Backend checklist** (if you control it):

   * Implement path normalization + disallow `..` segments
   * Only allow a configured base directory: e.g., `/var/app/files` and reject any path outside it
   * Require an API key or session for the read endpoints

---

## 📌 Final notes & next steps

* This frontend is **lightweight and production-ready** once the backend is validated/secured.
* If you want, I can:

  * Generate a small patch PR (code snippets) for `src/api.js` + `.env.example` + README update.
  * Draft a secure backend handler template for `read_file` (node/express) that enforces a base directory whitelist.

---

<p align="center">Made with ❤️ by <b>Your Dev Team</b> — live demo at <a href="https://multitask-mcp-server.vercel.app">multitask-mcp-server.vercel.app</a></p>
```

---

If you want, I’ll now:

* create the **three small patch files** (1) `src/api.js` env-safe change, (2) `.env.example`, (3) updated `README.md` committed-ready — all in one reply as ready-to-commit file contents; **or**
* produce a **secure backend `read_file` example** (Express) that enforces path whitelist and returns safe errors.

Which one should I produce now? (I'll include full code — no waiting.)
