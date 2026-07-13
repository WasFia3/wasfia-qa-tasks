package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** /view_cart - shopping cart page. */
public class CartPage extends BasePage {

    private final By quantityCell = By.cssSelector("td.cart_quantity button");
    private final By proceedToCheckoutButton = By.cssSelector("a.check_out");

    public CartPage(WebDriver driver) {
        super(driver);
    }

    public String getDisplayedQuantity() {
        return waitForVisible(quantityCell).getText();
    }

    public void proceedToCheckout() {
        step("Step 6: Clicking the 'Proceed To Checkout' button");
        safeClick(proceedToCheckoutButton);
    }
}
