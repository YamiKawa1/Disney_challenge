import { Router } from "express";
import * as authCtrl from './auth.controller'


const router = new Router();

router.post('/login', authCtrl.login);

router.post('/register', authCtrl.register);

export default router