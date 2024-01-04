const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = {
    list: [
        {
            author: 'Spami',
            content: 'Hello, are you there?',
        },
        {
            author: 'Garry',
            content: 'Yep, whats up :?',
        },
        {
            author: 'Spami',
            content: 'How are you? Long time no see? :)',
        },
        {
            author: 'George',
            content: 'Hello, guys! :))',
        },
        {
            author: 'Spami',
            content: 'Hello, George nice to see you! :)))',
        },
    ],
};

const endpoints = {
    list: '/jsonstore/messenger',
};

const host = 'http://localhost:3000';
let browser, page;


describe('E2E Tests', async function () {
    this.timeout(70000);

    before(async () => {
        browser = await chromium.launch({ headless: true, });
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        await page.close();
    });

    it('Testing: load messages', async () => {
        await page.goto(host);

        const refresh = 'input[id="refresh"]';
        await page.click(refresh);

        const post = await page.$$eval(`textarea`, (t) => t.map((s) => s.value));

       expect(post[0]).to.equal(
        `${mockData.list[0].author}: ${mockData.list[0].content}\n${mockData.list[1].author}: ${mockData.list[1].content}\n${mockData.list[2].author}: ${mockData.list[2].content}\n${mockData.list[3].author}: ${mockData.list[3].content}\n${mockData.list[4].author}: ${mockData.list[4].content}`);
    });

    it('Testing: send message', async () => {
        await page.goto(host);

        
    });
});