const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    date: {
        type: String,
    },
    nickName: {
        type: String,
        required: true,
    },
    postTitle: {
        type: String,
        required: true,
    },
    postDesc: {
        type: String,
        required: true,
    },
    postCharge: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    wifi: {
        type: String,
        required: true,
    },
    laundry: {
        type: String,
        required: true,
    },
    parkinglot: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
    postImg: {
        type: Array,
        required: true,
    },
    userProfile: {
        type: String,
    },

});

postsSchema.virtual('postId').get(function () {
    return this._id.toHexString();
});

postsSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Posts', postsSchema);