module.exports = (temp, product) => {
    let output = temp.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);

    output = output.replace(/{%QUN%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRICE%}/g, product.price);
    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
    output = output.replace(/{%NEUTRINOS%}/g, product.nutrients);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    return output;
};
