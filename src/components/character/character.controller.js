import Personaje from '../../models/Personaje'

export const getCharacters = async(req, res) => {
    try {
        const characters = await Personaje.findAll()

        return res.status(200).json({message: 'Todos los personajes', data: characters});
    } catch (error) {
        return res.status(400).json({message: 'ha habido un erro interno', data: ''});
    }
    
}

export const createCharacter = async(req, res) => {
    const {imagen, nombre, edad, peso, historia, films} = req.body

    if (!imagen || !nombre || !edad || !peso || !historia || !films) {
        
    }
}