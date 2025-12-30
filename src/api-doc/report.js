/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Reports & analytics
 */

/**
 * @swagger
 * /api/reports/sales-summary:
 *   get:
 *     summary: Sales summary report
 *     tags: [Reports]
 *     description: |
 *       Returns aggregated sales statistics including
 *       total orders, total revenue, refunded amount,
 *       and average order value.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Sales summary data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: number
 *                   example: 25
 *                 totalRevenue:
 *                   type: number
 *                   example: 15000
 *                 totalRefunded:
 *                   type: number
 *                   example: 1200
 *                 avgOrderValue:
 *                   type: number
 *                   example: 600
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/profit:
 *   get:
 *     summary: Profit report
 *     tags: [Reports]
 *     description: |
 *       Calculates total revenue, total cost,
 *       and profit from active sales.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profit report generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalRevenue:
 *                   type: number
 *                   example: 20000
 *                 totalCost:
 *                   type: number
 *                   example: 14000
 *                 profit:
 *                   type: number
 *                   example: 6000
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/reports/stock-movements:
 *   get:
 *     summary: Stock movement audit report
 *     tags: [Reports]
 *     description: |
 *       Returns stock adjustment history with optional filters
 *       like product, reason, and date range.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: productId
 *         schema:
 *           type: string
 *         description: Filter by product ID
 *       - in: query
 *         name: reason
 *         schema:
 *           type: string
 *           example: Sale
 *         description: Filter by adjustment reason
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date
 *     responses:
 *       200:
 *         description: Stock movement report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 10
 *                 movements:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: iPhone 14
 *                           sku:
 *                             type: string
 *                             example: IP14-128
 *                       change:
 *                         type: number
 *                         example: -5
 *                       reason:
 *                         type: string
 *                         example: Sale
 *                       changedBy:
 *                         type: object
 *                         properties:
 *                           email:
 *                             type: string
 *                             example: admin@email.com
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
