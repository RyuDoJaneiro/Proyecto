const User = require("../src/models/User");
const bcrypt = require("bcrypt");
const generateJWT = require("../src/middlewares/generate-jwt");

const ctrlAuth = {};

ctrlAuth.logIn = async (req, res) =>
{
        const { userName, userPassword } = req.body;

        try {
                const user = await User.findOne({userName});

                if (!user) {
                        return res.status(400).json({
                                msg: "Error al autenticarse - Usuario no encontrado",
                                data: [userName, userPassword]
                        })
                }

                if (!user.isActive) {
                        return res.status(400).json({
                                msg: "Error al autenticarse - Usuario inactivo"
                        })
                }

                const validatePassword = bcrypt.compareSync(userPassword, user.userPassword);

                if (!validatePassword) {
                        return res.status(400).json({
                                msg: "Error al autenticarse - Contraseña incorrecta"
                        })
                }

                const token = await generateJWT({ uid: user._id});
                return res.json({
                        session: `Sesión iniciada como ${user.userName}`,
                        token,
                        user
                });

        } catch (error) {
                console.log(error);
                return res.status(400).json({
                        msg:"Error al iniciar sesión",
                        error: error.message
                })
        }
}

module.exports = ctrlAuth;