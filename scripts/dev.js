const { spawn } = require('child_process');
const net = require('net');

function run(cmd, args, opts = {}) {
  const child = spawn(cmd, args, { stdio: 'inherit', shell: true, ...opts });
  child.on('exit', (code) => {
    if (code !== 0) process.exit(code);
  });
  return child;
}

let watcher = null;
let next = null;

async function findOpenPort(startPort) {
  let port = Number(startPort) || 3000;
  for (let i = 0; i < 50; i++) {
    // eslint-disable-next-line no-await-in-loop
    const free = await new Promise((resolve) => {
      const server = net.createServer();
      server.once('error', () => {
        resolve(false);
      });
      server.once('listening', () => {
        server.close(() => resolve(true));
      });
      server.listen(port, '0.0.0.0');
    });
    if (free) return port;
    port += 1;
  }
  return port;
}

async function start() {
  watcher = run('node', ['scripts/watch-content.js']);
  const desired = process.env.PORT || '3000';
  const openPort = await findOpenPort(desired);
  if (String(openPort) !== String(desired)) {
    console.warn(`Port ${desired} in use, using ${openPort} instead.`);
  }
  next = run('next', ['dev', '-p', String(openPort)]);
}

start();

function shutdown() {
  try { watcher && watcher.kill('SIGINT'); } catch {}
  try { next && next.kill('SIGINT'); } catch {}
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);
process.on('exit', shutdown);
process.on('beforeExit', shutdown);
