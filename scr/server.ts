import  express  from "express";
import { Router, Request, Response } from "express";
import { User } from "./models/User";
import UserService from "./services/UserService";
import { GraphQLSchema } from 'graphql';
import { createHandler } from "graphql-http/lib/use/express";
import { queryType, userType, mutationType } from "./graphql";

const app = express();
const route = Router();

app.use(express.json());

const schema: GraphQLSchema = new GraphQLSchema({
    query: queryType,
    types: [userType],
    mutation: mutationType
});

app.all("/graphql", createHandler({schema}));

route.get('/', (req: Request, res: Response) => {
    res.json({message: 'hello world with Typescript'});
});

route.get('/user', (req: Request, res: Response) => {
    res.json(UserService.getUsers(-1));
});

route.get('/user/:id', (req: Request<{id:number}>, res: Response) => {
    const search = new User();
    search.id = req.params.id;
    res.json(UserService.getUsers(-1));
});

route.post('/user', (req: Request, res: Response) => {
    const postedUser:User = req.body;
    if(UserService.addUser(postedUser)>0){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

route.put('/user',  (req: Request, res: Response) => {
    const postedUser:User = req.body;
    if(UserService.updateUser(postedUser)>0){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

route.delete('/user/:id', (req: Request<{id:number}>, res: Response) => {
    if(UserService.deleteUser(req.params.id)){
        res.status(201).send();
    }else{
        res.status(400).send();
    }
});

app.use(route);

app.listen(3333, () => 'server running on port 3333');