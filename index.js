const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    // Pokazuje formularz
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <form method="POST">
        <label>Podaj imię:</label>
        <input type="text" name="imie" />
        <button type="submit">Wyślij</button>
      </form>
    `);
  } else if (req.method === 'POST') {
    // Odbiera dane z formularza
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const imie = new URLSearchParams(body).get('imie');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`Cześć, ${imie}!`);
    });
  }
});

server.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});