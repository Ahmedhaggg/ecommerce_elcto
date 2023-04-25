let { Schema, model, Types } = require("mongoose")

let notificationSchema = new Schema({
    type: {
        type: String, 
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    relatedId: {
        type: Types.ObjectId,
        refPath: 'type',
        required: true
    }
    
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;