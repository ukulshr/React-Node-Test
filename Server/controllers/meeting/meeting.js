const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

// Get all meetings
const index = async (req, res) => {
    try {
        const query = req.query;
        query.deleted = false;

        let allData = await MeetingHistory.find(query)
            .populate({
                path: 'createBy',
                match: { deleted: false },
                select: 'firstName lastName username'
            })
            .sort({ createdDate: -1 })
            .exec();

        const result = allData.filter(item => item.createBy !== null);
        res.status(200).json(result);
    } catch (error) {
        console.error('Failed to fetch meetings:', error);
        res.status(400).json({ error: 'Failed to fetch meetings' });
    }
}

// Add new meeting
const add = async (req, res) => {
    try {
        const user = req.user;
        
        if (!user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        req.body.createBy = user.userId;
        req.body.createdDate = new Date();

        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        
        // Return the meeting with user information populated
        const populatedMeeting = await MeetingHistory.findById(meeting._id)
            .populate('createBy', 'firstName lastName username');

        res.status(200).json(populatedMeeting);
    } catch (err) {
        console.error('Failed to create meeting:', err);
        res.status(400).json({ 
            error: 'Failed to create meeting',
            details: err.message
        });
    }
}

// Get single meeting by ID
const view = async (req, res) => {
    try {
        const meeting = await MeetingHistory.findOne({ 
            _id: req.params.id, 
            deleted: false 
        })
        .populate('createBy', 'firstName lastName username');

        if (!meeting) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json(meeting);
    } catch (error) {
        console.error('Failed to fetch meeting:', error);
        res.status(400).json({ error: 'Failed to fetch meeting' });
    }
}

// Update meeting
const edit = async (req, res) => {
    try {
        req.body.updatedDate = new Date();
        
        let result = await MeetingHistory.updateOne(
            { _id: req.params.id, deleted: false },
            { $set: req.body }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        const updatedMeeting = await MeetingHistory.findById(req.params.id)
            .populate('createBy', 'firstName lastName username');

        res.status(200).json(updatedMeeting);
    } catch (err) {
        console.error('Failed to update meeting:', err);
        res.status(400).json({ error: 'Failed to update meeting' });
    }
}

// Delete single meeting
const deleteData = async (req, res) => {
    try {
        const result = await MeetingHistory.updateOne(
            { _id: req.params.id },
            { $set: { deleted: true, deletedDate: new Date() } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Meeting not found' });
        }

        res.status(200).json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        console.error('Failed to delete meeting:', error);
        res.status(400).json({ error: 'Failed to delete meeting' });
    }
}

// Delete multiple meetings
const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ error: 'Invalid meeting IDs provided' });
        }

        const result = await MeetingHistory.updateMany(
            { _id: { $in: ids } },
            { $set: { deleted: true, deletedDate: new Date() } }
        );

        res.status(200).json({ 
            message: `${result.modifiedCount} meetings deleted successfully` 
        });
    } catch (error) {
        console.error('Failed to delete meetings:', error);
        res.status(400).json({ error: 'Failed to delete meetings' });
    }
}

module.exports = { add, index, view, edit, deleteData, deleteMany }