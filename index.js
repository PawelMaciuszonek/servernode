const http = require('http');

const osoby = []; // tablica przechowująca imiona i nazwiska

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <form method="POST">
        <label>Podaj imię:</label>
        <input type="text" name="imie" />
        <br><br>
        <label>Podaj nazwisko:</label>
        <input type="text" name="nazwisko" />
        <br><br>
        <button type="submit">Wyślij</button>
      </form>
      <h2>Lista osób:</h2>
      <ul>
        ${osoby.map(o => `<li>${o.imie} ${o.nazwisko}</li>`).join('')}
      </ul>
    `);
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const params = new URLSearchParams(body);
      const imie = params.get('imie');
      const nazwisko = params.get('nazwisko');

      if (imie && nazwisko) {
        osoby.push({ imie, nazwisko }); // dodajemy obiekt do tablicy
      }

      // przekierowanie z powrotem na stronę główną
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});