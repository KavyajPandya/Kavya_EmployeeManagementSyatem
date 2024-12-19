import express from 'express';
import {ApolloServer} from "apollo-server-express";
import {} from './models/db.js';
import {Employee} from './models/schema.js';

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { resolvers } from "./graphql/resolvers/resolvers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
// const typeDefs = `

//     type Query {
//         hello: String
//         getEmployee(employeeType: EmployeeType): [Employee!]!
//         getEmployeeById(id: Int!): Employee
//     }
        
//     enum EmployeeType {
//         FullTime
//         PartTime
//         Contract
//         Seasonal
//     }
    
//     input UpdateEmployee {
//         title: String
//         department: String
//         currentStatus: String
//     }

//     type Employee {
//         id:Int! ,
//         firstName: String!
//         lastName: String!
//         age: String!
//         doj: String!
//         title: String!
//         department: String!
//         employeeType: EmployeeType!
//         currentStatus: String!
//     }

//     input InputEmployee {
//         id:Int! ,
//         firstName: String!
//         lastName: String!
//         age: String!
//         doj: String!
//         title: String!
//         department: String!
//         employeeType: EmployeeType!
//         currentStatus: String!
//     }

//     type Mutation {
//       addEmployee(employee:InputEmployee!):Employee!
//       deleteEmployee(id:Int!):Employee
//       editEmployee(id: Int!, employee: UpdateEmployee!): Employee
//     }
//     `
// const resolvers = {
//     Query:{
//         hello: () => 'Hello World',
//         getEmployee: async (_, {employeeType}) => {
//             if (!employeeType) {
//                 console.log("getting all employees");
//                 const employee = await Employee.find({});
//                 return employee
//               }
//               console.log("getting employees of type: ", employeeType)
//               const employee = await Employee.find({ employeeType });
//               return employee            
//         } ,   
//         getEmployeeById: async (_, { id }) => {
//             const employee = await Employee.findOne({ id });
//             return employee;
//         }  
//     },
//     Mutation: {
//         addEmployee: async (_, { employee }) => {
//           console.log("Mutation: Adding employee", employee)    
//           if (employee.id < 0) {
//             employee.id = await Employee.getMaxId() + 1
//           }          
//           Employee.create(employee);
//           return employee
//         },
//         deleteEmployee: async (_, { id }) => {
//             console.log("Mutation: Deleting issue...", id)
//             const employee = await Employee.findOneAndDelete({ id });
//             return employee
//         },
//         editEmployee: async (_, { id, employee }) => {
//             console.log("Mutation: Editing employee...", id);
//             const updatedEmployee = await Employee.findOneAndUpdate({ id }, employee, { new: true });
//             return updatedEmployee
//         },
        
//     }
// };

// const server = new ApolloServer({typeDefs, resolvers});
// server.start().then(function () {
//     server.applyMiddleware({app, path:"/graphql", cors: true });
// });

const typeDefs = fs.readFileSync(
    path.join(__dirname, "graphql/schema/schema.graphql"),
    "utf-8",
  );

const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(function () {
server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is runningon port ${PORT}`);
})
