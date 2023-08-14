// Importando los módulos y clases necesarios.
import { Router } from "express"; // Importando la clase Router del módulo "express".
import CartManager from "../CartManager.js"; // Importando la clase CartManager 
import {__dirname} from '../../utils.js' // Importando la constante __dirname

// Creando una nueva instancia de Router.
const router = Router();

// Creando una nueva instancia de CartManager con la ruta del archivo.
const manager = new CartManager(__dirname +'/files/cart.json');


// Ruta para manejar las solicitudes GET para obtener todos los carritos.
router.get('/' , async (req, res) => {
    
    const carts = await manager.getCarts(); // Llamamos al método getCarts de la instancia de CartManager para obtener los carritos y los guardamos en la variable carts
    res.send({status:'sucess' , carts });  //// Enviando una respuesta con los carritos obtenidos.

})

// Ruta para manejar las solicitudes POST para agregar un nuevo carrito.
router.post('/', async (req, res) => {

    const newCart = req.body; // Obteniendo los datos del carrito desde el cuerpo de la solicitud y los guardamos en la variable newCart. 
    const addcart = await manager.addCart(newCart); // Llamando al método addCart de la instancia de CartManager para agregar un carrito y lo guaramos en una variable.
    res.send({status:'Add cart sucess'}); // Enviando una respuesta indicando el éxito al agregar el carrito.
})

// Ruta para manejar las solicitudes GET para recuperar un carrito específico por su ID.
router.get('/:cid' , async (req, res) => {

    const cart = req.params.cid; // Obteniendo el ID del carrito desde el parámetro (params) de la URL.
    const getCart = await manager.getCartById(+cart); // Llamando al método getCartById de la instancia de CartManager. Agregamos un + en (+cart) para convertirlo en entero y que no se pase un string como parametro. 
    const getProductsCart = getCart.products; // Obteniendo los productos del carrito recuperado.
    res.send({status:'get products susess' , getProductsCart }); // Enviando una respuesta con los productos recuperados.

})

// Ruta para manejar las solicitudes POST para agregar un producto a un carrito específico.
router.post('/:cid/product/:pid' , async (req, res) => {

    const cart = req.params.cid; // Obteniendo el ID del carrito desde el parámetro de la URL.
    const product = req.params.pid; // Obteniendo el ID del producto desde el parámetro de la URL.

    const addProductToCart = await manager.addProductToCart(cart, product); // Llamando al método addProductToCart de la instancia de CartManager.

    res.send({status:'susess: producto agregado al carrito correctamente'}); // Enviando una respuesta indicando el éxito al agregar el producto al carrito.

})

export default router;