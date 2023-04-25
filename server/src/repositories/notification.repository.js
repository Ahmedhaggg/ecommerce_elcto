const { handleInsertErrors } = require("../errors/databaseQueries.error.handler");
let { Notification } = require("../models");

exports.create = async ({ type, message, relatedId, userId }) => {
    try {
        let newNotification = new Notification();
        newNotification.user = userId;
        newNotification.message = message;
        newNotification.type = type;
        newNotification.relatedId = relatedId;
        return await newNotification.save();
    } catch (error) {
        return handleInsertErrors(error);
    }
}

exports.findAllByUserId = async userId => await Notification.find({ user: userId });

exports.deleteUserNotifications = async userId => await Notification.deleteMany({ user: userId });