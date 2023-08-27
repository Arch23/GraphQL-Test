import { GraphQLObjectType } from 'graphql';
import { userInputType, userType } from './user';
import UserService from '../services/UserService';

export const mutationType = new GraphQLObjectType({
    name: "mutation",
    fields: () => ({
        createUser: {
            type: userType,
            args: {
                newUser: {
                    type: userInputType
                }
            },
            resolve: (_source, {newUser}) => {
                const createdId = UserService.addUser(newUser);

                if(createdId>0){
                    return UserService.getUsers(createdId)[0];
                }else{
                    throw new Error("could not create the new user");
                }
            }
        }
    })
});