import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import env from '../../env';
import nodemailer from 'nodemailer'
import {encryptPassword, comparePassword} from '../../libs/utils';
import SendmailTransport from 'nodemailer/lib/sendmail-transport';

export const login = async(req, res) => {
    try {
        const{ email, password } = req.body

        if (!email || !password) {
            res.status(400).json({message: 'Faltan campos obligatorios', data: ''})
        }

        // const 

        // res.status(400).json({message: 'Faltan campos obligatorios', data: ''})


    } catch (error) {
        
    }
}

export const register = async(req, res) => {
    try {
        const{ imagen, nombre, email, password } = req.body;

        // verificar que todos los campos tengan valor

        if (!imagen || !nombre || !email || !password) {
            return res.status(400).json({message: 'Faltan campos obligatorios', data: ''});
        }

        const isEmail = await User.findOne( {where: {email: email}} );

        // regex para comparar con la contrasenna enviada
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

        // Verificar que no este en uso el email
        
        if (isEmail) {
            return res.status(400).json({message: 'El email ya esta en uso,', data: ''});
        }
        // verificar que la contrasena sea lo suficientemente fuerte
        if (!password.match(regex)) {
            return res.status(400).json({message: 'La contrasena debe contener, por lo menos: 8 caracteres 1 numero, 1 letra mayuscula, 1 minuscula, un simbolo especial', data: ''});
        }
        // encriptando la contrasena
        const encriptedPass = await encryptPassword(password);

        //  Crea y guarda el usuario en la base de datos
        const newUser = User.build({
            imagen: imagen,
            nombre: nombre,
            email: email,
            password: encriptedPass
        });

        const savedUser = await newUser.save()

        if (newUser) {
                // Servicio de envio de Gmail
                  const transporter = nodemailer.createTransport({
                  host: env.SMTP,
                  port: 587,
                  secure: false, // true for 465, false for other ports
                  auth: {
                    user: env.GMAIL, // generated ethereal user
                    pass: env.GOOGLETOKEN, // generated ethereal password
                  },
                });

                await transporter.sendMail({
                from: 'jehanzao@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Bienvenido a Disney", // Subject line
                text: "Beinvenido al magico mundo de disney, disfruta de todos nuestro personajes y peliculas", // plain text body
                html: "<b>Hello world?</b>", // html body
              });
        }

        // const savedUser = await newUser.save();

        const token = jwt.sign({
            id: newUser.id, 
            fullname: newUser.nombre, }, env.TOKENJWT , {
            expiresIn: 86400 //24h
        });

        console.log('this is my savedUSer', token);

        return res.status(201).json({message: 'Usuario creado satisfactoriamente', data: token})


    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Ha sucedido un error interno', data: ''})
    }
}