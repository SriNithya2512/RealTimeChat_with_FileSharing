// server.js (edited, robust + backward compatible)
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve static frontend from ./public
app.use(express.static('public'));

// map socket.id -> username
let users = {};

io.on('connection', (socket) => {
  console.log('socket connected:', socket.id);

  // set username for this socket
  socket.on('set username', (rawUsername) => {
    if (!rawUsername) return;
    const username = String(rawUsername).trim();
    if (!username) return;

    users[socket.id] = username;
    io.emit('update users', Object.values(users));
    console.log(`username set for ${socket.id} -> ${username}`);
  });

  // helper to normalize incoming text payloads that might be string or { message }
  function extractText(payload) {
    if (typeof payload === 'string') return payload;
    if (payload && typeof payload === 'object' && 'message' in payload) {
      return String(payload.message || '');
    }
    return '';
  }

  // public chat message (accepts string or { message })
  socket.on('chat message', (payload) => {
    const msg = extractText(payload);
    const username = users[socket.id];
    if (!username || !msg) return;

    io.emit('chat message', { from: username, message: msg });
  });

  // private message to a username
  socket.on('private message', (data) => {
    const { to, message } = data || {};
    if (!to || !message) {
      // optionally notify sender of malformed request
      socket.emit('error message', { reason: 'private message requires { to, message }' });
      return;
    }

    const recipientSocketId = Object.keys(users).find((id) => users[id] === to);
    if (recipientSocketId) {
      io.to(recipientSocketId).emit('private message', {
        from: users[socket.id] || 'Unknown',
        message,
      });
    } else {
      // notify sender that recipient not found
      socket.emit('error message', { reason: `User "${to}" not found or not connected.` });
    }
  });

  // broadcast message (accepts string or { message })
  socket.on('broadcast message', (payload) => {
    const msg = extractText(payload);
    const username = users[socket.id];
    if (!username || !msg) return;
    io.emit('broadcast message', { from: username, message: msg });
  });

  // file upload (base64 content)
  socket.on('file upload', (fileData) => {
    const { filename, fileType, content, to } = fileData || {};
    const username = users[socket.id];
    if (!username || !filename || !content) return;

    if (to) {
      // private file: send to specific user if found
      const recipientSocketId = Object.keys(users).find((id) => users[id] === to);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('file upload', {
          from: username,
          filename,
          fileType,
          content,
          isPrivate: true,
        });
      } else {
        socket.emit('error message', { reason: `User "${to}" not found for file transfer.` });
      }
    } else {
      // broadcast file to all users
      io.emit('file upload', {
        from: username,
        filename,
        fileType,
        content,
        isPrivate: false,
      });
    }
  });

  // handle disconnect
  socket.on('disconnect', () => {
    console.log('socket disconnected:', socket.id);
    delete users[socket.id];
    io.emit('update users', Object.values(users));
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
