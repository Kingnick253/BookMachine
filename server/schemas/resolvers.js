const { signToken } = require("../utils.auth");
const { user } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parents, args, context) => {
            if(context.user) {
                const userData = user.findOne({_id: context.user._id})
                return userData;
            }
            throw new AuthenticationError('Need to be logged in');
        }
        
    }
};


module.exports = resolvers;