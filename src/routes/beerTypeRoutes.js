import express from 'express';
import beerTypeController from '../controllers/beerType.controller'
const router = express.Router();


router.get('/',beerTypeController.index)
router.get('/:id',beerTypeController.getById)
router.post('/',beerTypeController.create)
router.delete('/:id',beerTypeController.remove)


export default  router;
