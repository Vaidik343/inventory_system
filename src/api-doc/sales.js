/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sales & Orders management
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a sale, validates stock availability, reduces product stock_qty,
 *       creates sales items, and logs stock adjustments automatically.
 *       Cancelled sales cannot be created directly — use cancel endpoint.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               payment_status:
 *                 type: string
 *                 enum: [pending, paid, failed, refunded]
 *                 default: pending
 *                 example: pending
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                     - sell_price
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 64f12ab123456789abcd0001
 *                     quantity:
 *                       type: number
 *                       example: 2
 *                     sell_price:
 *                       type: number
 *                       example: 1200
 *                     discount:
 *                       type: number
 *                       example: 100
 *                       description: Discount amount (not percentage). Defaults to 0.
 *                     tax:
 *                       type: number
 *                       example: 18
 *                       description: Tax percentage applied to item subtotal. Defaults to 0.
 *     responses:
 *       201:
 *         description: Sale created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 invoiceNumber:
 *                   type: string
 *                   example: INV-1718200000000
 *                 subtotal:
 *                   type: number
 *                 total:
 *                   type: number
 *                 payment_status:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: active
 *                 sales_items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           sku:
 *                             type: string
 *                       quantity:
 *                         type: number
 *                       sell_price:
 *                         type: number
 *                       discount:
 *                         type: number
 *                       tax:
 *                         type: number
 *                       total:
 *                         type: number
 *       400:
 *         description: Insufficient stock / Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches all sales with their items sorted by latest first
 *     responses:
 *       200:
 *         description: List of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sales:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       invoiceNumber:
 *                         type: string
 *                       subtotal:
 *                         type: number
 *                       total:
 *                         type: number
 *                       payment_status:
 *                         type: string
 *                         enum: [pending, paid, failed, refunded]
 *                       status:
 *                         type: string
 *                         enum: [active, cancelled]
 *                       sales_items:
 *                         type: array
 *                         items:
 *                           type: object
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Sale details
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sales/{id}/cancel:
 *   patch:
 *     summary: Cancel a sale and rollback stock
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Cancels an active sale, restores product stock_qty for each item,
 *       logs stock adjustments, and sets payment_status to refunded.
 *       Only active sales can be cancelled.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale ID
 *     responses:
 *       200:
 *         description: Sale cancelled and stock restored
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sale cancelled successfully
 *                 sale:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                       example: cancelled
 *                     payment_status:
 *                       type: string
 *                       example: refunded
 *       400:
 *         description: Only active sales can be cancelled / Sale not found
 *       500:
 *         description: Internal server error
 */