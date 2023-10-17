const { User } = require("../models")

module.exports = {
    Query: {
        User: async  (parent, args, context ) =>{
            return await User.findOne({
                $or: [{ _id: user ? user._id : args.id }, { username: params.username }],
            });
        }
    }, 


    Mutation:{
        addUser: () =>  {



        }

    }
}