import express from 'express';
import breweryController from '../controllers/brewery.controller'
const router = express.Router();


router.get('/',breweryController.index)
router.get('/:id',breweryController.getById)
router.get('/:id',breweryController.getNearbyBreweries)
router.post('/register',breweryController.create)
router.put('/:id',breweryController.update)
router.delete('/',breweryController.remove)


export default  router;
