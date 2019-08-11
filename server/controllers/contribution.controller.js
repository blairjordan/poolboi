const Contribution = require("../models/contribution.model");

const controller = {};

controller.all = async (req, res) => {
  try {
    const contribution = await Contribution.all();
    res.json(contribution);
  } catch (err) {
    res.status(500).json(err);
  }
};

controller.add = async (req, res) => {
  try {
    const { poolId } = req.params;
    const { email, amt, notes, txid } = req.body;
    const { token } = req.body;
    verifyRecaptcha(token)
      .then(response => {
        const { success, score } = response.data;
        if (success && score >= 0.5) {
          const opts = { poolId, txid, meta: JSON.stringify({ email, amt, notes }) };
          (async () => {
            try {
              const contributionID = await Contribution.add(opts);
              res.json(contributionID);
            } catch (err) {
              res.status(500).json(err);
            }
          })();
        } else {
          res.status(500).json("Recaptcha validation failed.");
        }
      })
      .catch(err => {
        throw err;
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = controller;