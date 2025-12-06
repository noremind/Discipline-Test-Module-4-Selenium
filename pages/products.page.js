import { By } from "selenium-webdriver";
import BasePage from "./base.page.js";


export default class ProductsPage extends BasePage {
	constructor(driver) {
		super(driver);
		this.url = "https://sweetshop.netlify.app/";


		this.PRODUCT_CARD = By.css(".cards, .product-card, .card");
		this.CART_COUNT = By.css("#cart-count, .badge, .cart-count");
		this.ADD_TO_CART_BTN = By.css(".addItem");

		// By.xpath(
		// 	"//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'addItem')]"
		// );
	}


	async open() {
		await super.open(this.url);
	}



	async getProductCards() {
		return await this.finds(this.PRODUCT_CARD);
	}


	async addNProducts(n) {
		const btns = await this.finds(this.ADD_TO_CART_BTN);


		let added = 0;
		for (let i = 0; i < n && i <= btns.length; i++) {
			try {
				await btns[i].click();
				added++;
			} catch { }
		}
		return added;
	}


	async getCartCount() {
		try {
			const el = await this.find(this.CART_COUNT);
			return (await el.getText()).trim();
		} catch {
			return "";
		}
	}
}