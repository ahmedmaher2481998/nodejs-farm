const fs = require("fs");
const http = require("http");
const url = require("url");
////////////////////////
//         Server
// templates used

const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
//data used
//generating template from html and product
const generateTemplate = (card, product) => {
	console.log(card);
	let output = card.replace(/{%IMAGE%}/g, product.image);
	output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);

	output = output.replace(/{%QUN%}/g, product.quantity);
	output = output.replace(/{%FROM%}/g, product.from);
	output = output.replace(/{%PRICE%}/g, product.price);
	if (!product.organic)
		output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
	output = output.replace(/{%NEUTRINOS%}/g, product.nutrients);
	output = output.replace(/{%DESCRIPTION%}/g, product.description);
	output = output.replace(/{%ID%}/g, product.id);
	return output;
};
const server = http.createServer((req, res) => {
	const path = req.url;
	//Home / overView page
	if (path === "/" || path === "/overview") {
		console.log("generating data...");
		const card = fs.readFileSync(
			`${__dirname}/templates/Card.html`,
			"utf-8"
		);
		const overView = fs.readFileSync(
			`${__dirname}/templates/overview.html`,
			"utf-8"
		);
		const data = JSON.parse(
			fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
		);

		res.writeHead(200, {
			"Content-Type": "text/html",
		});

		const cards = data.map((product) => generateTemplate(card, product));
		const newOverview = overView.replace(/{%CARDS%}/g, cards.join());
		res.end(newOverview);
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
			`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Not Found!</title>
					<style> 
					body:{padding:5px  ;background-color:green; display:flex; align-items:center;justify-content:center;}
					h1:{ 
						color:pink;

					}

					</style>
				</head>
				<body>
					<h1> 404 NotFound , we don't know where ${path.slice(1)} is? </h1>
				</body>
			</html>
			
			`
		);
	}
});
server.listen(8000, "127.0.0.1", () => {
	console.log("Running on http://localhost:8000/");
});
