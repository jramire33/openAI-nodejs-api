import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { getTextFromAudio } from '../controllers/iaServices.controller.js';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

router.post('/audio/transcription', upload.single('audio'), getTextFromAudio);


export default router;