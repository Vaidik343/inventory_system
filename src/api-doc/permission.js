/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management
 */

/**
 * @swagger
 * /api/permission:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a new permission with resource and action.
 *       resource = what you are accessing (products, sales, purchases)
 *       action   = what you are doing (create, read, update, delete, cancel)
 *       Same resource+action combination cannot be created twice.
 *       Create all permissions first, then use their IDs when creating roles.
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
 *                 description: The resource being accessed
 *               action:
 *                 type: string
 *                 example: create
 *                 description: The action being performed
 *               description:
 *                 type: string
 *                 example: Can create products
 *                 description: Optional human readable description
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Use this ID when assigning to roles or users
 *                 resource:
 *                   type: string
 *                   example: products
 *                 action:
 *                   type: string
 *                   example: create
 *                 description:
 *                   type: string
 *                   example: Can create products
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: resource and action required / Duplicate resource+action
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permission:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Returns all permissions sorted by resource then action.
 *       Use returned IDs when creating or updating roles.
 *     responses:
 *       200:
 *         description: List of all permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   resource:
 *                     type: string
 *                     example: products
 *                   action:
 *                     type: string
 *                     example: create
 *                   description:
 *                     type: string
 *                     example: Can create products
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No permissions found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 resource:
 *                   type: string
 *                 action:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permission/{id}:
 *   put:
 *     summary: Update a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Updates resource, action, or description of an existing permission.
 *       Be careful — this permission may already be assigned to roles.
 *       Any role using this permission ID will automatically reflect the change.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resource:
 *                 type: string
 *                 example: products
 *               action:
 *                 type: string
 *                 example: update
 *               description:
 *                 type: string
 *                 example: Can update products
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 resource:
 *                   type: string
 *                 action:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Duplicate resource+action combination
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/permission/{id}:
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Permanently deletes a permission.
 *       Make sure no roles are using this permission before deleting.
 *       Deleting a permission that is assigned to roles will leave orphan IDs in those roles.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permission deleted successfully
 *                 deleted:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     resource:
 *                       type: string
 *                     action:
 *                       type: string
 *       404:
 *         description: Permission not found
 *       500:
 *         description: Internal server error
 */