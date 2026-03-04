const http = require('http');

const data = JSON.stringify({
  BookId: 'b1',
  BookName: 'Máy học cơ bản modified',
  Price: 200,
  Image: 'p3.png'
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/books',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('Response:', body));
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
