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
 *       Creates a new user. Password is hashed automatically before saving.
 *       Extra and revoked permissions are managed via specific endpoints 
 *       and stored directly on the user.
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
 *                 description: Role ID referencing the Roles collection
 *                 example: 64e9d3a1f9a123456789abcd
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword@123
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 example: true
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
 *     security:
 *       - bearerAuth: []
 *     description: Fetch all registered users
 *     responses:
 *       200:
 *         description: List of users
 *       404:
 *         description: No users found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates user details.
 *       If password is provided it will be re-hashed automatically.
 *       To manage permissions use the grant/revoke endpoints instead.
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
 *                 description: Role ID
 *                 example: 64e9d3a1f9a123456789abcd
 *               email:
 *                 type: string
 *                 example: staff@example.com
 *               password:
 *                 type: string
 *                 example: NewPassword@123
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Soft delete user (Deactivate)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Soft deletes a user by setting isActive to false
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
 *       404:
 *         description: User not found
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
 *     description: |
 *       Grants a permission to a user.
 *       Permissions granted here override role-level restrictions.
 *       Stored in the user's extraPermissions array.
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
 *                 example: products
 *               action:
 *                 type: string
 *                 example: create
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 description: Optional expiry for temporary permission
 *                 example: 2025-12-31T00:00:00.000Z
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
 *     description: |
 *       Revokes a permission from a user.
 *       Stored in the user's revokedPermissions array.
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
 *                 example: products
 *               action:
 *                 type: string
 *                 example: create
 *     responses:
 *       200:
 *         description: Permission revoked successfully
 *       404:
 *         description: User not found or permission not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/me/permissions:
 *   get:
 *     summary: Get my resolved permissions
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns the fully resolved permissions for the logged-in user.
 *       Combines role permissions with individually granted or revoked permissions.
 *     responses:
 *       200:
 *         description: Resolved user permissions
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
 *                         $ref: '#/components/schemas/Permission'
 *                     extra:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Permission'
 *                     revoked:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Permission'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */