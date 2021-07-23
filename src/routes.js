const fs = require('fs');
const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.setHeader("Content-Type", "text/html")
        //Beggining of templete handlers
        res.write('<html>')
        res.write('<head><title>Enter a message!</title></head>');
        res.write('<body><form action="/message" method="POST" accept-charset="utf-8" ><input type="text" name="message"></input><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parserBody = Buffer.concat(body).toString();
            //.trim gets rid of all whitespace
            const message = parserBody.split('=')[1];
            fs.writeFileSync('./messages.txt', message)
            res.write('<html>')
            res.write('<head><title>Your message</title></head>');
            res.write(`<body><h1>${message}</h1></body>`);
            res.write('</html>');
            return res.end();

        })
    }

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<html>');
    // res.write('<head><title>WEB 601 CLASS</title></head>');
    // res.write('<body><h1>WEB WITH ALI</h1></body>');
    // res.write('</html>');
    // res.end();
}

exports.handler = requestHandler;