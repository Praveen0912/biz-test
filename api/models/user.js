const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: Number },
    name: { type: String },
    location: {
        type: { type: String },
        coordinates: []
        }
});

userSchema.index({ location : "2dsphere" });
module.exports = mongoose.model('User', userSchema);