const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const Turn = require("../src/models/Turn");
const ctrlTurn = {};

ctrlTurn.getTurns = async (req, res) =>
{
        try
        {
                const turns = await Turn.find({turnPacient: `${req.params.id}`});
                return res.json(turns);
        } catch (error)
        {
                console.log(error);
        }
}

ctrlTurn.postTurn = async (req, res) =>
{
        const { turnDate, turnSchedule, turnDescription, turnPacient, turnDoctor } = await req.body;

        // Crear un nuevo turno
        const newTurn = new Turn({
                turnDate,
                turnSchedule,
                turnDescription,
                turnPacient,
                turnDoctor
        });

        // Intentar guardar el nuevo turno
        try {
                const savedTurn = await newTurn.save();
                return res.json("El turno fue creado con éxito");

        } catch (error) {
                console.log(error);
        }
}

module.exports = ctrlTurn;