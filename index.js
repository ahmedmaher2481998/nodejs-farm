const fs = require("fs");
const http = require("http");
const url = require("url");
const generateTemplate = require("./modules/generateTemplate");
////////////////////////
//         Server
// templates used
const cardTemp = fs.readFileSync(`${__dirname}/templates/Card.html`, "utf-8");
const overViewTemp = fs.readFileSync(
	`${__dirname}/templates/overview.html`,
	"utf-8"
);
const productTemp = fs.readFileSync(
	`${__dirname}/templates/product.html`,
	"utf-8"
);
//data used
const data = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);
//generating template from html and product

const server = http.createServer((req, res) => {
	const path = req.url;
	const parsedUrl = url.parse(req.url, true);
	console.log(parsedUrl);
	//product by id
	if (parsedUrl.query.id && parsedUrl.pathname === "/product") {
		const id = +parsedUrl.query.id;
		const product = data.filter((el) => el.id === id)[0];

		res.end(generateTemplate(productTemp, product));
	}
	//Home / overView page
	else if (path === "/" || path === "/overview") {
		console.log("generating data...");

		res.writeHead(200, {
			"Content-Type": "text/html",
		});

		const cards = data.map((product) =>
			generateTemplate(cardTemp, product)
		);
		const newOverview = overViewTemp.replace(/{%CARDS%}/g, cards.join());
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
		let p404 = fs.readFileSync(__dirname + "/templates/404.html", "utf-8");
		p404 = p404.replace(/{%R%}/, path.slice(1));

		res.end(p404);
	}
});
server.listen(8000, "127.0.0.1", () => {
	console.log("Running on http://localhost:8000/");
});
