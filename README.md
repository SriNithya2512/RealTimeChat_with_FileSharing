# RealTimeChat_with_FileSharing

**Simple real-time chat app with file sharing**

A lightweight Node.js project that provides a real-time chat interface and supports sending/receiving files (images/docs). Built with plain HTML/JS on the frontend and a Node backend (Socket.IO + Express-like server). This repository contains the server, client static files, and minimal setup to run locally.

---

## Features

## Screenshots

Below are the UI previews of the Real‑time Chat with File Sharing application.

### 🖼️ Screenshot 1 – Initial Username Setup Screen

<img width="1916" height="905" alt="Screenshot 2025-11-09 175753" src="https://github.com/user-attachments/assets/b6c9572d-b788-46ee-916b-5671905550aa" />


### 🖼️ Screenshot 2 – Chat Interface with Messages & File Sharing

<img width="1892" height="901" alt="Screenshot 2025-11-09 180833" src="https://github.com/user-attachments/assets/9e8618c6-c19f-40b9-b3c6-7995746214c1" />


### 🖼️ Screenshot 3 – Chat Interface (Broadcast & Private Message Options)

<img width="1893" height="892" alt="Screenshot 2025-11-09 181252" src="https://github.com/user-attachments/assets/1481df24-b47c-461b-93cb-d8fbc32ded23" />


You can replace these image filenames with your actual uploaded screenshot names.

---

## Features

* Real-time text chat between connected users.
* File upload / file-sharing support (images, docs, etc.).
* Simple single-file server (`server.js`) and static frontend files.
* Minimal dependencies for quick testing and learning.

---

## Technologies

* Node.js
* socket.io (real-time websocket communication)
* Plain HTML / JavaScript for frontend

---

## Prerequisites

* Node.js (v14+) and npm installed.
* A terminal / command prompt.

---

## Quick start (run locally)

1. Clone the repo:

```bash
git clone https://github.com/SriNithya2512/RealTimeChat_with_FileSharing.git
cd RealTimeChat_with_FileSharing
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
# If package.json defines a start script
npm start
# Or directly
node server.js
```

4. Open your browser and go to:

```
http://localhost:3000
```

(If your server uses a different port, replace `3000` with that port.)

---

## Project structure (example)

```
RealTimeChat_with_FileSharing/
├─ package.json
├─ package-lock.json
├─ server.js
├─ public/ (or client files like index.html, script.js)
└─ .gitignore
```

> Note: This repository currently serves static HTML/JS files from the root — check `server.js` for exact paths.

---

## Usage

* Open multiple browser windows or share the server URL on your local network to test real-time chat and file transfer functionality.
* Uploaded files are stored (or proxied) according to the server implementation; inspect `server.js` to find the upload path and tweak as required.

---

## Common tasks & tips

* **Add `node_modules/` to .gitignore**: If not already present, add `node_modules/` to `.gitignore` to avoid committing dependencies.

* **Switching to `main` branch**: If `git push` fails with `src refspec main does not match any`, it usually means you haven't committed to that branch locally yet. Example fix:

```bash
# ensure you're on branch main (or create it)
git branch -M main
git add .
git commit -m "Initial commit"
git push -u origin main
```

* **Change server port**: Modify `server.js` to change the listening port or set an environment variable like `PORT`.

---


## Contributing

Contributions and improvements are welcome. A good first step:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes and commit with clear messages
4. Push and open a Pull Request

Please keep changes small and focused.

---

