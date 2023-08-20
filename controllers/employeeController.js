import employeeModel from "../models/employeeModel.js";

const createEmployee = async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const newEmployee = new employeeModel({
            employeeName: name,
            employeeEmail: email,
            employeePhoneNo: phone,
            assigned: false
        });
        const existingEmployee = await employeeModel.findOne({ employeeEmail: email });
        if (!existingEmployee) {
            await newEmployee.save().then((employee) => {
                res.send({ message: "New employee created", employee })
            })
        } else {
            res.send({ message: "Employee already exists" })

        }
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

const getEmployees = async (req, res) => {
    try {
        const result = await employeeModel.find({});
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

const getEmployeesByProjectId = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const result = await employeeModel.find({ assignedProject: projectId })
        res.send(result)

    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}


const getOneEmployeeById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await employeeModel.findOne({ _id: id });
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    try {
        const updatedEmployee = {
            employeeName: name,
            employeeEmail: email,
            employeePhoneNo: phone
        }

        await employeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true });
        res.send({ message: "Employee details updated successfully" })
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        await employeeModel.deleteOne({ _id: id });
        res.send({ message: "Employee deleted" });
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

const getUnassignedEmployees = async (req, res) => {
    try {
        const result = await employeeModel.findOne({ assigned: false })
            .then((emp) => {
                res.send(emp)
            }).catch((error) => { res.send(error) })
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

export {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    getOneEmployeeById,
    getEmployeesByProjectId,
    getUnassignedEmployees,
}