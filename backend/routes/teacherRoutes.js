import express from 'express';
import * as teacherController from '../controllers/teacherController.js';

const router = express.Router();

router.post('/signup', teacherController.signup);
router.post('/login', teacherController.login);
router.get('/:id', teacherController.getTeacher);
router.get('/', teacherController.getAllTeachers);
router.put('/:id', teacherController.updateTeacher);
router.delete('/:id', teacherController.deleteTeacher);

export default router;
