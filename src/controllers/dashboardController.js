const { Users, Products, Category, Sales, StockIn, SalesItems } = require("../models");

const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await Users.countDocuments({ isActive: true });
        const totalProducts = await Products.countDocuments({ isActive: true });
        const totalCategories = await Category.countDocuments({ isActive: true });
        
        const salesData = await Sales.aggregate([
            { $match: { status: "active" } },
            { $group: { _id: null, totalRevenue: { $sum: "$total" }, totalSales: { $sum: 1 } } }
        ]);

        const purchasesData = await StockIn.aggregate([
            { $match: { status: "received" } },
            { $group: { _id: null, totalCost: { $sum: "$total" }, totalPurchases: { $sum: 1 } } }
        ]);

        const lowStockProducts = await Products.find({ stock_qty: { $lt: 10 }, isActive: true })
            .select('name sku stock_qty sell_price')
            .limit(5);

        const recentSales = await Sales.find({ status: "active" })
            .sort({ soldAt: -1 })
            .limit(5)
            .populate('createdBy', 'email')
            .select('invoiceNumber total payment_status soldAt createdBy');

        res.status(200).json({
            totalUsers,
            totalProducts,
            totalCategories,
            salesData: salesData[0] || { totalRevenue: 0, totalSales: 0 },
            purchasesData: purchasesData[0] || { totalCost: 0, totalPurchases: 0 },
            lowStockProducts,
            recentSales
        });
    } catch (error) {
        console.error("🚀 ~ getDashboardStats ~ error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAnalytics = async (req, res) => {
    try {
        // Last 7 days sales trend
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const salesTrend = await Sales.aggregate([
            { 
                $match: { 
                    status: "active",
                    soldAt: { $gte: sevenDaysAgo }
                } 
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$soldAt" } },
                    dailyRevenue: { $sum: "$total" },
                    dailySales: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Top 5 selling products
        const topProducts = await SalesItems.aggregate([
            {
                $group: {
                    _id: "$productId",
                    totalQuantitySold: { $sum: "$quantity" },
                    totalRevenue: { $sum: "$total" }
                }
            },
            { $sort: { totalQuantitySold: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "products", // The collection name in MongoDB (Mongoose usually lowercases and pluralizes)
                    localField: "_id",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    _id: 1,
                    totalQuantitySold: 1,
                    totalRevenue: 1,
                    name: "$productInfo.name",
                    sku: "$productInfo.sku"
                }
            }
        ]);

        res.status(200).json({
            salesTrend,
            topProducts
        });
    } catch (error) {
        console.error("🚀 ~ getAnalytics ~ error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getDashboardStats,
    getAnalytics
};
