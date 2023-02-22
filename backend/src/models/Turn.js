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
                type: Schema.Types.ObjectId, ref: "User",
                default: "withoutPacient"
        },
        turnDoctor: {
                type: Schema.Types.ObjectId, ref: "User",
                default: "withoutDoctor"
        }
}, {
        timestamps: true,
        versionKey: false
});

module.exports = model("Turn", TurnSchema);