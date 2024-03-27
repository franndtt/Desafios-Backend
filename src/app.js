import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PUERTO = 3000;

app.get(`/products`, (req, res) => {
    const { limit } = req.query
    const prod = new ProductManager();
    // const productos = prod.getProducts();
    return res.json({ productos: prod.getProducts(limit) })
})

app.get(`/products/:pid`, (req, res) => {
    const { pid } = req.params;
    const prod = new ProductManager();
    const productos = prod.getProductById(Number(pid));
    return res.json({productos})
})

app.listen(PUERTO, () => {
    console.log(`Corriendo el servidor en el puerto ${PUERTO}`);
});