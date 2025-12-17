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
 *         application/json:
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
 *                 type: string
 *                 example: 64e9d3a1f9a123456789abcd
 *               supplierId:
 *                 type: string
 *                 example: 64e9d3a1f9a123456789efgh
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
 *               stock_qty:
 *                 type: number
 *                 example: 50
 *               image:
 *                 type: string
 *                 example: image-url.jpg
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Validation error (SKU / category / supplier)
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
 *     summary: Update product details (stock update not allowed)
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
 *               sku:
 *                 type: string
 *               description:
 *                 type: string
 *               sell_price:
 *                 type: number
 *               tax_rate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid update (stock or duplicate SKU)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/product/{id}:
 *   patch:
 *     summary: Soft delete a product
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
