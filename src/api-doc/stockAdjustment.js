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
 *     description: |
 *       Adjust stock manually (increase or decrease).
 *       This also creates a StockAdjustment log.
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
 *                 type: number
 *                 description: Positive or negative quantity
 *                 example: -5
 *               reason:
 *                 type: string
 *                 example: Damaged items
 *               referenceId:
 *                 type: string
 *                 example: MANUAL-001
 *               changedBy:
 *                 type: string
 *                 example: 64f12ab123456789abcd9999
 *     responses:
 *       201:
 *         description: Stock adjusted successfully
 *       400:
 *         description: Stock cannot be negative
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/stockAdjust:
 *   get:
 *     summary: Get stock adjustment history
 *     tags: [StockAdjustment]
 *     description: Returns all stock adjustment logs
 *     responses:
 *       200:
 *         description: List of stock adjustments
 *       500:
 *         description: Internal server error
 */
