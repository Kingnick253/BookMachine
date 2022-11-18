const { signToken } = require("../utils.auth");
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = user.findOne({_id: context.user._id})
                return userData;
            }
            throw new AuthenticationError('Need to be logged in');
        }
    
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError("No user found with that email address");
            }
            const correctPassword = await user.isCorrectPassword(password);
            if(!correctPassword){
                throw new AuthenticationError("incorrect Password");
            }
            const token = signToken(user);
            return {token, user};
        },

    }
};


module.exports = resolvers;