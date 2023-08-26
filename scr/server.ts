import  express  from "express";
import { Router, Request, Response } from "express";
import { User } from "./models/User";
import UserService from "./services/UserService";
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList, GraphQLInputObjectType } from 'graphql';
import { createHandler } from "graphql-http/lib/use/express";

const app = express();
const route = Router();

app.use(express.json());

const userType = new GraphQLObjectType({
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

const userInputType = new GraphQLInputObjectType({
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

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        users: {
            type: new GraphQLList(userType),
            resolve: (_source) => UserService.getUsers(users, -1)
        },
        user: {
            type: userType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve: (_source, {id}) => UserService.getUsers(users, id)[0]
        }
    })
});
const mutationType = new GraphQLObjectType({
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
                const createdId = UserService.addUser(users, newUser);

                if(createdId>0){
                    return UserService.getUsers(users, createdId)[0];
                }else{
                    throw new Error("could not create the new user");
                }
            }
        }
    })
});

const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    types: [userType],
    mutation: mutationType
});

app.all("/graphql", createHandler({schema}));

const users: User[] = [];
const u1 = new User();
u1.firstName = "f1";
u1.middleName = "m1";
u1.lastName = "l1";
u1.dob = new Date("1999-01-01");
u1.phoneNumber = "9999-9999";
const u2 = new User();
u2.firstName = "f2";
u2.middleName = "m2";
u2.lastName = "l2";
u2.dob = new Date("1999-02-01");
u2.phoneNumber = "9999-9999";
UserService.addUser(users, u1);
UserService.addUser(users, u2);

route.get('/', (req: Request, res: Response) => {
    res.json({message: 'hello world with Typescript'});
});

route.get('/user', (req: Request, res: Response) => {
    res.json(UserService.getUsers(users,-1));
});

route.get('/user/:id', (req: Request<{id:number}>, res: Response) => {
    const search = new User();
    search.id = req.params.id;
    res.json(UserService.getUsers(users,-1));
});

route.post('/user', (req: Request, res: Response) => {
    const postedUser:User = req.body;
    if(UserService.addUser(users, postedUser)>0){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

route.put('/user',  (req: Request, res: Response) => {
    const postedUser:User = req.body;
    if(UserService.updateUser(users, postedUser)>0){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

route.delete('/user/:id', (req: Request<{id:number}>, res: Response) => {
    if(UserService.deleteUser(users, req.params.id)){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

app.use(route);

app.listen(3333, () => 'server running on port 3333');