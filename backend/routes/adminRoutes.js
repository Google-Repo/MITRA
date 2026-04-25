import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/:id', adminController.getAdmin);
router.get('/', adminController.getAllAdmins);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

export default router;
