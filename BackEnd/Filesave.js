import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

const filePath = path.join(process.cwd(), "public", "components.json");


if (!fs.existsSync("public")) {
    fs.mkdirSync("public", { recursive: true });
}

app.post("/save-json", async (req, res) => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.json({ message: "File saved successfully" });
    } catch (err) {
        console.error("Error writing file:", err);
        res.status(500).json({ message: "Failed to save file" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
