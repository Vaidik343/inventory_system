/**
 * @swagger
 * tags:
 *   name: StockAdjustment
 *   description: Manual stock adjustment & stock movement log
 */

/**
 * @swagger
 * /api/stockAdjust:
 *   post:
 *     summary: Manually adjust product stock
 *     tags: [StockAdjustment]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Adjust stock manually for reasons like damage, loss, or correction.
 *       Use positive number to increase stock, negative to decrease.
 *       Stock cannot go below 0. Changes cannot be zero.
 *       changedBy is automatically set from logged in user.
 *       Runs inside a transaction — product update and log are atomic.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - changes
 *               - reason
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f12ab123456789abcd0001
 *               changes:
 *                 type: integer
 *                 description: |
 *                   Positive to add stock, negative to remove.
 *                   Cannot be zero.
 *                 example: -5
 *               reason:
 *                 type: string
 *                 example: Damaged items
 *               referenceId:
 *                 type: string
 *                 description: Optional reference ID (e.g. damage report number)
 *                 example: DMG-2024-001
 *     responses:
 *       201:
 *         description: Stock adjusted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 productId:
 *                   type: string
 *                   description: Product ID
 *                 changes:
 *                   type: number
 *                 reason:
 *                   type: string
 *                 referenceId:
 *                   type: string
 *                 changedBy:
 *                   type: string
 *                   description: Auto set from logged in user
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Stock cannot go negative / Changes cannot be zero / Changes is required
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/stockAdjust:
 *   get:
 *     summary: Get all stock adjustment logs
 *     tags: [StockAdjustment]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all stock adjustment logs sorted by latest first.
 *       Includes manual adjustments, sale deductions, and purchase additions.
 *       productId and changedBy are populated with details.
 *     responses:
 *       200:
 *         description: List of stock adjustments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   productId:
 *                     type: object
 *                     description: Populated product details
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                         example: Round Neck T-Shirt
 *                       sku:
 *                         type: string
 *                         example: TSHRT-RN-001
 *                   changes:
 *                     type: number
 *                     example: -5
 *                   reason:
 *                     type: string
 *                     example: Damaged items
 *                   referenceId:
 *                     type: string
 *                     example: DMG-2024-001
 *                   changedBy:
 *                     type: object
 *                     description: Populated user details
 *                     properties:
 *                       _id:
 *                         type: string
 *                       email:
 *                         type: string
 *                         example: admin@example.com
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */