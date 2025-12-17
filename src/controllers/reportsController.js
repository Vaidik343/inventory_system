const {Sales, SalesItems, Products,PurchaseItems, StockAdjustment} = require("../models");


//sales - report
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


//profit - report

// need few change work on later

const profileReport = async (req, res) => {
    try {
        // only active sales
        const sales = await Sales.find({ status: "active"})
        .populate({
            path:"sales_items",
            populate: {
                path: "productId",
                select: "name cost"
            }
        });

        let totalRevenue = 0;
        let totalCost = 0;

        for (const sale of sales)
        {
            for (const item of sale.sales_items)
            {
                const quantity = Number(item.quantity);
                const sellPrice = Number(item.sell_price);
                const discount = Number(item.discount || 0);
                const costPrice = Number(item.productId.cost || 0);

                totalRevenue += (sellPrice * quantity) - discount;
                totalCost += costPrice * quantity;
            }
        }

        const profit = totalRevenue - totalCost;


        res.status(200).json({
            totalRevenue,
            totalCost,
            profit
        });
        
    } catch (error) {
        console.log("🚀 ~ profileReport ~ error:", error)
        res.status(500).json({ message: "Internal server error" });
    }

}

//Stock Movement Audit Report

const stockMovementReport = async (req, res) => {
    try {
        const {productId, reason, from, to} = req.query;

        const filter = {};

        if(productId) filter.productId = productId;
        if(reason) filter.reason = reason;

        if(from || to)
        {
        filter.createdAt = {};
        if(from) filter.createdAt.$gte = new Date(from);
        if(to) filter.createdAt.$lte = new Date(to);
        }

        const movements = await StockAdjustment.find(filter)
         .populate("productId", "name sku")
         .populate("changedBy", "email")
         .sort({createdAt: -1});

        res.status(200).json({
            count: movements.length,
            movements
        });

    } catch (error) {
        console.log("🚀 ~ stockMovementReport ~ error:", error)
         res.status(500).json({ message: "Internal server error" });
        
    } 

}
module.exports.reportController = {salesSummaryReport , profileReport ,stockMovementReport}