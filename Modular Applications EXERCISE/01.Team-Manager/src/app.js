import page from '../node_modules/page/page.mjs';

import { decorateContext, session } from './utils.js';
import { browse } from './views/browse-teams.js';
import { create} from './views/create.js';
import { home } from './views/home.js';
import { login } from './views/login.js';
import { updateNav } from './views/nav.js';
import { register } from './views/register.js';
import { details } from './views/team-details.js';

page(session);
page(decorateContext);
page(updateNav);

page('/', home)
page('/browse', browse);
page('/login', login);
page('/register', register);
page('/create', create);
page('/details', details);

page.start();