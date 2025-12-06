import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import chromedriver from "chromedriver";
import { expect } from "chai";
import ProductsPage from "../pages/products.page.js";
import CartPage from "../pages/cart.page.js";

describe("Cart tests", () => {
	let driver;

	before(async () => {
		// ServiceBuilder объект
		const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path);

		// Передаём его в Builder
		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeService(serviceBuilder)
			.build();
	});

	after(async () => {
		if (driver) await driver.quit();
	});

	it("Корзина: удаление", async () => {
		const products = new ProductsPage(driver);
		await products.open();

		await products.addNProducts(2);

		const cart = new CartPage(driver);
		await cart.open();

		const before = (await cart.getItems()).length;
		expect(before).to.be.greaterThan(0);

		await cart.removeFirst();
		await driver.sleep(1500);

		const after = (await cart.getItems()).length;
		expect(after).to.be.lessThan(before);

		// const empty = (await cart.getItems()).length;
		// expect(empty).to.equal(0);
	});

	it("Проверка доставки и суммы", async () => {
		const products = new ProductsPage(driver);
		await products.open();
		await products.addNProducts(1);

		const cart = new CartPage(driver);
		await cart.open();

		const before = await cart.getSubtotal();

		await cart.selectDelivery(1);
		await driver.sleep(1500);

		const after = await cart.getSubtotal();

		expect(before).to.not.equal("");
	});
});
