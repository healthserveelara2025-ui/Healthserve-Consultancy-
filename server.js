const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  // Lead capture endpoint (Failsafe local logging)
  if (reqPath === '/api/leads') {
    const leadsFile = path.join(__dirname, 'leads.json');
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const lead = JSON.parse(body || '{}');
          let leads = [];
          if (fs.existsSync(leadsFile)) {
            try { leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8')); } catch (e) {}
          }
          leads.unshift(lead);
          fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2));
          console.log(`[Lead Recorded] Total leads: ${leads.length} | Name: ${lead.name || 'Anonymous'} | Phone: ${lead.whatsapp || 'N/A'}`);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ status: 'success', recorded: true, count: leads.length }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: err.message }));
        }
      });
      return;
    } else if (req.method === 'GET') {
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try { leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8')); } catch (e) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ count: leads.length, leads }));
      return;
    }
  }

  // Live reviews endpoint (Live platform reviews persistence)
  if (reqPath === '/api/reviews') {
    const reviewsFile = path.join(__dirname, 'user-reviews.json');
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const review = JSON.parse(body || '{}');
          if (!review.name || !review.review) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: 'Name and review text are required' }));
            return;
          }
          if (!review.id) review.id = 'user_' + Date.now();
          if (!review.timestamp) review.timestamp = new Date().toISOString();
          let reviews = [];
          if (fs.existsSync(reviewsFile)) {
            try { reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf8')); } catch (e) {}
          }
          reviews.unshift(review);
          fs.writeFileSync(reviewsFile, JSON.stringify(reviews, null, 2));
          console.log(`[Review Recorded] Total user reviews: ${reviews.length} | Name: ${review.name} | Rating: ${review.rating}★ | Category: ${review.category}`);
          res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
          res.end(JSON.stringify({ status: 'success', recorded: true, count: reviews.length, review }));
        } catch (err) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'error', message: err.message }));
        }
      });
      return;
    } else if (req.method === 'GET') {
      let reviews = [];
      if (fs.existsSync(reviewsFile)) {
        try { reviews = JSON.parse(fs.readFileSync(reviewsFile, 'utf8')); } catch (e) {}
      }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(JSON.stringify({ count: reviews.length, reviews }));
      return;
    }
  }

  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(__dirname, reqPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    if (stats.isDirectory()) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('403 Forbidden');
      return;
    }

    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const stream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server started successfully on http://localhost:${PORT}`);
});
