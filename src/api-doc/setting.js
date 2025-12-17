/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: Application & company settings
 */

/**
 * @swagger
 * /api/setting:
 *   post:
 *     summary: Create application settings
 *     tags: [Settings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *                 example: My Inventory Store
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: MG Road
 *                   city:
 *                     type: string
 *                     example: Bangalore
 *                   country:
 *                     type: string
 *                     example: India
 *                   pin_code:
 *                     type: string
 *                     example: 560001
 *               invoice_prefix:
 *                 type: string
 *                 example: INV
 *               tax_rates:
 *                 type: string
 *                 example: 18%
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       201:
 *         description: Settings created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/setting:
 *   get:
 *     summary: Get application settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Settings fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/setting/{id}:
 *   put:
 *     summary: Update application settings
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Setting ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               companyName:
 *                 type: string
 *               address:
 *                 type: object
 *               invoice_prefix:
 *                 type: string
 *               tax_rates:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       404:
 *         description: Settings not found
 *       500:
 *         description: Internal server error
 */
