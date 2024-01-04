const { chromium } = require('playwright-chromium');

(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 3000 }); //{ headless: false, slowMo: 3000 }
    const page = await browser.newPage();

    await page.goto('http://127.0.0.1:5500/index.html');
    await page.waitForSelector('.accordion');

    console.log('Testing: load titles');
    const articleTitle = await page.$$eval('span', (span) => {
        return span.map((span) => span.innerText);
    });

    articleTitle.forEach((text, index) => {
        console.log(`Article Title ${index + 1}: ${text}`);
    });

    console.log('Testing: button “More” functionality')

    const buttons = await page.$$('.button');
    const articles = await page.$$('.extra');

    for (const button of buttons) {
        
        await button.click();

        const buttonTextAfterClick = await button.textContent();
        let output;

        if (buttonTextAfterClick === 'Less') {
            output = 'Less';
        } else {
            output = 'Isn`t less';
        }

        console.log(output);
    }

    for (const article of articles) {
        const content = await article.textContent();

        if (content.startsWith('Scalable') || content.startsWith('An') || content.startsWith('Unix') || content.startsWith('ALGOL')) {
            console.log('Right Content');
        }

        if (await article.isVisible()) {
            console.log('Articles are visible');
        }
    }

    console.log('Testing: button “Less” functionality');

    for (const button of buttons) {
        
        await button.click();

        const buttonTextAfterClick = await button.textContent();
        let output;

        if (buttonTextAfterClick === 'More') {
            output = 'More';
        } else {
            output = 'Isn`t more';
        }

        console.log(output);
    }

    for (const article of articles) {
        
        if (await article.isHidden()) {
            console.log('Article is visible');
        } else {
            console.log('Article aren`t visible');
        }
    }

    await browser.close();
})();