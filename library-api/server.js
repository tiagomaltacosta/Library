const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
//Acima faz a conexão com os metodos de usuário e livro
dotenv.config();
const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Rotas
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


