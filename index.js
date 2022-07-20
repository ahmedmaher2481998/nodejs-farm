const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////
//         Server
// templates used
const card = require(`${__dirname}/templates/Card.html`);
const overView = require(`${__dirname}/templates/overview.html`);
const product = require(`${__dirname}/templates/product.html`);
//data used
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const generateCard = (card , product)=>{ 
	let output = card.replace(/{%IMAGE%}/g,product.image)
	output = output.replace(/{%PRODUCT_NAME%}/g,product.productName)
	output = output.replace(/{%QUN%}/g,product.quantity)
	output = output.replace(/{%%}/g,product.)
	output = output.replace(/{%%}/g,product.)
	output = output.replace(/{%%}/g,product.)
	return output
};
const server = http.createServer((req, res) => {
	const path = req.url;
	//Home / overView page
	if (path === "/" || path === "/overview") {
		res.writeHead(200, {
			"Content-Type": "text/html",
		});
		const cards = data.localeCompare(product=> generateCard(card , product));
		res.end(overView);
	}
	// Product Page
	else if (path === "/products") {
		res.end("Hello from the products page !!");
	}
	// APi Route
	else if (req.url === "/api") {
		res.writeHead(200, {
			"Content-Type": "application/json",
		});
		res.end(data);
	}
	//Not Found Template
	else {
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
