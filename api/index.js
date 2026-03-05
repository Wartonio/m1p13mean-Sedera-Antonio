require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const app = express();

const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization" 
};

// Middlewares
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Connexion à la base de données
console.log("Mongo is", process.env);
console.log(process.env);

// login & signin
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// crud user 
const userRoutes = require('./routes/user');
app.use('/api/user',auth,userRoutes);

// crud role
const roleRoutes = require('./routes/role');
app.use('/api/role',auth,roleRoutes);

// crud category
const categoryRoutes = require('./routes/category');
app.use('/api/category',auth,categoryRoutes);

// crud shop
const categoryShops = require('./routes/shop');
app.use('/api/shop',auth,categoryShops);

// crud category produit
const categoryproduct = require('./routes/categoryproduct');
app.use('/api/categoryproduct',auth,categoryproduct);

//crud product
const product =require('./routes/product');
app.use('/api/product',auth,product);

//crud stock
const stock =require('./routes/stock');
app.use('/api/stock',auth,stock);

// //crud stock
// const commande =require('./routes/commande');
// app.use('/api/commande',commande);

const commande = require('./routes/commande');
app.use('/api/commande',auth,commande)


app.use('/upload', express.static('upload'));


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connecté à MongoDB avec succès !')
        // Lancement du serveur
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('Échec de connexion MongoDB :', err));
