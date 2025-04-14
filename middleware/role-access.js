const roleAccess = (userRole, endpoint, method) => {
    const allowedRoles = {
        '/liputan-kegiatan': {
            GET: ['admin', 'user'],
            POST: ['admin', 'user'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/penerbitan-berita': {
            GET: ['admin', 'user'],
            POST: ['admin', 'user'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/peminjaman-alat': {
            GET: ['admin', 'user'],
            POST: ['admin', 'user'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/kemitraan': {
            GET: ['admin', 'user'],
            POST: ['admin', 'user'],
            PUT: ['admin'],
            DELETE: ['admin'],
        },
        '/auth': {
            GET: ['admin', 'user'],
        },
    };

    const allowedMethods = allowedRoles[endpoint];
    if (!allowedMethods) return false;

    const roles = allowedMethods[method];
    if (!roles) return false;

    return roles.includes(userRole);
};

export default roleAccess;
