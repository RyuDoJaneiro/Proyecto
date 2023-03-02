const { model, Schema } = require("mongoose");

const TurnSchema = new Schema({
        turnDate: {
                type: Date,
                required: true
        },
        turnSchedule: {
                type: String,
                required: true
        },
        turnDescription: {
                type: String,
                required: true
        },
        turnPacient: {
                type: String,
                required: true
        },
        turnDoctor: {
                type: String,
                required: true
        },
        pacientName: {
                type: String
        },
        doctorName: {
                type: String
        }
}, {
        timestamps: true,
        versionKey: false
});

module.exports = model("Turn", TurnSchema);