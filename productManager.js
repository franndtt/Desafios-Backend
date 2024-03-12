class ProductManager{
    #products;
    static idProducto = 0;

    constructor(){
        this.#products = [];

    }

        addProduct (title, description, price, thumbnail, code, stock) {
            if(!title || !description || !price || !thumbnail || !code || !stock) {
                 return "Todos los parametros son requeridos {title, description, price, thumbnail, code, stock}"
            };

            const coderepetido = this.#products.some(p => p.code === code);
            if (coderepetido) {
                return `El código ${code} ya se encuentra registrado en otro producto`;
            }
            ProductManager.idProducto = ProductManager.idProducto + 1 //Le sumo uno
            const id = ProductManager.idProducto;
            const nuevoProducto = {
                id:id,
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock:stock

            }
            this.#products.push(nuevoProducto);

            return (
                "¡Producto agregado con exito!"
            )
        }
             
        
            
        getProducts (){
            return this.#products;
        }

        getProductById (id){

            const producto = this.#products.find(p => p.id == id);
           if(producto) {
            return producto;
           }
           else {
            return console.log("Not found")
           }
        }
           
    
}

module.exports = ProductManager;