const path = require("path");
const fs = require("fs");

const filesave = async (req, res) => {
    const filePath = path.join(process.cwd(), "public", "components.json");

    if (!fs.existsSync("public")) {
        fs.mkdirSync("public", { recursive: true });
    }
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.json({ message: "File saved successfully" });
          
    } catch (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ message: "Failed to save file" });
    }
};


module.exports = filesave;
