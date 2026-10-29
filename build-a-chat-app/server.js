import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';
import { WebSocket } from 'ws';

const PORT = 3001; 

const server = http.createServer((req,res)=>{
    let DB_PATH = './public/index.html';
    let contentType =  'text/html';
    if (req.url === '/script.js'){
        DB_PATH = "./public/script.js";
        contentType = 'text/javascript'; 
    }
    fs.readFile(DB_PATH, (err, data)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end(`Something Went wrong: ${err} unable to read file`);
            return;
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    });
});


const wss = new WebSocketServer({server});

wss.on('connection', (socket, req)=>{
    const username = new URL(req.url, "http://localhost").searchParams.get(
    "username",
    );

    wss.clients.forEach((client) =>{
        if (client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify({"type": "system", "text": `${username} joined`}));
        }
    });

    socket.on('message', (jsonMessage)=>{
        const {username, text} = JSON.parse(jsonMessage);
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({type: 'chat', username, text}));
            }
        });
    });

    socket.on(('close'), () => {
        wss.clients.forEach((client)=>{
            if (client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({type: 'system', text: `${username} left`}));
            }
        });
    });
});

server.listen(PORT, () => {
  console.log(`Chat server running at http://localhost:${PORT}`);
});