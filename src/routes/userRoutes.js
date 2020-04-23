import express from 'express';
import userController from '../controllers/user.controller'
const router = express.Router();


router.get('/',userController.index)
router.get('/:id',userController.getById)
router.post('/login',userController.authenticate)
router.post('/register',userController.create)
router.put('/:id',userController.update)
router.delete('/',userController.remove)


export default  router;
