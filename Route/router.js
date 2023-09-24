import express from "express";
import UserController from '../Controller/UserController.js';
import userAuthMiddleware from '../middleware/Auth.js';


const router = express.Router();

router.use('/Account', userAuthMiddleware);

router.post('/register',UserController.UserRegister );
router.post('/Login', UserController.UserLogin );
router.get('/Account', UserController.Account );

export default router;