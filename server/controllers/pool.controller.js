const Pool = require("../models/pool.model");
const { verifyRecaptcha } = require("../helpers/recaptcha-v3");
const controller = {};

// example: http://localhost:3000/pools?page=1&pageSize=10
controller.all = async (req, res) => {
  try {
    const { data, pageSize, totalPages, resultCount } = await Pool.all({ page: req.query.page, pageSize: req.query.pageSize });
    res.json({ items: data, pageSize, totalPages, resultCount });
  } catch (err) {
    res.status(500).json(err);
  }
};

controller.add = async (req, res) => {
  try {
    const { title, url, description, goal, token } = req.body;
    verifyRecaptcha(token)
      .then(response => {
        const { success, score } = response.data;
        if (success && score >= 0.5) {
          const opts = { title, url, description, goal };
          (async () => {
            const poolID = await Pool.add(opts);
            res.json({ id: poolID, ...opts });
          })();
        } else {
          res.status(500).json("Recaptcha verification failed");
        }
      })
      .catch(error => {
        console.log(error);
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

controller.getContributions = async (req, res) => {
  try {
    const { poolId } = req.params;
    const contributions = await Pool.getContributions({ poolId });
    res.json({ items: contributions });
  }
  catch (err) {
    res.status(500).json(err);
  }
};

module.exports = controller;