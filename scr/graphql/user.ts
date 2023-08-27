import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInputObjectType } from 'graphql';

export const userType = new GraphQLObjectType({
    name: "User",
    description: "Output object for User model",
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        firstName: {
            type: GraphQLString
        },
        middleName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        dob: {
            type: GraphQLString
        },
    })
});

export const userInputType = new GraphQLInputObjectType({
    name: "UserInput",
    description: "Input object for User model",
    fields: () => ({
        lastName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        firstName: {
            type: GraphQLString
        },
        middleName: {
            type: GraphQLString
        },
        phoneNumber: {
            type: GraphQLString
        },
        dob: {
            type: GraphQLString
        },
    })
});