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
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a new role with optional permissions.
 *       Permissions must be valid Permission IDs from the Permission collection.
 *       Create permissions first via POST /api/permission, then use their IDs here.
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
 *                 example: manager
 *               permissions:
 *                 type: array
 *                 description: Array of Permission IDs (not resource/action objects)
 *                 items:
 *                   type: string
 *                   example: 64e9d3a1f9a123456789abcd
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                   example: manager
 *                 permissions:
 *                   type: array
 *                   description: Populated permission objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       resource:
 *                         type: string
 *                         example: products
 *                       action:
 *                         type: string
 *                         example: create
 *                       description:
 *                         type: string
 *                         example: Can create products
 *       400:
 *         description: Role name already exists / One or more invalid permission IDs
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all roles with their permissions fully populated.
 *       Each permission shows resource, action and description.
 *     responses:
 *       200:
 *         description: List of roles with populated permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                     example: manager
 *                   permissions:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         resource:
 *                           type: string
 *                           example: products
 *                         action:
 *                           type: string
 *                           example: create
 *                         description:
 *                           type: string
 *                           example: Can create products
 *       404:
 *         description: No roles found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role name or permissions
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Update role name or replace permissions array.
 *       Permissions must be valid Permission IDs.
 *       Sending empty permissions array [] will clear all permissions from role.
 *       All users with this role get updated permissions automatically.
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
 *                 example: senior-manager
 *               permissions:
 *                 type: array
 *                 description: |
 *                   Array of Permission IDs.
 *                   This REPLACES the entire permissions array.
 *                   Send [] to clear all permissions.
 *                 items:
 *                   type: string
 *                   example: 64e9d3a1f9a123456789abcd
 *     responses:
 *       200:
 *         description: Role updated successfully with populated permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       resource:
 *                         type: string
 *                       action:
 *                         type: string
 *                       description:
 *                         type: string
 *       400:
 *         description: One or more invalid permission IDs
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Permanently deletes a role.
 *       Make sure no users are assigned this role before deleting.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */