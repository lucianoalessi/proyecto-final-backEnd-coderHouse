# Proyecto-final-backEnd-coderHouse - Pre entrega 1

Backend de un sistema de comercio electrónico diseñado para gestionar el Stock de productos y carros de compra en un negocio en línea. Por ahora Proporciona API endpoints para gestionar productos y carritos de compras.

### Instalación
1. Clonar repositorio: git clone `https://github.com/lucianoalessi/proyecto-final-backEnd-coderHouse.git`
2. Navega a la carpeta del proyecto: `cd proyecto-final-backEnd-coderHouse`
3. Instalar dependencias: `npm install`
   
### Uso
1. Inicia el servidor: `npm start`
2. Accede a la API en: `http://localhost:8080`

### Endpoints
A continuación se presentan algunos ejemplos de los endpoints disponibles en la API:

Products:
- GET / : Muestra el estado del servidor Express.
- GET /api/products: Obtiene la lista de productos disponibles.
- GET /api/products?limit: Obtiene la lista con n cantidad de productos.
- GET /api/products/:pid : Obtiene el producto con el id proporcionado
- POST /api/products: Agrega un nuevo producto con los campos con el siguiente formato:

-- title:String

-- description:String

-- code:String

-- price:Number

-- status:Boolean

-- stock:Number

-- category:String

-- thumbnails:Array de Strings

- PUT /api/products/:pid : Deberá tomar un producto y actualizarlo por los campos enviados desde body siguiendo el mismo formato que antes.
- DELETE /api/products/:pid : Deberá eliminar el producto con el pid indicado.

Carts

- POST /api/carts/: Deberá crear un nuevo carrito ( Id:Number autogenerado, products:[]).
- GET /api/carts/:cid: Deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
- POST /api/carts/:cid/product/:pid: Agrega un producto con el id(:pid) indicado en el carro con id indicado(:cid).

### Tecnologías Utilizadas
- Node.js
- Express.js
