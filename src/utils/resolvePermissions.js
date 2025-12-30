module.exports = (user) => {
  const now = new Date();

  const rolePerms = user.role?.permissions || [];
  const extraPerms = (user.extraPermissions || []).filter(
    (p) => !p.expiresAt || p.expiresAt > now
  );
  const revokedPerms = user.revokedPermissions || [];

  const match = (p, perm) => {
    if (p === "*") return true;

    if (p.resource === "*" && p.action === "*") return true;
    if (p.resource === perm.resource && p.action === "*") return true;
    if (p.resource === "*" && p.action === perm.action) return true;

    return p.resource === perm.resource && p.action === perm.action;
  };

  const has = (list, perm) =>
    list.some((p) => match(p, perm));

  return {
    can(resource, action) {
      const perm = { resource, action };

      if (has(revokedPerms, perm)) return false;
      if (has(extraPerms, perm)) return true;
      if (has(rolePerms, perm)) return true;

      return false;
    },
  };
};
