const useraccessdata = require('../model/loginschema')

const saveuser = async (req,res)=>{
        try{
            const newuser = await new useraccessdata({...req.body})
            await newuser.save();
            return res.json({msg:' user saved successfully'})
        }
        catch(e){
            return res.json({msg:e})

        }
}
module.exports = {saveuser}