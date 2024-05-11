import express from 'express'
import { addFood, listFood ,removeFood } from '../controllers/foodController.js'
import multer from 'multer' // multer is used for uploading files and is a middleware

const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})


const upload = multer({storage: storage}) // upload middleware  we can sttore image in upload folder

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/delete",removeFood)


export default foodRouter;