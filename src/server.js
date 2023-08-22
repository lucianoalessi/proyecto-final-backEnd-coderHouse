import express from "express"; // Importando el módulo Express para crear y configurar la aplicación.
import __dirname from "../utils.js"; //importando rutas absolutas para evitar asuntos de ruteo relativo.
import handlebars from 'express-handlebars'; //importando plantillas con handlebars
import { Server } from "socket.io"; //importamos socket io (websockets)
import productsRouter from './routers/products.router.js'; // Importamos las rutas 
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import ProductManager from "./ProductManager.js"; //importamos el product manager



// Creando una instancia de la aplicación Express.
const app = express()

// Iniciando el servidor Express para escuchar en el puerto 8080.
const httpServer = app.listen(8080 , () => {console.log('Server ON')})

//creamos un servidor Socket viviendo dentro de nuestro servidor principal
const socketServer = new Server(httpServer);

//configuraciones o Middlewares:

app.use(express.json()); // Configurando Express para parsear JSON en las solicitudes.
app.use(express.urlencoded({extended:true})); // Configurando Express para parsear datos de formularios en las solicitudes.
app.use(express.Router()); // Creando una instancia de un enrutador Express (no necesario en este caso, se podría eliminar).


//Configuraciones para plantillas handlebars:

app.engine('handlebars' , handlebars.engine());
app.set('views', __dirname + '/src/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname +'/src/public'));

//rutas:

app.use('/api/products' , productsRouter); // Usando el router de productos para las rutas que comienzan con '/api/products'.
app.use('/api/carts' , cartsRouter); // Usando el router de carritos para las rutas que comienzan con '/api/carts'.
app.use('/', viewsRouter); //router handlebars para io con '/'.

//creamos una instancia de ProductManager
const pmanager = new ProductManager(__dirname +'/files/products.json')


// Configurar el evento de conexión de Socket.IO

socketServer.on('connection', async (socket) => {

    console.log("nuevo cliente conectado")

    const products = await pmanager.getProducts()
    socket.emit('productos', products); //enviamos al cliente un array con todos los productos.

    //recibimos informacion del cliente, en este caso un nuevo producto y lo agregamos a nuestra base de datos. 
    socket.on('addProduct', async data => {

        await pmanager.addProduct(data)
        const updateProducts = await pmanager.getProducts();
        socket.emit('updatedProducts', updateProducts ); //le enviamos al cliente la lista de productos actualizada con el producto que anteriormente agrego. 

    } )
    
    //recibimos del cliente el id del producto a eliminar
    socket.on('deleteProduct', async data => {
    
        await pmanager.deleteProduct(data); //eliminamos el producto
        const updateProducts = await pmanager.getProducts(); //obtenemos la lista actualizada con el producto eliminado
        socket.emit('updatedProducts', updateProducts ); //le enviamos al cliente la lista actualizada

    })
})






