const express = require('express');
const meeting = require('./meeting');
const auth = require('../../middelwares/auth');

const router = express.Router();

// GET /api/meeting - Get all meetings
router.get('/', auth, meeting.index);

// POST /api/meeting/add - Create new meeting
router.post('/add', auth, meeting.add);

// GET /api/meeting/view/:id - Get single meeting
router.get('/view/:id', auth, meeting.view);

// PUT /api/meeting/edit/:id - Update meeting
router.put('/edit/:id', auth, meeting.edit);

// DELETE /api/meeting/delete/:id - Delete single meeting
router.delete('/delete/:id', auth, meeting.deleteData);

// POST /api/meeting/deleteMany - Delete multiple meetings
router.post('/deleteMany', auth, meeting.deleteMany);

module.exports = router