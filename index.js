const express = require("express");
const axios = require("axios");
const checklistRules = require("./checklistRules");

const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.static("public"));

// Fetch data from API
const fetchData = async () => {
  const apiUrl =
    "http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639";
    
  try {
    const response = await axios.get(apiUrl, { timeout: 30000 });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    return null;
  }
};

// Evaluate checklist rules
const evaluateChecklist = (data) => {
  return checklistRules.map((rule) => ({
    rule: rule.name,
    description: rule.description,
    status: rule.evaluate(data) ? "Passed" : "Failed",
  }));
};

// Endpoint to evaluate checklist and return results
app.get("/evaluate", async (req, res) => {
  const data = await fetchData();

  if (!data) {
    return res.status(500).send("Error fetching data from API");
  }

  const results = evaluateChecklist(data);
  res.json(results);
//   console.log(results);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
