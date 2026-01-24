const AppealObjection = require('../Model/AppealObjectionModel');

// Create new appeal/objection
exports.createAppealObjection = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.supportingDocs = req.file.filename; // or req.file.path for full path
    }
    const appeal = new AppealObjection(data);
    await appeal.save();
    res.status(201).json({ message: 'Appeal/Objection submitted', appeal });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all appeals/objections
exports.getAllAppeals = async (req, res) => {
  try {
    const appeals = await AppealObjection.find().sort({ createdAt: -1 });
    res.json({ appeals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single appeal/objection
exports.getAppealById = async (req, res) => {
  try {
    const appeal = await AppealObjection.findById(req.params.id);
    if (!appeal) return res.status(404).json({ error: 'Not found' });
    res.json({ appeal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update appeal/objection
exports.updateAppeal = async (req, res) => {
  try {
    let data = req.body;
    if (req.file) {
      data.supportingDocs = req.file.filename;
    }
    const appeal = await AppealObjection.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!appeal) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Updated', appeal });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete appeal/objection
exports.deleteAppeal = async (req, res) => {
  try {
    const appeal = await AppealObjection.findByIdAndDelete(req.params.id);
    if (!appeal) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
