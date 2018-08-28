class UserController {
    constructor(log, userService, httpStatus) {
        this.log = log;
        this.userService = userService;
        this.httpStatus = httpStatus;
    }

    async create(req, res) {
        try {
            const { body } = req;
            const result = await this.userService.createUser(body);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

    async get(req, res) {
        try{
            const { userId } = req.params;
            const result = await this.userService.getUserById(userId);

            res.send(result);
        } catch (err) {
            this.log.error(err.message);
            res.send(err);
        }
    }

}

module.exports = UserController;