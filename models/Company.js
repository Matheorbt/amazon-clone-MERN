const mongoose = require("mongoose");

const Company = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a company name"],
  },
  creation: {
    type: Date,
    default: () => Date.now(),
  },
  items: {
    type: Array,
    default: undefined,
  },
  tags: {
    type: Array,
    default: undefined,
  },
  totalSold: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
});

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
