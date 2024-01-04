const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

let browser;
let context;
let page;

describe('E2E tests', function () {
    this.timeout(6000);

    before(async () => {
        
        browser = await chromium.launch( {headless: false, slowMo: 500});
    });

    after(async () => {
        await browser.close();
    });
});