const User = require("../src/models/User")
const bcrypt = require("bcrypt");

const ctrlUser = {};

ctrlUser.getUsers = async (req, res) =>
{
        const Users = await User.find()

        return res.json({Users});
}

ctrlUser.getUser = async (req, res) =>
{
        const userName = req.body;

        try {
                const searchUser = await User.findOne(userName)
                return res.json({
                        msg: "Usuario encontrado",
                        searchUser
                });
        } catch (error) {
                console.log(error)
                return res.status(400).json({
                        msg:"Hubo un error al buscar al usuario"
                })
        }
}

ctrlUser.postUser = async (req, res) =>
{
        console.log(req.body);
        const { userName, userEmail, userPassword: receivedPassword, userSpecialty, userPasswordConfirm } = req.body;

        
        if (!userName || !userEmail || !receivedPassword){
                console.log('Datos faltantes')
                return res.status(400).json({
                        msg: "Hubo un error al crear al usuario"
                });
        }

        if (receivedPassword != userPasswordConfirm) {
                console.log("Las contraseñas no coinciden")
                return res.status(400).json({
                        msg:"Hubo un error al crear al usuario"
                })
        }
        
        const newPassword = bcrypt.hashSync(receivedPassword, 10);

        const newUser = new User({
                userName,
                userEmail,
                userPassword: newPassword,
                userSpecialty

        })

        try {
                const savedUser = await newUser.save();
                return res.json({
                        msg: "Usuario creado correctamente",
                        savedUser
                });
        } catch (error) {
                console.log(error)
                return res.status(500).json({
                        msg: "Hubo un error al crear al usuario"
                });
        }
}

module.exports = ctrlUser;