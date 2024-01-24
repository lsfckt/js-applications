import { get, post, put } from './api.js';
import { home } from './views/home.js';
import page from '../node_modules/page/page.mjs';
import { register, onReg } from './views/register.js';
console.log('work');

export const endpoints = {
    home: home,
    reg: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    create: '/data/catalog',
    all: '/data/catalog',
    details: '/data/catalog/:id',
    update: '/data/catalog/:id',
    delete: home,
    my: '/data/catalog?where=_ownerId%3D%22:userId%22',
}

page('/', home);
page('/register', register);
page.start();