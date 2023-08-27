import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { userType } from './user';
import UserService from '../services/UserService';

export const queryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        users: {
            type: new GraphQLList(userType),
            resolve: (_source) => UserService.getUsers(-1)
        },
        user: {
            type: userType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_source, {id}) => UserService.getUsers(id)[0]
        }
    })
});