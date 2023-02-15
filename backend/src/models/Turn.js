const { model, Schema } = require("mongoose");

const TurnSchema = new Schema({
        turnDate: {
                type: Date,
                required: true
        },
        turnDescription: {
                type: String,
                required: true
        },
        turnPacient: {
                type: Schema.Types.ObjectId, ref: "User",
                default: "withoutPacient"
        }
}, {
        timestamps: true,
        versionKey: false
});

module.exports = model("Turn", TurnSchema);