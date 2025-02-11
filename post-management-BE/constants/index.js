const ROLE_PERMISSIONS = {
   superadmin: {
      posts: [],
      users: ['read', 'write', 'update', 'delete', 'create_admin'],
   },
   admin: {
      posts: [],
      users: ['read', 'write', 'update', 'create_user'],
   },
   user: {
      posts: ['read', 'write', 'update'],
      users: ['read'],
   },
};

module.exports = ROLE_PERMISSIONS;
