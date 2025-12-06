import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";
import { expect } from "chai";
import ProductsPage from "../pages/products.page.js";

let driver;

describe("Products Page", () => {
	before(async () => {
		const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path); // объект ServiceBuilder

		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeService(serviceBuilder) // передаём ServiceBuilder
			.build();
	});

	after(async () => {
		if (driver) await driver.quit();
	});

	it("Проверка наличия элементов у товаров", async () => {
		const page = new ProductsPage(driver);
		await page.open();
		await driver.sleep(1500); // ждём загрузки страницы

		const cards = await page.getProductCards();
		expect(cards.length).to.be.greaterThan(0);
	});

	it("Добавление 10 товаров обновляет счётчик", async () => {
		const page = new ProductsPage(driver);
		await page.open();
		await driver.sleep(1500);

		const added = await page.addNProducts(10);
		expect(added).to.be.greaterThan(0);

		await driver.sleep(5000);


		const count = await page.getCartCount();
		expect(count).to.not.equal("");
	});
});
