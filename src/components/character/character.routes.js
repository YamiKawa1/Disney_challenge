import { Router } from "express";
import * as characterCtrl from "./character.controller"

const router = new Router();

router.get('/', characterCtrl.getCharacters);

router.post('/', characterCtrl.createCharacter);

router.get('/filter?', characterCtrl.filterCharacter);

router.patch('/:id', characterCtrl.updateCharacterById);

router.delete('/:id', characterCtrl.deleteCharacterById);

router.get('/:id', characterCtrl.getCharacterById);

export default router