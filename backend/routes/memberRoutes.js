import express from 'express';
import multer from 'multer';
import Member from '../models/memberModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();


//upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../front-end/public/uploads')
    },
    filename: (req, file, cb) => {

        cb(null, file.fieldname + Date.now())
    }
});

const upload = multer({
    storage: storage
});


router.get("/", asyncHandler(async (req, res) => {
    Member.find({}, (err, docs) => {
        if (err) {
            res.status(404).json({
                messgae: 'oh, error'
            });
            return;
        };
        res.json(docs);
    });
}))
