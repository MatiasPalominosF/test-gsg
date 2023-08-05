import fs from "fs";
import path from "path";

export const getSymbols = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/symbols.json");
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading the JSON file" });
      } else {
        const jsonData = JSON.parse(data);
        const symbolsList = jsonData.symbolsList;
        res.json(symbolsList);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSymbolById = (req, res) => {
  const { id } = req.params;

  try {
    const filePath = path.join(__dirname, "../data/symbols.json");
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading the JSON file" });
      } else {
        const jsonData = JSON.parse(data);
        const symbolsList = jsonData.symbolsList;
        const symbolFinded = symbolsList.find((s) => s.symbol === id);
        res.json(symbolFinded);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
