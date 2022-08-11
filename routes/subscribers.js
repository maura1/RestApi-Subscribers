const express = require('express')
const subscriber = require('../model/subscriber')
//To get the router from express
const router = express.Router()
//Pulling in the schema/template that was created in model in the subscriber.js file
const Subscriber = require('../model/subscriber')
//CREATING ROUTES
//Getting all subscriber
router.get('/', async(req,res) =>{
    //sends text to the server
    //res.send('Hello World')
    try{
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    }catch(err){
        //500 = error on the server
        res.status(500).json({message:err.message})

    }

})
//Getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.json(res.subscriber)
  })

//Creating a new subscriber
router.post('/', async(req,res) =>{
    const subscriber = new Subscriber({
        name:req.body.name,
        subscribedToChannel:req.body.subscribedToChannel
    })
    //saving the new subscriber, it will try to persist this to the db,
    try{
        const newSubscriber = await subscriber.save()
        //201 = successuflly created an object
        res.status(201).json(newSubscriber)
    }catch(err){
        //400 error is used when the user gives bad data.
        res.status(400).json({message:err.message})

    }

})
//Updating a subscriber
//Using patch as it will just update one part of the subscriber eg if just the name was changed, put updates everything
router.patch('/:id', getSubscriber, async (req, res) => {
    if (req.body.name != null) {
      res.subscriber.name = req.body.name
    }
    if (req.body.subscribedToChannel != null) {
      res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }
    try {
      const updatedSubscriber = await res.subscriber.save()
      res.json(updatedSubscriber)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//Deleting a subscriber
router.delete('/:id',getSubscriber,async (req,res) =>{
    try{
        await res.subscriber.remove()
        res.json({message:'Deleted Subscriber'})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})


//Writing a function using middleware for the routes that are the same i.e. those routes that are ending with ':id'

async function getSubscriber(req,res,next){
    let subscriber
    try{
        //Get a user based on the id that was passed in the url
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null){
            //using 'return' because if there is no subscriber, we want to immediately leave this function.
            return res.status(404).json({message:'Cannot find subscriber!'})
        }
    }catch(err){
        return res.status(500).json({message:err.message})

    }
    //we can use this in the routes ending with 'id'
    res.subscriber = subscriber
    //next allows us to move on to the next piece of middleware or the actual request
    next()
}






module.exports = router