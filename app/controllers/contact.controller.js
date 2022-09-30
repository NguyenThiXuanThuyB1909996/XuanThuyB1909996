const ContactService = require ("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const contactservice = new ContactService(MongoDB.client);
        const document = await contactservice.create(req.body);
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "An error occurred while creating contact"));
    }
};

//Retrive all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try{
        const contactservice = new ContactService(MongoDB.client);
        const {name} = req.query
        if(name){
            documents = await contactservice.findByName(name);
        }else{
            documents = await contactservice.find({});
        }
    }catch(error){
        return next(new ApiError(500, "An error occurred while creating contact"));
    }
    return res.send(documents);
};

//Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try{
        const contactservice = new ContactService(MongoDB.client);
        const document = await contactservice.findById(req.params.id);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
       }
       return res.send(document);
    } catch(error){
       return next(
            new ApiError(
                500,
                 `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};
//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send({message:"Contact was updated successfully"});
    }catch(error){
        return next(new ApiError(500, `Error updating contact with id=${req.params.id}`));
    }
};
//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document){
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send({message:"Contact was deleted successfully"});
    }catch(error){
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

//Find all favorite contacts of a user
exports.findAllFavorite = async (_req, res, next) => {
    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        return res.send(document);
    }catch(error){
        return next(new ApiError(500, "An error occurred while retrieving favorite contact"));
    }
};

//Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next) => {
    try{
        const contactservice = new ContactService(MongoDB.client);
        const deleteCount = await contactservice.deleteAll();
        return res.send({msg:`${deleteCount} contact was deleted successfully`});
    }catch(error){
        return next(new ApiError(500,"An error occurred while removing all contact"));
    }
};

// exports.create = (req , res) =>{
//     res.send({ message: "create handler"});
// };

// exports.findAll = (req , res) =>{
//     res.send({ message: "findAll handler"});
// };

// exports.findOne = (req , res) =>{
//     res.send({ message: "findOne handler"});
// };

// exports.update = (req , res) =>{
//     res.send({ message: "update handler"});
// };

// exports.delete = (req , res) =>{
//     res.send({ message: "delete handler"});
// };

// exports.deleteAll = (req , res) =>{
//     res.send({ message: "deleteAll handler"});
// };

// exports.findAllFavorite = (req , res) =>{
//     res.send({ message: "findAllFavorite handler"});
// };
