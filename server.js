const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { exec } = require('child_process');

let PORT = parseInt(process.env.PORT || '3300', 10);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.webm': 'audio/webm',
  '.webmanifest': 'application/manifest+json'
};

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const activePeers = new Map();

setInterval(() => {
  const cutoff = Date.now() - 35000;
  for (const [id, data] of activePeers.entries()) {
    if (data.lastSeen < cutoff) {
      activePeers.delete(id);
    }
  }
}, 10000);

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].split('#')[0];
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Permite endpoint /api/network-ip para o frontend saber o IP de rede
  if (reqPath === '/api/network-ip') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(JSON.stringify({ ip: getLocalIp(), port: PORT }));
    return;
  }

  // Permite endpoint /api/presence para deteção automática de amigos online
  if (reqPath === '/api/presence') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const id = parsedUrl.searchParams.get('id');
      const name = parsedUrl.searchParams.get('name') || '';
      const avatar = parsedUrl.searchParams.get('avatar') || '';
      const status = parsedUrl.searchParams.get('status') || 'online';

      if (id) {
        if (status === 'offline') {
          activePeers.delete(id);
        } else {
          activePeers.set(id, {
            id,
            name: name.slice(0, 50),
            avatar: avatar.length < 500 ? avatar : null,
            lastSeen: Date.now()
          });
        }
      }

      const cutoff = Date.now() - 35000;
      for (const [peerId, data] of activePeers.entries()) {
        if (data.lastSeen < cutoff) activePeers.delete(peerId);
      }

      const list = Array.from(activePeers.values()).map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar
      }));

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        onlineIds: list.map(p => p.id),
        onlinePeers: list
      }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // Permite endpoint /api/backup para guardar e carregar backup em formato JSON automaticamente
  if (reqPath === '/api/backup') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    const backupsDir = path.join(__dirname, 'backups');
    const defaultBackupFile = path.join(backupsDir, 'nexus-amigos-backup.json');

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 10 * 1024 * 1024) req.destroy();
      });
      req.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (!fs.existsSync(backupsDir)) {
            fs.mkdirSync(backupsDir, { recursive: true });
          }
          fs.writeFileSync(defaultBackupFile, JSON.stringify(parsed, null, 2), 'utf8');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            success: true,
            file: 'nexus-amigos-backup.json',
            savedAt: new Date().toISOString()
          }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
        }
      });
      return;
    }

    if (req.method === 'GET') {
      if (fs.existsSync(defaultBackupFile)) {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Disposition': 'attachment; filename="nexus-amigos-backup.json"'
        });
        fs.createReadStream(defaultBackupFile).pipe(res);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ empty: true, contacts: [], message: 'Nenhum ficheiro de backup guardado no servidor ainda.' }));
      }
      return;
    }
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Ficheiro não encontrado');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  PORT = port;
  server.listen(port, '0.0.0.0', () => {
    const localIp = getLocalIp();
    const desktopUrl = `http://localhost:${port}`;
    const mobileNetworkUrl = `http://${localIp}:${port}/mobile.html`;

    console.log(`\n==================================================================`);
    console.log(`  🚀 NEXUS P2P CHAT PRONTO A USAR!`);
    console.log(`==================================================================`);
    console.log(`  🖥️  NO COMPUTADOR:`);
    console.log(`      Aceda a: ${desktopUrl}`);
    console.log(``);
    console.log(`  📱 NO SEU TELEMÓVEL (Conectado ao mesmo Wi-Fi):`);
    console.log(`      Abra no navegador do telemóvel:`);
    console.log(`      👉 ${mobileNetworkUrl}`);
    console.log(`==================================================================\n`);

    if (process.argv.includes('--open')) {
      const startCmd = process.platform === 'win32' ? `start ${desktopUrl}` : `open ${desktopUrl}`;
      exec(startCmd);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Porta ${port} ocupada, tentando ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Erro no servidor:', err);
    }
  });
}

startServer(PORT);
