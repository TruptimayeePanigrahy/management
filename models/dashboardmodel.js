const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  department: {
    type: String,
    enum: ["Tech", "Marketing", "Operations"],
  },
  salary: Number,
});

const DashboardModel = mongoose.model("Dashboard", dashboardSchema);


module.exports = { DashboardModel }

