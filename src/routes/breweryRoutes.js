import express from 'express';
import breweryController from '../controllers/brewery.controller'
const router = express.Router();


router.get('/',breweryController.index)
router.get('/:id',breweryController.getById)
router.get('/getNearby',breweryController.getNearbyBreweries)
router.post('/',breweryController.create)
router.put('/:id',breweryController.update)
router.delete('/:id',breweryController.remove)


export default  router;
