import employeeModel from "../models/employeeModel.js";

const createEmployee = async (req, res) => {
    const { name, email, phoneNo } = req.body;
    try {
        const newEmployee = new employeeModel({
            employeeName: name,
            employeeEmail: email,
            employeePhoneNo: phoneNo
        });
        const existingEmployee = await employeeModel.findOne({ employeeEmail: email });
        if (!existingEmployee) {
            await newEmployee.save();
            res.send({ message: "New employee created", newEmployee })
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

const getOneEmployeeById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await employeeModel.findOne({_id:id});
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({ message: "somehting went wrong" })
    }
}

const updateEmployee = async (req, res) => {
    const id = req.params.id;
    const { name, email, phoneNo } = req.body;
    try {
        const updatedEmployee = {
            employeeName: name,
            employeeEmail: email,
            employeePhoneNo: phoneNo
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

export {
    createEmployee,
    getEmployees,
    updateEmployee,
    deleteEmployee,
    getOneEmployeeById,
}