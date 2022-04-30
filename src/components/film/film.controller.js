import { Film } from "../../models/Film";
import { Personaje } from "../../models/Personaje";
import {PersonajeFilm} from "../../models/PersonajeFilm"


export const getFilms = async(req, res) => {
    try {
        const film = await Film.findAll({attributes: ['id', 'imagen', 'titulo', 'fechaCreacion'] , include: Personaje})

        return res.status(200).json({message: 'Todas las peliculas y series', data: film});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'ha habido un error interno', data: ''});
    }
    
}

export const getFilmById = async(req, res) => {
    try {
        const {id} = req.params;

        const film = await Film.findOne({where: {id: id}, include: Personaje});
    
        return res.status(200).json({message: `${film.titulo} Ha sido encontrado`, data: film});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'ha habido un error interno', data: ''});
    }
   
}

export const createFilm = async(req, res) => {
    try {
        const { titulo, imagen, fechaCreacion, calificacion, personajes } = req.body

    if (!imagen || !titulo || !fechaCreacion || !calificacion) {   
        return res.status(400).json({message: 'Faltan datos', data: ''});
    }

    const newFilm = await Film.create({
        titulo: titulo,
        imagen: imagen,
        fechaCreacion: fechaCreacion,
        calificacion: calificacion,
    });

    // Verifica que hayan enviados algun film
    // Luego verifica si ese film esta guardado
    //  si esta guardado hace la relacion entre ambas 
    if (personajes.length > 0) {
        personajes.forEach(async element => {
            let findPersonaje = await Personaje.findOne({where: {nombre: element}})
            if (findPersonaje) {
                await PersonajeFilm.create({PersonajeId: findPersonaje.id, FilmId: newFilm.id})
            }
        });
    }

    return res.status(200).json({message: 'Film creado satisfactoriamente', data: newFilm});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'ha habido un error interno', data: ''});
    } 
}

export const updateFilmById = async(req, res) => {
    try {
        const {id} = req.params
    const {titulo, imagen, fechaCreacion, calificacion, personajes} = req.body

    const updatedFilm = await Personaje.update({
        titulo: titulo,
        imagen: imagen,
        fechaCreacion: fechaCreacion,
        calificacion: calificacion,
    },{where: {id: id}})

    // Verifica que hayan enviados algun personaje
    // Luego verifica si ese personaje esta guardado en la base de datos
    //  si esta guardado hace la relacion entre ambas 
    if (personajes.length > 0) {
        personajes.forEach(async element => {
            let findPersonaje = await Personaje.findOne({where: {titulo: element}})
                if (findPersonaje) {
                    const alreadyInFilm = await PersonajeFilm.findOne({where: {PersonajeId: findPersonaje.id, filmId: id}})
                    if (!alreadyInFilm) {
                        await PersonajeFilm.create({PersonajeId: findPersonaje.id, FilmId: id})
                    }
            }
        });
    }
    return res.status(200).json({message: 'Film actualizado satisfactoriamente', data: updatedFilm});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
    
}

export const deleteFilmById = async(req, res) => {
    try {
        const {id} = req.params;

        await Film.destroy({where: {id: id}})

        return res.status(200).json({message: 'Film borrado exitosamente', data: ''});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
   
}

export const filterFilm = async(req, res) => {
    try {
        const {titulo, genero, order} = req.query
        
        console.log(req.query);
    if (titulo) {
        const filter = await Film.findAll({where: {titulo: titulo}, include: Personaje});
        console.log('enter here');
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    if (genero) {
        const filter = await Film.findAll({where: {genero: genero}, include: Personaje});
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    if (order) {
        const filter = await Film.findAll({order: ['name', order], include: Personaje});
        return res.status(200).json({message: 'Filtro', data: filter});
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'error interno', data: ''});
    }
    

    
}