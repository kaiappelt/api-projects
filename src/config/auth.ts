require("dotenv/config");

// CONFIGURAÇÕES DO TOKEN
export default {
    jwt: {
        secret: process.env.JWT_SECRET, // "SecretParaTestes",
        expiresIn: process.env.JWT_EXPIRES, // "1d",
    }
}