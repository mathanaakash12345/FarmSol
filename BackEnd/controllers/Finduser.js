const userdatas = require('../model/loginschema');

const finduser = async (req, res) => {
    const { Email, Password } = req.body; 

    try {
        const user = await userdatas.findOne({ Email: Email });

        if (user) {
            if (user.Password === Password) {
                res.status(200).json({ msg: user });
            } else {
                res.status(401).json({ msg: "Invalid password" });
            }
        } else {
            res.status(404).json({ msg: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};



module.exports =  finduser ;
