/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - email
 *               - password
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword@123
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               last_login:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: User created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *       404:
 *         description: Users not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: staff
 *               email:
 *                 type: string
 *                 example: staff@example.com
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *               isActive:
 *                 type: boolean
 *                 example: true
 *               last_login:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: User updated successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   patch:
 *     summary: Soft delete user (Deactivate)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       500:
 *         description: Internal server error
 */
