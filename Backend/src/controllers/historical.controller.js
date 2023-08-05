import fs from "fs";
import path from "path";

export const getHistorical = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/historical.json");
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading the JSON file" });
      } else {
        const jsonData = JSON.parse(data);
        const historicalStockList = jsonData.historicalStockList;
        res.json(historicalStockList);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHistoricalById = (req, res) => {
  const { id } = req.params;

  try {
    const filePath = path.join(__dirname, "../data/historical.json");
    fs.readFile(filePath, "utf8", function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading the JSON file" });
      } else {
        const jsonData = JSON.parse(data);
        const historicalStockList = jsonData.historicalStockList;
        const historicalFinded = historicalStockList.find(
          (h) => h.symbol === id
        );
        res.json(historicalFinded);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
