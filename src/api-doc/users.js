/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User & permission management
 */

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a new user.
 *       Password is hashed automatically before saving.
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
*                 description: Role ID (e.g., "admin-role-id") or role name (e.g., "admin")
*                 example: "admin-role-id"
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
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Fetch all registered users
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
 *     description: |
 *       Updates user details.
 *       If password is provided, it will be re-hashed.
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
 *     description: |
 *       Soft deletes a user by setting isActive = false.
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

/**
 * @swagger
 * /api/user/{id}/permission/grant:
 *   post:
 *     summary: Grant extra permission to a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Adds an extra permission to a user
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
 *             required:
 *               - resource
 *               - action
 *             properties:
 *               resource:
 *                 type: string
 *                 example: product
 *               action:
 *                 type: string
 *                 example: create
 *     responses:
 *       200:
 *         description: Permission granted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
 
/**
 * @swagger
 * /api/user/{id}/permission/revoke:
 *   post:
 *     summary: Revoke permission from a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Revokes a permission by adding it to revokedPermissions
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
 *             required:
 *               - resource
 *               - action
 *             properties:
 *               resource:
 *                 type: string
 *                 example: sales
 *               action:
 *                 type: string
 *                 example: delete
 *     responses:
 *       200:
 *         description: Permission revoked successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/me/permissions:
 *   get:
 *     summary: Get my permissions
 *     tags: [Users]
 *     description: |
 *       Returns resolved permissions for the logged-in user
 *       including role, extra, and revoked permissions.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissions:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: array
 *                       items:
 *                         type: object
 *                     extra:
 *                       type: array
 *                       items:
 *                         type: object
 *                     revoked:
 *                       type: array
 *                       items:
 *                         type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
