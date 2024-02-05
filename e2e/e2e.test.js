import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(40000);

describe("Credit Card Validator widget", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on("error", reject);
      server.on("message", (message) => {
        if (message === "ok") {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  it("widget should add valid class to input element if credit card number is valid", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".form");

    const form = await page.$(".form");
    const input = await form.$(".input");
    const submit = await form.$(".submit");

    await input.type("2200 2605 9011 2854");
    await submit.click();

    await page.waitForSelector(".form .input.valid");
  });

  test("widget should add invalid class to input element if credit card number is invalid", async () => {
    await page.goto(baseUrl);

    await page.waitForSelector(".form");

    const form = await page.$(".form");
    const input = await form.$(".input");
    const submit = await form.$(".submit");

    await input.type("2200 2605 9011 2853");
    await submit.click();

    await page.waitForSelector(".form .input.invalid");
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
