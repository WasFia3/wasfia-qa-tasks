package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

/** Product details page: quantity field, Add to cart button and the cart modal. */
public class ProductDetailsPage extends BasePage {

    private final By productName = By.cssSelector(".product-information h2");
    private final By quantityField = By.id("quantity");
    private final By addToCartButton = By.cssSelector("button.cart");
    private final By cartModal = By.id("cartModal");
    private final By viewCartLink = By.cssSelector("#cartModal a[href='/view_cart']");

    public ProductDetailsPage(WebDriver driver) {
        super(driver);
    }

    public String getProductName() {
        return waitForVisible(productName).getText();
    }

    public void setQuantity(int quantity) {
        step("Step 3: Updating product quantity to " + quantity);
        WebElement field = waitForVisible(quantityField);
        field.clear();
        field.sendKeys(String.valueOf(quantity));
    }

    public void addToCart() {
        step("Step 4: Clicking the 'Add to cart' button");
        safeClick(addToCartButton);
        waitForVisible(cartModal);
        step("Cart modal is displayed");
    }

    public void viewCartFromModal() {
        step("Step 5: Clicking the 'View Cart' link inside the cart modal");
        safeClick(viewCartLink);
    }
}
