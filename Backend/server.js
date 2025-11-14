const http = require('http');

let items = [
  { id: 1, name: 'tahir' }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET /items
  if (req.method === 'GET' && req.url === '/items') {
    res.end(JSON.stringify(items));

  // POST /items
  } else if (req.method === 'POST' && req.url === '/items') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const item = { id: items.length + 1, name: 'khan' };
      items.push(item);
      res.end(JSON.stringify(items));
    });

  // PUT /items/:id
  } else if (req.method === 'PUT' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      const idx = items.findIndex(item => item.id === id);
      if (idx !== -1) {
        items[idx] = { id, name: 'rajesh' };
      }
      res.end(JSON.stringify(items));
    });

  // DELETE /items/:id
  } else if (req.method === 'DELETE' && req.url.startsWith('/items/')) {
    const id = parseInt(req.url.split('/')[2]);
    items = items.filter(item => item.id !== id);
    res.end(JSON.stringify(items));

  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Invalid route' }));
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
