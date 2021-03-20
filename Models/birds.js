const mongoose = require("mongoose")
const Schema = mongoose.Schema
const birdSchema = new Schema({
    common_name: {
        type: String,
        required: true        
    },
    scientific_name: {
        type: String,
    },
    family: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    image:  {
        type: String,
    }    
},
    {
        versionKey: false
    }
)

module.exports = mongoose.model("Birds", birdSchema)