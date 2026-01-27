import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', registerController.registerUser);
router.get('/check-email', registerController.checkEmailAvailability);
router.get('/check-id', registerController.checkIdAvailability);
router.post('/hotels/register', registerController.registerHotel);
router.get('/hotels/check-email', registerController.checkHotelEmailAvailability);
router.get('/hotels/check-cedula', registerController.checkCedulaAvailability);
router.post('/activities/register', registerController.registerActivity);
router.get('/activities/check-email', registerController.checkActivityEmailAvailability);
router.get('/activities/check-cedula', registerController.checkCedulaAvailability);

export default router;