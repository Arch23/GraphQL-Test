# GraphQL-Test
Test repository for a basic implementation of a GraphQL API using Nodejs

## Example Queries

Query all users and get only their first name
```
query {
    users {
        firstName
    }
}
```

Query all users and get all users and properties
```
query {
    users {
        lastName
        middleName
        firstName
        dob
        phoneNumber
        dob
    }
}
```

Get all properties of the User type
```
{
   __type(name:"User") {
      fields {
         name
         description
      }  
   }
}
```

## Example mutation

Mutation to create a new user and get the Id and lastName of the newly created user
```
mutation {
    createUser (newUser: {
        lastName: "TestName2", firstName: "FirstName2", dob: "2000-02-23"
    }) {
        id
        lastName
    }
}
```