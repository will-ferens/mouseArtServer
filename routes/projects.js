const express = require('express')
const router = express.Router()
const Project = require('../models/project')
const mongoose = require('mongoose')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storage = multer.diskStorage({
    destination: function(req, files, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    },
    fileFilter: fileFilter
})



const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}})

router.get('/', (req, res, next) => {
    Project.find()
    .select('name artist image')
    .exec()
    .then(docs => {
        const response = {
            projects: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    artist: doc.artist,
                    image: doc.image,
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: error})
    })
})

router.post('/', upload.single('image'), (req, res, next) => {
    
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        artist: req.body.artist,
        image: req.file.path
    })

    project
        .save()
        .then(result => {
            res.status(201).json({
                message: 'poop poop pee pee',

            })
        .catch( err => console.log(err))
            res.status(500).json({error: err})
        })
})


module.exports = router