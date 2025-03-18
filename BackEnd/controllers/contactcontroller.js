const contactaccess = require('../model/contactschema');

const savecontact = async(req,res)=>{
    try{
        newcontact = await contactaccess({...req.body})
        await newcontact.save()
        return res.json({msg:'contactsaved successfully'})
    }
    catch(e){
        return res.json({msg:e})

    }
}
module.exports = {savecontact}