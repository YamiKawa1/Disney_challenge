import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

export const login = async(req, res) => {
    const{imagen, nombre, email, password} = req.body
}