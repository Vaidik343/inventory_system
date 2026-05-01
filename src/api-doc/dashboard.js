/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard and Analytics APIs
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
 *                 totalCategories:
 *                   type: integer
 *                 salesData:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                     totalSales:
 *                       type: integer
 *                 purchasesData:
 *                   type: object
 *                   properties:
 *                     totalCost:
 *                       type: number
 *                     totalPurchases:
 *                       type: integer
 *                 lowStockProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                 recentSales:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/dashboard/analytics:
 *   get:
 *     summary: Get dashboard analytics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 salesTrend:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       dailyRevenue:
 *                         type: number
 *                       dailySales:
 *                         type: integer
 *                 topProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       totalQuantitySold:
 *                         type: number
 *                       totalRevenue:
 *                         type: number
 *                       name:
 *                         type: string
 *                       sku:
 *                         type: string
 *       500:
 *         description: Internal server error
 */
