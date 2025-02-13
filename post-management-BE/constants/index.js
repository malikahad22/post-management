const ROLE_PERMISSIONS = {
   superadmin: {
      posts: [],
      users: ['read', 'write', 'update', 'delete'],
   },
   admin: {
      posts: [],
      users: ['read', 'write', 'update'],
   },
   user: {
      posts: ['read', 'write', 'update', 'delete'],
      users: ['read'],
   },
};

module.exports = ROLE_PERMISSIONS;
