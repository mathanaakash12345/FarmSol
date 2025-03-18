const Agridata = require('../model/agridataschema');

const saveAgridata = async (req, res) => {
    try {
        const newAgridata = new Agridata({ ...req.body });
        await newAgridata.save();
        return res.json({ msg: 'data saved in DB', data: newAgridata });
    } catch (err) {
        return res.status(500).json({ msg: 'Error', error: err.message });
    }
};

module.exports = { saveAgridata }; 
