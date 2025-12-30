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
 *       Creates a sale, validates stock, reduces product stock,
 *       creates sales items, and logs stock adjustments automatically.
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
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Invalid request or insufficient stock
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     description: Fetches all sales with their items
 *     responses:
 *       200:
 *         description: List of sales
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get sale by ID
 *     tags: [Sales]
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
 *     description: |
 *       Cancels an active sale, restores product stock,
 *       and logs stock adjustments automatically.
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
 *       400:
 *         description: Only active sales can be cancelled
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Internal server error
 */
