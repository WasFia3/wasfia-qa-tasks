package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** /checkout - order review page with the Place Order button. */
public class CheckoutPage extends BasePage {

    private final By placeOrderButton = By.cssSelector("a[href='/payment']");

    public CheckoutPage(WebDriver driver) {
        super(driver);
    }

    public void placeOrder() {
        step("Step 7: Clicking the 'Place Order' button on the checkout page");
        safeClick(placeOrderButton);
    }
}
