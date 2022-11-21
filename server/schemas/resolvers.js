const { signToken } = require("../utils/auth");
const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = User.findOne({_id: context.user._id})
                return userData;
            }
            throw new AuthenticationError('Need to be logged in');
        }
    
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return {token, user};
        },

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

        
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$push: {savedBooks: book}},
                    {new: true, runValidator: true}
                );
                return updateUser;
            }
            throw new AuthenticationError("Need to be logged in to do this");
        },
        removeBook: async (parent, {bookId}, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: { bookId: bookId }}},
                    {new: true}
                );
                    return updateUser;
            }
            throw new AuthenticationError("Need to be logged in to do this");
        }
    }
};


module.exports = resolvers;