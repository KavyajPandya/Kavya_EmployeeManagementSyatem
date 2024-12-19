import { } from "../../models/db.js";
import { Employee } from "../../models/schema.js";
export const resolvers = {
    Query:{
        hello: () => 'Hello World',
        getEmployee: async (_, {employeeType}) => {
            if (!employeeType) {
                console.log("getting all employees");
                const employee = await Employee.find({});
                return employee
              }
              console.log("getting employees of type: ", employeeType)
              const employee = await Employee.find({ employeeType });
              return employee            
        } ,   
        getEmployeeById: async (_, { id }) => {
            const employee = await Employee.findOne({ id });
            return employee;
        }  
    },
    Mutation: {
        addEmployee: async (_, { employee }) => {
          console.log("Mutation: Adding employee", employee)    
          if (employee.id < 0) {
            employee.id = await Employee.getMaxId() + 1
          }          
          Employee.create(employee);
          return employee
        },
        deleteEmployee: async (_, { id }) => {
            console.log("Mutation: Deleting issue...", id)
            const employee = await Employee.findOneAndDelete({ id });
            return employee
        },
        editEmployee: async (_, { id, employee }) => {
            console.log("Mutation: Editing employee...", id);
            const updatedEmployee = await Employee.findOneAndUpdate({ id }, employee, { new: true });
            return updatedEmployee
        },        
    }
};
