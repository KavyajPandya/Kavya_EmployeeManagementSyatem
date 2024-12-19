import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const EmployeeSchema = new Schema ({
    id:{type: Number, index: true, required: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true, min: 20, max: 70  },
    doj: { type: String, required: true},
    title: { 
        type: String, 
        required: true,
        enum: ['Employee', 'Manager', 'Director', 'VP']
    },
    department: { 
        type: String, 
        required: true,
        enum: ['IT', 'Marketing', 'HR', 'Engineering']
    },
    employeeType: { 
        type: String, 
        required: true,
        enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'] 
    },
    currentStatus: { 
        type: String, 
        default: "1",
        enum:['0','1'] 
    }
},
{
    statics: {
        async getMaxId() {
        const employee = await this.findOne({}).sort({ id: -1 });
        return employee?.id || 0;
        }
    }
});
export const Employee = mongoose.model('Employee', EmployeeSchema);