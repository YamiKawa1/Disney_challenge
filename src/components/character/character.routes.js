import { Router } from "express";
import * as characterCtrl from "./character.controller"

const router = new Router();

router.get('/', characterCtrl.getCharacters);

router.post('/', characterCtrl.createCharacter);

router.patch('/:id', characterCtrl.updateCharacterById);

router.delete('/:id', characterCtrl.deleteCharacterById);

router.get('/:name', characterCtrl.getCharacterByName);

export default router