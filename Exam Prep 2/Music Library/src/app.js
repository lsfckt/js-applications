import page from '../node_modules/page/page.mjs';

import { session } from './middlewares/session.js';
import { decorateContext } from './middlewares/decorate-context.js';
import { navBarView } from './middlewares/navigation-bar.js';
import { homePage } from './views/home-page.js';
import { loginPage } from './views/login-page.js';
import { regPage } from './views/register-page.js';
import { editPage } from './views/edit-album-page.js';
import { dashboardPage } from './views/dashboard-page.js';
import { newAlbumPage } from './views/adding-new-album-page.js';
import { detailsPage } from './views/album-details.js';

export const host = 'http://localhost:3030';

page(session);
page(navBarView);
page(decorateContext);

page('/', homePage);
page('/login', loginPage);
page('/register', regPage);
page('/edit/:id', editPage);
page('/dashboard', dashboardPage);
page('/new', newAlbumPage);
page('/details/:id', detailsPage);
page.start();