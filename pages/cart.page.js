import { By, until } from "selenium-webdriver";
import BasePage from "./base.page.js";


export default class CartPage extends BasePage {
	constructor(driver) {
		super(driver);
		this.url = "https://sweetshop.netlify.app/basket";


		this.CART_ITEM = By.css(".cart-item, .cart-row, .lh-condensed");
		this.REMOVE_BTN = By.css(".small");
		this.CLEAR_BTN = By.css(".clear-cart, .btn-clear");


		this.DELIVERY = By.css("input[name='delivery']");
		this.SUBTOTAL = By.css(".subtotal, #subtotal");
	}


	async open() {
		await super.open(this.url);
	}


	async getItems() {
		try {
			return await this.finds(this.CART_ITEM);
		} catch {
			return [];
		}
	}


	async removeFirst() {
		const items = await this.getItems();
		if (items.length === 0) return false;

		try {
			// Находим кнопку Delete Item внутри первой карточки
			const btn = await items[0].findElement(By.xpath(".//a[text()='Delete Item']"));
			await btn.click();

			// Ждём появления alert и принимаем его
			await this.driver.wait(until.alertIsPresent(), 5000);
			const alert = await this.driver.switchTo().alert();
			await alert.accept();

			return true;
		} catch (err) {
			console.log("Ошибка при удалении:", err);
			return false;
		}
	}



	async clear() {
		try {
			await this.click(this.CLEAR_BTN);
			return true;
		} catch {
			return false;
		}
	}


	async selectDelivery(index = 0) {
		const opts = await this.finds(this.DELIVERY);
		if (opts.length === 0) return false;
		await opts[index].click();
		return true;
	}


	async getSubtotal() {
		try {
			const el = await this.find(this.SUBTOTAL);
			return await el.getText();
		} catch {
			return "";
		}
	}
}