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
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a purchase entry, validates that all products belong
 *       to the selected supplier, updates product stock_qty automatically,
 *       and logs stock adjustments.
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
 *                 description: Tax amount (not percentage). Defaults to 0.
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
 *                       description: Must belong to the selected supplier
 *                     qty:
 *                       type: number
 *                       example: 10
 *                       description: Must be greater than 0
 *                     cost_price:
 *                       type: number
 *                       example: 500
 *                       description: Must be greater than 0
 *                     batch_No:
 *                       type: string
 *                       example: BATCH-2024-01
 *                     expiry:
 *                       type: string
 *                       format: date
 *                       example: 2026-12-31
 *                       description: Date format YYYY-MM-DD
 *     responses:
 *       201:
 *         description: Purchase created successfully, stock updated
 *       400:
 *         description: |
 *           Invalid supplier /
 *           Products not found /
 *           Products do not belong to this supplier /
 *           Invalid qty or cost_price
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/purchase:
 *   get:
 *     summary: Get all purchases
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
 *     description: Fetches all purchase records with supplier and product details
 *     responses:
 *       200:
 *         description: List of purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   supplierId:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                   sub_total:
 *                     type: number
 *                   total:
 *                     type: number
 *                   tax:
 *                     type: number
 *                   status:
 *                     type: string
 *                     enum: [pending, received, cancelled]
 *                   purchase_items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             sku:
 *                               type: string
 *                         qty:
 *                           type: number
 *                         cost_price:
 *                           type: number
 *                         batch_No:
 *                           type: string
 *                         expiry:
 *                           type: string
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/purchase/{id}:
 *   get:
 *     summary: Get purchase by ID
 *     tags: [Purchases]
 *     security:
 *       - bearerAuth: []
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