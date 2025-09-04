
//@ts-
const asyncHandler = require('express-async-handler');
/** @type {import("mongoose").Model<import("mongoose").Document>} */
const Contact = require("../models/contactModel");



//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res)=>{
    const allContacts = await Contact.find({creator_id: req.user.id});
    res.status(200).json(allContacts);
})

//@desc Create a new contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req,res,next)=>{
    const {name, email, phone} = req.body;
    const newContact = await Contact.create({
        name,
        email,
        phone,
        creator_id: req.user.id
    })
    res.status(201).json(newContact);
})


//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res)=>{
    const contactById = await Contact.findById(req.params.id);
    if(!contactById){
        res.status(404);
        throw new Error(`Cannot find the contact with the id : ${req.params.id}`);
    }

    if(contactById.creator_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Forbidden to access the contact");
    }
    res.status(200).json(contactById);
})

//@desc Update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res)=>{
    const contactById = await Contact.findById(req.params.id);
    if(!contactById){
        res.status(404);
        throw new Error(`Cannot find the contact with the id : ${req.params.id}`);
    }

    if(contactById.creator_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Forbidden to update the contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updatedContact);
})

//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req,res)=>{

    const contactById = await Contact.findById(req.params.id);
    if(!contactById){
        res.status(404);
        throw new Error(`Cannot find the contact with the id : ${req.params.id}`);
    }

    if(contactById.creator_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Forbidden to delete the contact");
    }
    const deletedContact = await Contact.findByIdAndDelete(
        req.params.id,
    )

    res.status(200).json(deletedContact);
})
    
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}