const mongoose = require('mongoose')
const subscriberSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    subscribedToChannel:{
        type:String,
        required:true

    },
    subscirbeDate:{
        type:Date,
        required:true,
        default: Date.now

    }
})


//When this is exported and imported into a different file the model allows us to interact with the database using this schema
module.exports = mongoose.model('Subscriber', subscriberSchema)