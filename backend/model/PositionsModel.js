const { model } = require("mongoose");

const { PositionsSchems } = require("../schemas/PositionsSchema");

const PositionsModel = model("postions", PositionsSchems);

module.exports = { PositionsModel };
