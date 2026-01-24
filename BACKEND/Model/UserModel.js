const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Personal Details (Identification)
  fullName: {
    type: String,
    required: [true, "Full Name is required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [100, "Name cannot exceed 100 characters"],
    match: [/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"],
  },

  nic: {
    type: String,
    required: [true, "NIC number is required"],
    unique: true,
    match: [/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, "NIC must be 9 digits + V/X or 12 digits"],
  },

  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
    validate: {
      validator: function (value) {
        return value < new Date(); // must be in the past
      },
      message: "Date of birth cannot be in the future",
    },
  },



  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: [true, "Gender is required"],
  },

  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Widowed", "Divorced", "Other"],
    required: [true, "Marital Status is required"],
  },

  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [5, "Address must be at least 5 characters long"],
    maxlength: [200, "Address cannot exceed 200 characters"],
  },

  gnDivision: {
    type: String,
    required: [true, "GN Division is required"],
  },

  contactNumber: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^[0-9]{10}$/, "Contact number must be exactly 10 digits"],
  },

  // Household & Family Details
  householdIncome: {
    type: Number,
    min: [0, "Income cannot be negative"],
    max: [1000000, "Income cannot exceed 1,000,000"],
    required: [true, "Household income is required"],
  },

  occupation: {
    type: String,
    trim: true,
    maxlength: [50, "Occupation cannot exceed 50 characters"],
  },

  dependents: {
    type: Number,
    min: [0, "Dependents cannot be negative"],
    max: [20, "Dependents cannot exceed 20"],
    default: 0,
  },

  headOfHousehold: {
  type: String,
  required: [true, "Head of Household field is required"],
  enum: ["Yes", "No"], // only allow "Yes" or "No"
  default: "No",
},



  // Welfare Program Details
  programType: {
    type: String,
    required: [true, "Program Type is required"],
    enum: [
      "Samurdhi",
      "Elderly Pension",
      "Disability Aid",
      "Education Aid",
      "Housing Aid",
      "Medical Aid",
      "Other",
    ],
  },

  reason: {
    type: String,
    required: [true, "Reason for applying is required"],
    minlength: [10, "Reason must be at least 10 characters long"],
    maxlength: [300, "Reason cannot exceed 300 characters"],
  },

  requestedAmount: {
    type: Number,
    min: [0, "Requested amount cannot be negative"],
    max: [500000, "Requested amount cannot exceed 500,000"],
    required: [true, "Requested amount is required"],
  },

  previousAidReceived: {
  type: String,
  required: [true, "Previous Aid Received field is required"],
  enum: {
    values: ["Yes", "No"],
    message: "Previous Aid Received must be either 'Yes' or 'No'",
  },
  default: "No",
},

  previousAidDetails: {
  type: String,
  maxlength: [200, "Previous aid details cannot exceed 200 characters"],
  default: "", // default to empty string
  validate: {
    validator: function (value) {
      // If previous aid was received ("Yes"), details must be at least 5 characters
      if (this.previousAidReceived === "Yes") {
        return typeof value === "string" && value.trim().length >= 5;
      } else {
        // If previous aid was not received ("No"), allow empty or any string
        return typeof value === "string";
      }
    },
    message: function () {
      if (this.previousAidReceived === "Yes") {
        return "Previous aid details must be at least 5 characters long because aid was received.";
      } else {
        return "Previous aid details can be empty or any string if no previous aid was received.";
      }
    },
  },
},


  appliedDate: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value) {
        return value <= new Date(); // cannot be in the future
      },
      message: "Applied date cannot be in the future",
    },
  },

});

 

module.exports = mongoose.model("UserModel", userSchema);
