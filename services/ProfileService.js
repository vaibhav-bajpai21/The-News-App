const UserModel = require("../db/models/UserModel");
const Promise = require("bluebird");
const _ = require("lodash");
const crypto = require('crypto');

class ProfileService {
    constructor() {
        this.userModelInst = new UserModel();
    }

    async saveUserInfo(reqQuery, profilePictureObject) {
        try {
            let secret = process.env.SECRET;
            const hash = crypto.createHash('sha256', secret).update(reqQuery.password).digest("hex");
            reqQuery.password = hash;
            reqQuery.profileImage = profilePictureObject.filename;
            let dbResult = await this.userModelInst.saveRecord({ email: reqQuery.email }, reqQuery);
            let response = _.pick(dbResult, ["email", "password", "gender", "language"]);
            response.user_name = dbResult.userName;
            response.phone_number = dbResult.phoneNumber;
            response.marrital_status = dbResult.marritalStatus;
            response.date_of_birth = dbResult.dateOfBirth;
            response.time_of_birth = dbResult.timeOfBirth;

            return Promise.resolve({
                status: "Success",
                data: response
            })
        }
        catch (err) {
            console.log('-------Error in saveUserInfo Method-----', err);
            return Promise.reject({
                status: "Error",
                message: "DB Error"
            })
        }
    }
}
module.exports = ProfileService;