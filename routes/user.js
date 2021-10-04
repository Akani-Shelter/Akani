const express = require(`express`);
const router = express.Router();
const user = require(`../functions/user`);

router.post(`/register` , async (request, response, next) => {

    if(!request.body.email){
        let error = new Error(`Malformed request. Please check your parameters`);
        error.status = 400;
        return next(error);
    }
    else{
        await user.register(request.body.email).then(() => {
            return response.status(200).json(`User successfully registered`);
        }).catch(err => {
            let error = new Error(err);
            error.status = 500;
            return next(error);
        });
    }
});

module.exports = router
