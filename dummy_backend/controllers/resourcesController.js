const { EResource } = require("../models");

exports.getAllResources = async (req, res) => {
  try {
    const resources = await EResource.findAll();
    res.json(resources);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
