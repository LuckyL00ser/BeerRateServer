import express from 'express';
import userRoutes from './userRoutes';
import beerRoutes from './beerRoutes'
import breweryRoutes from './breweryRoutes'
import commentRoutes from './commentRoutes'
import opinionRoutes from './opinionRoutes'
import beerTypeRoutes from './beerTypeRoutes'
import authController from "../controllers/auth.controller";


const router = express.Router();
router.post('/auth/login',authController.authenticate);
router.post('/auth/refresh',authController.verifyRefreshToken)

router.use('/users',userRoutes);
router.use('/breweries',breweryRoutes);
router.use('/beer-types',beerTypeRoutes);
router.use('/beers',beerRoutes);
router.use('/comments',commentRoutes);
router.use('/opinions',opinionRoutes);


export default router;