/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: User role management
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: admin
 *     responses:
 *       201:
 *         description: Role created successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role name
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: manager
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64e9d3a1f9a123456789abcd
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       500:
 *         description: Internal server error
 */
