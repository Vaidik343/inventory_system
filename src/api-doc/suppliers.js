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
 *     security:
 *       - bearerAuth: []
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
 *                     example: 123 Main St
 *                   city:
 *                     type: string
 *                     example: Mumbai
 *                   country:
 *                     type: string
 *                     example: India
 *                   pin_code:
 *                     type: string
 *                     example: "400001"
 *               payment_term:
 *                 type: string
 *                 enum: [paid, unpaid]
 *                 default: unpaid
 *                 example: unpaid
 *               note:
 *                 type: string
 *                 example: Preferred supplier for electronics
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Traders Updated
 *               contact_person:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: updated@traders.com
 *               phone:
 *                 type: string
 *                 example: "9876543211"
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
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Delete supplier
 *     tags: [Suppliers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */