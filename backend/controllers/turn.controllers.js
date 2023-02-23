const Turn = require("../src/models/Turn");
const ctrlTurn = {};

ctrlTurn.getTurns = async (req, res) =>
{
        const turns = await task.find();

        return res.json(turns);
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