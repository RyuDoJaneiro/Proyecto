const task = require("../../../Códigos/Taller de Programación/II/Parcial I/src/models/task");
const Turn = require("../src/models/task");
const ctrlTurn = {};

ctrlTurn.getTurns = async (req, res) =>
{
        const turns = await task.find({turnId});

        return res.json(tasks);
}

ctrlTurn.postTurn = async (req, res) =>
{
        const { turnName, turnDescription } = await req.body;

        // Crear un nuevo turno
        const newTurn = new task({
                turnName,
                turnDescription,
                userId: req.user._id
        });

        // Intentar guardar el nuevo turno
        try {
                const savedTurn = await newTurn.save();
                return res.json("El turno fue creado con éxito");

        } catch (error) {
                console.log(error);
        }
}