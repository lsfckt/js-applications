import { getUser } from "../utils.js";

export function session(ctx, next) {
    const user = getUser();
    ctx.user = user;

    next();
}