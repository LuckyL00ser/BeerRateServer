import express from 'express';
import opinionController from '../controllers/opinion.controller'
const router = express.Router();


router.get('/',opinionController.index)
router.get('/:id',opinionController.getById)
router.post('/',opinionController.create)
router.put('/:id',opinionController.update)
router.delete('/:id',opinionController.remove)


export default  router;
