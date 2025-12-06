import { By } from "selenium-webdriver";
import BasePage from "./base.page.js";


export default class LoginPage extends BasePage {
	constructor(driver) {
		super(driver);
		this.url = "https://sweetshop.netlify.app/login";


		this.EMAIL = By.id("exampleInputEmail");
		this.PASS = By.id("exampleInputPassword");
		this.LOGIN_BTN = By.css("button[type=submit], #login-btn");
		this.ERROR = By.css(".error, .invalid-email");
	}


	async open() {
		await super.open(this.url);
	}


	async login(email, pass) {
		await this.type(this.EMAIL, email);
		await this.type(this.PASS, pass);
		await this.click(this.LOGIN_BTN);
	}


	async getError() {
		try {
			const el = await this.find(this.ERROR);
			return await el.getText();
		} catch {
			return "";
		}
	}
}