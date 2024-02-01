import * as authService from '../api/auth.js';

export function authMiddleware(ctx, next) {
    ctx.authData = authService.getAuth();
    next();
}
