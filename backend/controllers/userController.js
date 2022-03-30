const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please complete all the required fields');
    };
    const userExist = await User.findOne({email}) // en esta linea, vamos a buscar si algun documento ya contiene el correo a registrar
    if(userExist) {
        res.status(400);
        throw new Error('User already in use, please try a different one');
    };
    
    //En las lineas siguientes, se genera la encriptacion del password
    const salt = await bcrypt.genSalt(10); //
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid inputs');
    };
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        res.status(400);
        throw new Error('Wrong email or password, please try again');
    };
});

const profileUser = asyncHandler(async (req, res) => {
    const {id,name,email} = req.user;
    res.status(200).json({
        id,
        name,
        email
    });
});

//Esta funcion nos va a servir para crear un token para el usuario, permitiendo que pueda interactuar con la aplicacion y acceder a rutas protegidas  
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:'1d'})
}

module.exports = {
    registerUser,
    loginUser,
    profileUser
}

