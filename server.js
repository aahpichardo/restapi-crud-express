const express = require("express");
const morgan = require("morgan");

const app = express();
let products = [
    {
        id:1,
        name: "laptop",
        price: 3000
    }
];

app.use(morgan("dev"));
app.use(express.json());

app.get("/products", (req,res) => {
    res.json(products);
})


app.post("/products", (req,res) => {
    const newProduct = {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

app.put("/products/:id", (req,res) => {
    const newData = req.body;
    const productFound = products.find( 
        (product) =>  product.id === parseInt(req.params.id)
    );
    
    if(!productFound) return res.status(404).json({
        message: "Producto no encontrado"
    });

   products = products.map(product => product.id === parseInt(req.params.id) ? {...product, ...newData} : product)
    res.json({
        message: "Producto actualizado exitosamente"
    })
})

app.delete("/products/:id", (req,res) => {
    const productFound = products.find( 
        (product) =>  product.id === parseInt(req.params.id)
    );
    
    if(!productFound) return res.status(404).json({
        message: "Producto no encontrado"
    });

    products = products.filter(p => p.id !== parseInt(req.params.id))

    res.sendStatus(204);
})

app.get("/products/:id", (req,res) => {
    //console.log(req.params.id);
    const productFound = products.find( 
        (product) =>  product.id === parseInt(req.params.id)
    );
    if(!productFound) return res.status(404).json({
        message: "Producto no encontrado"
    });
    //console.log(productFound)
    res.json(productFound)
})

app.listen(3000);
console.log(`server on port ${3000}`);

