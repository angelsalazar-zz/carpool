class UserService {
    constructor (log, mongoose, httpStatus, errs) {
        this.log = log;
        this.mongoose = mongoose;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async createUser (body) {
        const Users = this.mongoose.model('users');
        const { email } = body;
        // Validate if user already exists
        const user = await Users.findOne({ email });

        if (user) {
            const err = new this.errs.InvalidArgumentError(
                `User with email ${email} already exists`
            );
            return err;
        }

        const newUser = new Users(body);
        newUser = await newUser.save();
        this.log.info('User Created Succesfully');
        return newUser;
    }

    async getUserById (id) {
        const Users = this.mongoose.model('users');
        const user = await Users.findOne({ _id : id });

        if (!users) {
            const err = new this.errs.NotFoundError(
                `User with id ${id} does not exists`
            );
            return err;
        }

        this.log.info('User fetched Successfully');
        return user; 
    }

    async getUserByEmail (email) {
        const Users = this.mongoose.model('users');
        const user = await Users.findOne({ email });

        if (!users) {
            const err = new this.errs.NotFoundError(
                `User with email ${email} does not exists`
            );
            return err;
        }

        this.log.info('User fetched Successfully');
        return user;
    }
}

module.exports = UserService;