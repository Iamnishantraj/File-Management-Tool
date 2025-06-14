//importing the required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Function to handle requests
const requestHandler = (req, res) => {
    const url = req.url;

    // Create a file
    if (url === '/create') {
        fs.writeFile(path.join(__dirname, 'example.txt'), 'Hello, World!', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error creating file');
            }
            res.writeHead(200);
            res.end('File created successfully');
        });
    }

    // Read a file
    else if (url === '/read') {
        fs.readFile(path.join(__dirname, 'example.txt'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error reading file');
            }
            res.writeHead(200);
            res.end(`File content: ${data}`);
        });
    }

    // Delete a file
    else if (url === '/delete') {
        fs.unlink(path.join(__dirname, 'example.txt'), (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error deleting file');
            }
            res.writeHead(200);
            res.end('File deleted successfully');
        });
    }

    // Handle 404
    else {
        res.writeHead(404);
        res.end('Not Found');
    }
};

// Create server
const server = http.createServer(requestHandler);

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
