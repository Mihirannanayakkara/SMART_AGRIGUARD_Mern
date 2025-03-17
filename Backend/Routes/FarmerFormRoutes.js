import express from "express";
import { Farmer } from "../Models/farmerModel.js";


const router = express.Router();

//Route for save a new inquary
router.post('/', async (request,response)=>{
    try{
        if(
            !request.body.firstName||
            !request.body.lastName||
            !request.body.role||
            !request.body.email||
            !request.body.gender||
            !request.body.address||
            !request.body.contactNumber
        ){
            return response.status(400).send({
                message:'send all required field'
            });
        }
  
        const newFarmerForm = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            role: request.body.role,
            email: request.body.email,
            gender: request.body.gender,
            contactNumber: request.body.contactNumber,
            address: request.body.address
  
        };
  
        const farmer = await Farmer.create(newFarmerForm);
        return response.status(201).send(farmer)
  
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
  
  })


 //get all farmers inquary
router.get('/', async (request , response)=>{
    try{
        const farmers = await Farmer.find({});
        return response.status(200).json({
            count:farmers.length,
            data:farmers
        });

    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



//get farmer inquery by id
router.get('/:id', async (request , response)=>{
    try{

        const {id} = request.params;

        const farmer = await Farmer.findById(id);

        return response.status(200).json({farmer});

    } catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



//update an inquery
router.put('/:id', async(request,response)=>{
    try{
        if(
            !request.body.firstName||
            !request.body.lastName||
            !request.body.role||
            !request.body.email||
            !request.body.gender||
            !request.body.address||
            !request.body.contactNumber
        ){
            return response.status(400).send({
                message:'send all required field'
            });
        }

        const {id} = request.params;

        const result =  await Farmer.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'Farmer inqury not found'});
        }
        else{
            return response.status(200).send({message:'Farmer submission updated successfully'});
        }

    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});



//delete an inquery
router.delete('/:id', async (request,response)=>{
    try{

        const {id} = request.params;

        const result = await Farmer.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:'farmer not found'});
        }
        else{
            return response.status(200).send({message:'farmer details deleted successfully'});
        }
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

  export default router;