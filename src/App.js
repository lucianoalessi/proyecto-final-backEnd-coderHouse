// Importando el módulo Express para crear y configurar la aplicación.
import  express  from "express";

// Importando los routers para productos y carritos desde sus respectivos archivos.
import productsRouter from './routers/products.router.js'
import cartsRouter from './routers/carts.router.js'

// Creando una instancia de la aplicación Express.
const app = express()


//configuraciones:

app.use(express.json()); // Configurando Express para parsear JSON en las solicitudes.
app.use(express.urlencoded({extended:true})); // Configurando Express para parsear datos de formularios en las solicitudes.
app.use(express.Router()); // Creando una instancia de un enrutador Express (no necesario en este caso, se podría eliminar).

//routers:

app.use('/api/products' , productsRouter); // Usando el router de productos para las rutas que comienzan con '/api/products'.
app.use('/api/carts' , cartsRouter); // Usando el router de carritos para las rutas que comienzan con '/api/carts'.


// Iniciando el servidor Express para escuchar en el puerto 8080.
const server = app.listen(8080 , () => {
    console.log('Server ON')
})