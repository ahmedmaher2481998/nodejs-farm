const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////
//         Server
const data = require("./dev-data/data.json");
const server = http.createServer((req, res) => {
	const path = req.url;
	if (path === "/" || path === "/overview") {
		res.end("Hello from the overview");
	} else if (path === "/products") {
		res.end("Hello from the products page !!");
	} else if (req.url === "/api") {
		const data = fs.readFile(
			`${__dirname}/dev-data/data.json`,
			(err, data) => {
				res.writeHead(200, {
					"Content-Type": "application/json",
				});
				res.end(data);
			}
		);
	} else {
		res.writeHead(404, {
			"Content-Type": "text/html",
		});
		res.end(
			`<h1> 404 NotFound , we don't know where ${path.slice(1)} is? </h1>`
		);
	}
});
server.listen(8000, "127.0.0.1", () => {
	console.log("Running on http://localhost:8000/");
});
