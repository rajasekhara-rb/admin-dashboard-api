import paymentsModel from "../models/paymentsModel.js";

const createPayment = async (req, res) => {
    const { projectId, date, amount } = req.body;
    const id = req.id;
    try {
        const newPayments = new paymentsModel({
            projectId: projectId,
            date: date,
            amount: amount,
        });
        const result = await newPayments.save();
        res.send({ message: "Payments saved successfully", paymentDetails: result })
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

const getPayments = async (req, res) => {
    try {
        const result = await paymentsModel.find({});
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

const getPaymentsById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await paymentsModel.findOne({ _id: id });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

const getPaymentsOfProjectByMonth = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await paymentsModel.aggregate([
            { $match: { projectId: id } },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                        // day: { $dayOfMonth: "$date" }
                    },
                    amount: { $sum: "$amount" }
                }
            }
        ])
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }

}

const getPaymentsOfProjectByYear = async (req, res) => {
    const projectId = req.params.id

    try {
        const result = await paymentsModel.aggregate([
            { $match: { projectId: projectId } },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" }
                    },
                    amount: { $sum: "$amount" }
                }
            }
        ])
        res.send(result)
    } catch (error) {
        console.log(error);
        res.send({ message: "Something went wrong" })
    }
}

export {
    createPayment,
    getPayments,
    getPaymentsById,
    getPaymentsOfProjectByMonth,
    getPaymentsOfProjectByYear,
}