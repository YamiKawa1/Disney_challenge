import {Personaje} from '../../models/Personaje'
import {Film}  from '../../models/Film';
import {PersonajeFilm} from '../../models/PersonajeFilm'

export const getCharacters = async(req, res) => {
    try {
        const characters = await Personaje.findAll({attributes: ['id', 'nombre', 'imagen']})

        return res.status(200).json({message: 'Todos los personajes', data: characters});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'ha habido un error interno', data: ''});
    }
    
}

export const getCharacterById = async(req, res) => {
    try {
        const {id} = req.params;

        const personaje = await Personaje.findOne({where: {id: id}, include: Film});
    
        return res.status(200).json({message: `${personaje.nombre} Ha sido encontrado`, data: personaje});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: 'ha habido un error interno', data: ''});
    }
   
}

export const createCharacter = async(req, res) => {
    try {
        const {imagen, nombre, edad, peso, historia, films} = req.body

    if (!imagen || !nombre || !edad || !peso || !historia) {   
        return res.status(400).json({message: 'Faltan datos', data: ''});
    }

    const newCharacter = await Personaje.create({
        imagen: imagen,
        nombre: nombre,
        edad: edad,
        peso: peso,
        historia: historia,
    });

    // Verifica que hayan enviados algun film
    // Luego verifica si ese film esta guardado
    //  si esta guardado hace la relacion entre ambas 
    if (films.length > 0) {
        films.forEach(async element => {
            let findFilm = await Film.findOne({where: {titulo: element}})
            if (findFilm) {
                await PersonajeFilm.create({PersonajeId: createdCharacter.id, filmId: findFilm.id})
            }
        });
    }

    return res.status(200).json({message: 'Personaje creado satisfactoriamente', data: newCharacter});
    } catch (error) {
        console.log(error);
    }
    
}

export const updateCharacterById = async(req, res) => {
    try {
        const {id} = req.params
    const {imagen, nombre, edad, peso, historia, films} = req.body

    const updatedCharacter = await Personaje.update({
        imagen: imagen,
        nombre: nombre,
        edad: edad,
        peso: peso,
        historia: historia 
    },{where: {id: id}})

    // Verifica que hayan enviados algun film
    // Luego verifica si ese film esta guardado
    //  si esta guardado hace la relacion entre ambas 
    if (films.length > 0) {
        films.forEach(async element => {
            let findFilm = await Film.findOne({where: {titulo: element}})
                if (findFilm) {
                    const alreadyInFilm = await PersonajeFilm.findOne({where: {PersonajeId: id, filmId: findFilm.id}})
                    if (!alreadyInFilm) {
                        await PersonajeFilm.create({PersonajeId: id, filmId: findFilm.id})
                    }
            }
        });
    }

    return res.status(200).json({message: 'Personaje actualizado satisfactoriamente', data: updatedCharacter});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
    
}

export const deleteCharacterById = async(req, res) => {
    try {
        const {id} = req.params;

        await Personaje.destroy({where: {id: id}})

        return res.status(200).json({message: 'Personaje borrado exitosamente', data: ''});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
   
}

export const filterCharacter = async(req, res) => {
    try {
        const {nombre, peso, edad, films} = req.query
        
        console.log(req.query);
    if (nombre) {
        const filter = await Personaje.findAll({where: {nombre: nombre}, include: Film});
        console.log('enter here');
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    if (peso) {
        const filter = await Personaje.findAll({where: {peso: peso}, include: Film});
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    if (edad) {
        const filter = await Personaje.findAll({where: {edad: edad}, include: Film});
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    if (films) {
        const filter = await Personaje.findAll({where: {Film: films}, include: Film});
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
    

    
}