const mongoose = require('mongoose');

const AppealObjectionSchema = new mongoose.Schema({
  applicantName: { type: String, required: true },
  nic: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, enum: ['Appeal', 'Objection'], required: true },
  reason: { type: String, required: true },
  supportingDocs: { type: String },
  date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AppealObjection', AppealObjectionSchema);
