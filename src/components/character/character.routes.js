import { Router } from "express";
import * as characterCtrl from "./character.controller"

const router = new Router();

router.get('/character', characterCtrl.getCharacters)

export default router