import { Router } from "express";
import * as filmCtrl from './film.controller'

const router = new Router();

router.get('/', filmCtrl.getFilms);

router.post('/', filmCtrl.createFilm);

router.get('/filter?', filmCtrl.filterFilm);

router.patch('/:id', filmCtrl.updateFilmById);

router.delete('/:id', filmCtrl.deleteFilmById);

router.get('/:id', filmCtrl.getFilmById);

export default router