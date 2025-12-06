import { By, until } from "selenium-webdriver";

export default class BasePage {
	constructor(driver) {
		this.driver = driver;
		this.wait = this.driver.wait.bind(this.driver);
	}

	async open(url) {
		await this.driver.get(url);
	}

	async find(locator, timeout = 10000) {
		return await this.driver.wait(until.elementLocated(locator), timeout);
	}

	async finds(locator, timeout = 10000) {
		return await this.driver.wait(until.elementsLocated(locator), timeout);
	}

	async click(locator) {
		const el = await this.find(locator);
		await el.click();
		return el;
	}

	async type(locator, text) {
		const el = await this.find(locator);
		await el.clear();
		await el.sendKeys(text);
		return el;
	}
}
