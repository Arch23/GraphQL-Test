import { User } from "../models/User";

const _ = {
    getUsers: (repository: User[], id:number|undefined) : User[] => {
        if(id === null || !id || id<0){
            return repository;
        }else{
            return repository
                .filter((user: User) => user.id == id);
        }
    },
    addUser: (repository: User[], newUser: User|null|undefined) : number => {
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
    updateUser: (repository: User[], edit: User) : number => {
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
    deleteUser: (repository: User[], deleteId: number): boolean => {
        const userToDeleteIndex = repository.findIndex((user:User) => user.id===deleteId);
        if(userToDeleteIndex<0){
            return false;
        }else{
            repository.splice(userToDeleteIndex, 1);
            return true;
        }
    }
}

export default _;