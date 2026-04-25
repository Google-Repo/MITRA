import express from 'express';
import * as studentController from '../controllers/studentController.js';

const router = express.Router();

router.post('/signup', studentController.signup);
router.post('/login', studentController.login);
router.get('/:id', studentController.getStudent);
router.get('/', studentController.getAllStudents);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;