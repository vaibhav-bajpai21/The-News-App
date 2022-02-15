const UserModel = require("../db/models/UserModel");
const Promise = require("bluebird");
const _ = require("lodash")

class ProfileService {
    constructor() {
        this.userModelInst = new UserModel();
    }

    async saveUserInfo(reqQuery) {
        try {
            let dbResult = await this.userModelInst.saveRecord({ userName: reqQuery.userName }, reqQuery);
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