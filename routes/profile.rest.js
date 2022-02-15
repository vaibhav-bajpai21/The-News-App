const ProfileService = require("../services/ProfileService");
const requestValidator = require("../middlewares/requestValidators/Validation");

function loadRoutes(app) {
    app.post("/register", requestValidator.createUserValidate, requestValidator.rejectIfInvalid, async (req, res) => {
        const profileServiceInst = new ProfileService();
        try {
            let { day, month, year } = req.body.date_of_birth;

            let dateOfBirth = new Date(day, month, year);
            let reqQuery = {
                userName: req.body.user_name,
                email: req.body.email,
                password: req.body.password,
                phoneNumber: req.body.phone_number,
                gender: req.body.gender,
                language: req.body.language,
                maritalSatus: req.body.marital_status,
                dateOfBirth: dateOfBirth,
                timeOfBirth: req.body.time_of_birth
            }
            let response = await profileServiceInst.saveUserInfo(reqQuery);
            res.send(response);
        }
        catch (err) {
            res.send(err);
        }
    })
}

module.exports = loadRoutes;