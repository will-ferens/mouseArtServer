const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    image: { 
        type: String, 
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema)