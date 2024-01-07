const { chromium } = require('playwright-chromium');
const { expect } = require('chai');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

const mockedData = {
  list: [
    { author: "Author 1", title: "Title 1" },
    { author: "Author 2", title: "Title 2" }
  ]
}

let browser, page;

describe('E2E Tests', async function () {
  this.timeout(10000);

  before(async () => {
    browser = await chromium.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  afterEach(async () => {
    await page.close();
  });

  it('Testing: load books', async () => {
    await page.goto(host);

    await page.waitForSelector('#loadBooks');

    await page.route('**/jsonstore/collections/books', (route, request) => {
      route.fulfill({
        body: JSON.stringify(mockedData.list),
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    });

    await page.click('#loadBooks');

    const books = await page.$$eval(`tbody tr`, (tr) =>
      tr.map((s) => s.textContent));

    expect(books.length).to.equal(mockedData.list.length);

  });

  it('Testing: add book', async () => {
    const newData = mockedData.list[0];
    await page.goto(host);

    await page.waitForSelector('#submit');

    const newBookTitle = newData.title + 'random';
    const newBookAuthor = newData.author + 'random';


    await page.fill('input[name="title"]', newBookTitle);
    await page.fill('input[name="author"]', newBookTitle);

    const [request] = await Promise.all([
      page.waitForRequest('**/jsonstore/collections/books'),
      page.click('#submit'),
    ]);
 
    expect(request.method()).to.equal('POST');

    const postData = JSON.parse(request.postData());
 
    expect(postData.title).to.equal(newBookTitle);
    expect(postData.author).to.equal(newBookAuthor);

  });
});
