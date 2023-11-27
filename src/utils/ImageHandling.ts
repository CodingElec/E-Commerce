import * as Multer from 'multer';


const storageOptions = Multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, './src/uploads/' + file.fieldname);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

    

export class ImgHandler{
    public multer = Multer({storage: storageOptions, fileFilter:fileFilter});
    
}