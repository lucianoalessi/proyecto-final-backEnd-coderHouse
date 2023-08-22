import  {Router}  from "express";
import ProductManager from "../ProductManager.js";
import __dirname from "../../utils.js";

const router = Router();


// Creación de una instancia de ProductManager con la ruta al archivo JSON de productos
const pmanager = new ProductManager(__dirname +'/files/products.json')


//ruta para plantilla handlebars
router.get('/', async (req,res)=>{

    const listaProductos = await pmanager.getProducts()
    res.render('home' , {listaProductos, style:'style.css'})
})


//ruta para handlebars + websockets 
router.get('/realtimeproducts' , async (req,res) => {
    const listaProductos = await pmanager.getProducts({})
    res.render('realTimeProducts', {style:'style.css'})

})

export default router;