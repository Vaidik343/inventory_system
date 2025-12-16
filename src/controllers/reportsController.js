const {Sales} = require("../models");

const salesSummaryReport = async (req, res) => {
    try {
        const {startDate, endDate} = req.query;

        const matchStage = {
            status: "active",
        };

        if(startDate || endDate)
        {
            matchStage.soldAt = {};
            if(startDate) matchStage.soldAt.$gte = new Date(startDate);
            if(endDate) matchStage.soldAt.$lte = new Date(endDate);
        }

        const report = await Sales.aggregate([
            {$match: matchStage},
            {
                $group: {
                    _id: null,
                    totalOrders: {$sum: 1},

                    totalRevenue: {
                        $sum: {
                            $cond: [
                                { $eq: ["$payment_status", "paid"]},
                                "$total",
                                0,
                            ],
                        },
                    },

                    totalRefunded: {
                        $sum: {
                            $cond: [
                                { $eq: ["$payment_status", "refunded"]},
                                "$total",
                                0,
                            ],
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalOrders: 1,
                    totalRevenue: 1,
                    totalRefunded: 1,
                    avgOrderValue: {
                        $cond: [
                            {
                                $eq: ["$totalOrder", 0]
                            },
                            0,
                            {$divide:["$totalRevenue", "$totalOrders"]},
                        ],
                    }
                }

            }
        ]);

        res.status(200).json(report[0] || {
            totalOrders: 0,
            totalRevenue: 0,
            totalRefunded: 0,
            avgOrderValue: 0

        });
    } catch (error) {
        console.log("🚀 ~ salesSummaryReport ~ error:", error)
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = {salesSummaryReport}