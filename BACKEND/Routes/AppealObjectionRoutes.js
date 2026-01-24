const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/AppealObjectionController');


// Create (plain text, no file upload)
router.post('/', ctrl.createAppealObjection);
// Read all
router.get('/', ctrl.getAllAppeals);
// Read one
router.get('/:id', ctrl.getAppealById);
// Update (plain text, no file upload)
router.put('/:id', ctrl.updateAppeal);
// Delete
router.delete('/:id', ctrl.deleteAppeal);

module.exports = router;
