import express from 'express';
import locationController from '../controllers/locationController.js';

const router = express.Router();

router.get('/countries', locationController.getCountries);


export default router;