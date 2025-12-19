/**
 * @swagger
 * tags:
 *   name: Purchases
 *   description: Stock In / Purchase management
 */

/**
 * @swagger
 * /api/purchase:
 *   post:
 *     summary: Create a new purchase (Stock In)
 *     tags: [Purchases]
 *     description: |
 *       Creates a purchase entry, stores purchase items, updates product stock,
 *       and logs stock adjustments automatically.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - supplierId
 *               - items
 *             properties:
 *               supplierId:
 *                 type: string
 *                 example: 64e9d3a1f9a123456789abcd
 *               tax:
 *                 type: number
 *                 example: 180
 *               invoice_file_path:
 *                 type: string
 *                 example: invoices/inv-1001.pdf
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - qty
 *                     - cost_price
 *                     - batch_No
 *                     - expiry
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 64e9d3a1f9a123456789efgh
 *                     qty:
 *                       type: number
 *                       example: 10
 *                     cost_price:
 *                       type: number
 *                       example: 500
 *                     batch_No:
 *                       type: string
 *                       example: BATCH-2024-01
 *                     expiry:
 *                       type: string
 *                       example: 2026-12-31
 *     responses:
 *       201:
 *         description: Purchase created successfully
 *       400:
 *         description: Invalid supplier or missing items
 *       404:
 *         description: Invalid product ID
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/purchase:
 *   get:
 *     summary: Get all purchases
 *     tags: [Purchases]
 *     description: Fetches all purchase records with supplier and item details
 *     responses:
 *       200:
 *         description: List of purchases
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/purchase/{id}:
 *   get:
 *     summary: Get purchase by ID
 *     tags: [Purchases]
 *     parameters: 
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Purchase ID
 *     responses:
 *       200:
 *         description: Purchase details
 *       404:
 *         description: Purchase not found
 *       500:
 *         description: Internal server error
 */
