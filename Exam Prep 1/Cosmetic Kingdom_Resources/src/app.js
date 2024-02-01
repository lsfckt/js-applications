
import page from "../node_modules/page/page.mjs";

import { endpoints, get } from "./api/api.js";
import { deleteData } from "./api/auth.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { decorateContext } from "./middlewares/decorateContext.js";
import { create } from "./views/create.js";
import { dashboard } from "./views/dashboard.js";
import { details } from "./views/details.js";
import { home } from "./views/home.js";
import { login } from "./views/login.js";
import { navbar } from "./middlewares/navigation.js";
import { register } from "./views/register.js";
import { edit } from "./views/edit.js";

page(authMiddleware);
page(navbar);
page(decorateContext);

page('/', home);
page('/login', login);
page('/register', register);
page('/products', dashboard);
page('/create', create)
page('/details/:id', details);
page('/edit/:id', edit);
page.start();

export async function onLogout() {
    await get(endpoints.logout);

    deleteData();

    page.redirect('/products');
}