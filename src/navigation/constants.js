// active class for tha navigation
export const ACTIVE_CLASS_NAME = 'active';

// root route
export const ROUTE_ROOT = '/';

// protected route
export const ROUTE_PROTECTED = '/protected';

// public route
export const ROUTE_LOGIN = '/login';
export const ROUTE_REGISTER = '/register';

// User's protected routes
export const ROUTE_PARKING_AREAS = '/parking';
export const ROUTE_PARKING_SLOTS = '/:parking_id/slots';
export const ROUTE_FEEDBACK = '/feedback';
export const ROUTE_RESERVATIONS = '/reservations';

// Admin's protected routes
export const ROUTE_ALL_RESERVATIONS = '/all-reservations';
export const ROUTE_ALL_CANCELLATIONS = '/all-cancellations';
export const ROUTE_ALL_USERS = '/all-users';
export const ROUTE_ALL_FEEDBACKS = '/all-feedback';

export const PROTECTED_USER_ROUTES = [
    ROUTE_PARKING_AREAS,
    ROUTE_PARKING_SLOTS,
    ROUTE_FEEDBACK,
    ROUTE_RESERVATIONS,
];

export const PROTECTED_ADMIN_ROUTES = [
    ROUTE_ALL_RESERVATIONS,
    ROUTE_ALL_CANCELLATIONS,
    ROUTE_ALL_USERS,
    ROUTE_ALL_FEEDBACKS,
];

// create challenge form route
export const ROUTE_NOT_FOUND = '/not-found';
