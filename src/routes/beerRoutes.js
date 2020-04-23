import express from 'express';
import beerController from '../controllers/beer.controller'
const router = express.Router();


router.get('/',beerController.index)
router.get('/:id',beerController.getById)
router.post('/register',beerController.create)
router.put('/:id',beerController.update)
router.delete('/',beerController.remove)


export default  router;
