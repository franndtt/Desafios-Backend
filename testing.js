const ProductManager = require("./productManager");

const producto = new ProductManager();

console.log(producto.addProduct("A54", "Celular Samsung", "800000", "https://samsung/a54.com", "hjms45", 6))
 console.log(producto.addProduct("A53", "Celular Samsung", "750000", "https://samsung/a53.com", "hjms48", 8))
 console.log(producto.addProduct("A14", "Celular Samsung", "400000", "https://samsung/a14.com", "hjms28", 12))

 const resultado = producto.getProducts();
 console.log({resultado});

//  console.log(producto.getProductById()); 
