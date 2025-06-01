const mongoose = require('mongoose');

const meetingHistory = new mongoose.Schema({
    agenda: { 
        type: String, 
        required: true,
        trim: true
    },
    attendes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contacts',
    }],
    attendesLead: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leads',
    }],
    location: {
        type: String,
        trim: true
    },
    meetingType: {
        type: String,
        enum: ['in-person', 'virtual', 'phone', 'hybrid'],
        default: 'in-person'
    },
    status: {
        type: String,
        enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
        default: 'scheduled'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    related: String,
    dateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date
    },
    notes: {
        type: String,
        trim: true
    },
    outcome: {
        type: String,
        trim: true
    },
    followUpRequired: {
        type: Boolean,
        default: false
    },
    followUpDate: {
        type: Date
    },
    meetingUrl: {
        type: String,
        trim: true
    },
    attachments: [{
        fileName: String,
        fileUrl: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date
    },
    deletedDate: {
        type: Date
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

// Index for better query performance
meetingHistory.index({ createBy: 1, deleted: 1 });
meetingHistory.index({ dateTime: 1 });
meetingHistory.index({ status: 1 });

module.exports = mongoose.model('Meetings', meetingHistory, 'Meetings');
