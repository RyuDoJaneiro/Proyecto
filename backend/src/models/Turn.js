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
                default: "withoutPacient"
        },
        turnDoctor: {
                type: String,
                default: "withoutDoctor"
        }
}, {
        timestamps: true,
        versionKey: false
});

module.exports = model("Turn", TurnSchema);