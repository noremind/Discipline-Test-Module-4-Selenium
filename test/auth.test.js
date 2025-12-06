import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";
import { expect } from "chai";
import LoginPage from "../pages/login.page.js";

describe("Auth tests", () => {
	let driver;

	before(async () => {
		const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path);

		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeService(serviceBuilder)
			.build();
	});

	after(async () => {
		if (driver) await driver.quit();
	});

	it("Успешная авторизация", async () => {
		const page = new LoginPage(driver);
		await page.open();
		await driver.sleep(1500);

		await page.login("test@test.com", "123456");
		await driver.sleep(2000);

		const url = await driver.getCurrentUrl();
		expect(url.includes("00efc23d-b605-4f31-b97b-6bb276de447e") || url.includes("user")).to.be.true;
	});

	it("Ошибка при неверном email", async () => {
		const page = new LoginPage(driver);
		await page.open();
		await driver.sleep(5000);

		await page.login("wrong-email", "123456");

		const err = await page.getError();
		expect(err).to.not.equal("");
	});
});
