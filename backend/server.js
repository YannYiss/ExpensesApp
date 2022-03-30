//Este sera nuestro entrypoint y desde aqui se solicitaran las rutas 
const express = require('express');
const {errorHandler} = require('./middlewares/errorMiddleware');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB() //En esta linea crearemos la conexion a la base de datos y se tiene que mandar llamar antes la app

const app = express();

//En el entrypoint se van a definir todos los middleware que sean necesarios, despues de declaral la app y antes del uso
app.use(cors()); //Este middleware va a ser necesario para evitar problemas con los CORS
app.use(express.json()); //este middleware se utiliza para poder leer los json
app.use(express.urlencoded({extended:false})); //este otro se utiliza para saber como interpretar los datos recibidos

app.use('/expenses', require('./routes/expenseRoutes'));
app.use('/users', require('./routes/userRoutes.js'));

app.use(errorHandler);

app.listen(port, () => console.log(`El servidor inicio en el puerto ${port}`));