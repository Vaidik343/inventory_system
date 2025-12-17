/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Supplier management
 */

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Create supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact_person
 *               - email
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Traders
 *               contact_person:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: abc@traders.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   country:
 *                     type: string
 *                   pin_code:
 *                     type: string
 *               payment_term:
 *                 type: string
 *                 enum: [paid, unpaid]
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier created
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of suppliers
 *       404:
 *         description: No suppliers found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Update supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Supplier updated
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Supplier deleted
 *       500:
 *         description: Internal server error
 */
