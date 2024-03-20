const fs = require("fs");

class ProductManager {
    #path;
    #products;
    static idProducto = 0;

    constructor() {
        this.#path = "./data/productos.json";
        this.#products = this.#leerProductosExistentes();
    }

    #leerProductosExistentes() {
        try {
            if (fs.existsSync(this.#path)) {
                const lecturaDeProducto = JSON.parse(fs.readFileSync(this.#path, { encoding: "utf-8" }));
                console.log(lecturaDeProducto);
                return lecturaDeProducto; // Devolver los productos leídos del archivo JSON
            } else {
                return []; // Devolver un array vacío si el archivo no existe
            }
        } catch (error) {
            console.log(`Ha ocurrido un error con la lectura de archivos`, error);
            return [];
        }
    }

    #asignarIdProducto() {
        let id = 1;
        if (this.#products.length != 0) { 
            id = this.#products[this.#products.length - 1].id + 1; 
        }
        return id; 
    }

    #guardarArchivos() {
        try {
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        } catch (error) {
            console.log(`Ha ocurrido un error al momento de guardar`, error);
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return "Todos los parametros son requeridos {title, description, price, thumbnail, code, stock}";
        }

        const coderepetido = this.#products.some(p => p.code === code);
        if (coderepetido) {
            return `El código ${code} ya se encuentra registrado en otro producto`;
        }

        ProductManager.idProducto = ProductManager.idProducto + 1;
        const id = this.#asignarIdProducto();
        const nuevoProducto = {
            id: id,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.#products.push(nuevoProducto);
        this.#guardarArchivos();

        return "¡Producto agregado con exito!";
    }

    getProducts() {
        return this.#products;
    }

    getProductById(id) {
        const producto = this.#products.find(p => p.id == id);
        if (producto) {
            return producto;
        } else {
            return console.log("Not found");
        }
    }

    updateProducts(id, objetoUpdate) {
        let mensaje = `El producto con el id ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);

        if (index !== -1) {
            const { id, ...rest } = objetoUpdate;
            this.#products[index] = { ...this.#products[index], ...rest };
            this.#guardarArchivos();
            mensaje = "Producto actualizado!";
        }

        return mensaje;
    }

    deleteProducts(id) {
        const index = this.#products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.#products = this.#products.filter(p => p.id !== id);
            this.#guardarArchivos(); 
            console.log("El producto se ha eliminado correctamente!");
        } else {
            return `El producto con el id: ${id} no existe`;
        }
    }
}

module.exports = ProductManager;