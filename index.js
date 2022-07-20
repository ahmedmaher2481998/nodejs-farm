const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////
//          Files
/*
const data = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(data);
const textOut = `This is what we know now about Avocado: ${data}./n created on :${Date.now().toLocaleString()} `;
let res = fs.writeFileSync("./txt/output.txt", textOut);
console.log(res);
console.log("file is written");
*/
//***async way to do the same thing - non blocking
/*
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
	fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
		console.log(data2);
		fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
			console.log(data3);
			fs.writeFile(
				"./txt/finalVersion.txt",
				`${data2}\n${data3}`,
				(err) => {
					console.log("File is now Written");
				}
			);
		});
	});
});
console.log("Reading data...");
*/
////////////////////////
//         Server
const server = http.createServer((req, res) => {
	const path = req.url;
	if (path === "/" || path === "/products") {
		res.end("Hello from the Products");
	} else if (path === "/overview") {
		res.end("Hello from the over view page !!");
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
