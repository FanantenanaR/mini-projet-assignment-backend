const authenticationService = require("../service/authentication.service");

const loginStudentEndPoint = async (request, response) => {
    try {
        const { email, password } = request.body;
        console.log("email", email);
        console.log("password", password);
        const resultat = await authenticationService.loginStudent(email, password);
        if (!resultat) {
            response.status(401).send({
                status: 401,
                message: "User not found or the given credentials are incorrect"
            });
        } else {
            console.log("resultat", resultat)
            response.status(201).send({
                status: 201,
                message: "OK",
                data: resultat
            });
        }
    } catch (errorLogin) {
        console.log("error login", errorLogin);
        // handle error by returning a response with status 500
        response.status(500).send({
            message: "Error",
            error: errorLogin
        });
    }
}

const loginProfEndPoint = async (request, response) => {
    try {
        const { email, password } = request.body;
        console.log("email", email);
        console.log("password", password);
        const resultat = await authenticationService.loginProf(email, password);
        if (!resultat) {
            response.status(401).send({
                status: 401,
                message: "User not found or the given credentials are incorrect"
            });
        } else {
            console.log("resultat", resultat)
            response.status(201).send({
                status: 201,
                message: "OK",
                data: resultat
            });
        }
    } catch (errorLogin) {
        console.log("error login", errorLogin);
        response.status(500).send({
            message: "Error",
            error: errorLogin
        });
    }
}

module.exports = {
    loginStudentEndPoint,
    loginProfEndPoint
}