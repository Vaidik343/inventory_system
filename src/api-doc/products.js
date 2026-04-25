/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - sku
 *               - categoryId
 *               - supplierId
 *               - unit
 *               - cost
 *               - sell_price
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               sku:
 *                 type: string
 *                 example: IPH15-BLK
 *               description:
 *                 type: string
 *                 example: Latest Apple iPhone
 *               categoryId:
 *                 type: array        
 *                 items:
 *                   type: string
 *                 example: ["64e9d3a1f9a123456789abcd"]
 *               supplierId:
 *                 type: array        
 *                 items:
 *                   type: string
 *                 example: ["64e9d3a1f9a123456789efgh"]
 *               unit:
 *                 type: string
 *                 example: pcs
 *               cost:
 *                 type: number
 *                 example: 60000
 *               sell_price:
 *                 type: number
 *                 example: 75000
 *               tax_rate:
 *                 type: number
 *                 example: 18
 *                 description: Optional, defaults to 0
 *               stock_qty:
 *                 type: number
 *                 example: 0
 *                 description: Optional, defaults to 0. Cannot be updated directly later.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: SKU already exists / Invalid category IDs / Invalid supplier IDs
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update product details (stock_qty update not allowed)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               sku:
 *                 type: string
 *                 example: IPH15-PRO
 *               description:
 *                 type: string
 *                 example: Updated iPhone description
 *               supplierId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64e9d3a1f9a123456789efgh"]
 *                 description: Must be valid existing supplier IDs
 *               sell_price:
 *                 type: number
 *                 example: 80000
 *               tax_rate:
 *                 type: number
 *                 example: 18
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Stock update not allowed / Duplicate SKU / Invalid supplier IDs
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Soft delete (deactivate) a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deactivated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */