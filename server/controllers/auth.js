const { registerUser, loginUser } = require('../services/authService')


async function handleRegister(req, res) {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await registerUser(req);
        res.status(201).json({message: "User registered successfully", result});
    } catch (err) {
        if (err.message === "Email already exists") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

async function handleLogin(req, res) {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const result = await loginUser(req);
        res.status(200).json({message: "Login Successful", user: result});
    } catch (err) {
        if (err.message === "Wrong Credentials") {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = {
    handleRegister,
    handleLogin,
}