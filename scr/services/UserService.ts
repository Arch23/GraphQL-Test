import { User } from "../models/User";

const _ = {
    getUsers: (id:number|undefined) : User[] => {
        if(id === null || !id || id<0){
            return repository;
        }else{
            return repository
                .filter((user: User) => user.id == id);
        }
    },
    addUser: (newUser: User|null|undefined) : number => {
        if(!newUser || newUser===null || newUser.lastName?.length===0){
            return -1;
        }

        const ids = repository.map((user:User) => user.id ? user.id : 0);
        let newId = 0;
        if(ids.length!=0){
            newId = Math.max(...ids);
        }

        newUser.id = ++newId;
        repository.push(newUser);
        return newUser.id;
    },
    updateUser: (edit: User) : number => {
        const userToUpdateIndex = repository.findIndex((user:User) => user.id===edit.id);
        if(userToUpdateIndex<0){
            return -1;
        }else{
            const userToUpdate = repository.at(userToUpdateIndex);
            if(!userToUpdate){
                return -1;
            }
            const {firstName,middleName,lastName,dob,phoneNumber} = edit;
            console.log(edit);
            if(firstName!=null && !!firstName){
                userToUpdate.firstName = firstName;
            }
            if(middleName!=null && !!middleName){
                userToUpdate.middleName = middleName;
            }
            if(lastName!=null && !!lastName){
                userToUpdate.lastName = lastName;
            }
            if(dob!=null && !!dob){
                userToUpdate.dob = dob;
            }
            if(phoneNumber!=null && !!phoneNumber){
                userToUpdate.phoneNumber = phoneNumber;
            }
            repository.splice(userToUpdateIndex,1);
            repository.push(userToUpdate);
            return userToUpdate.id ? userToUpdate.id : -1;
        }
    },
    deleteUser: (deleteId: number): boolean => {
        const userToDeleteIndex = repository.findIndex((user:User) => user.id===deleteId);
        if(userToDeleteIndex<0){
            return false;
        }else{
            repository.splice(userToDeleteIndex, 1);
            return true;
        }
    }
}

const repository: User[] = [];
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
_.addUser(u1);
_.addUser(u2);

export default _;