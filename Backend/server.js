require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');
const app = express();

const corsOptions = {
    origin: ['http://localhost:4200', 'http://localhost:4300'], 
    optionsSuccessStatus: 200,
    methods: "GET, POST, PUT, DELETE, PATCH",
    allowedHeaders: "Content-Type, Authorization" 
};

// Middlewares
app.use(cors(corsOptions)); 
app.use(express.json()); 

// Connexion à la base de données
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB avec succès !'))
    .catch(err => console.log('Échec de connexion MongoDB :', err));

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
app.use('/api/categoryproduct',categoryproduct);

//crud product
const product =require('./routes/product');
app.use('/api/product',product);

//crud stock
const stock =require('./routes/stock');
app.use('/api/stock',stock);



// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});