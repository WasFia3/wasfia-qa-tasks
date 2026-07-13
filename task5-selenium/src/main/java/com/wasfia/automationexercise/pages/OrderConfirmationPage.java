package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** Order placed page - reads the confirmation message. */
public class OrderConfirmationPage extends BasePage {

    private final By orderPlacedTitle = By.cssSelector("h2[data-qa='order-placed']");
    private final By confirmationMessage = By.xpath("//h2[@data-qa='order-placed']/following-sibling::p");

    public OrderConfirmationPage(WebDriver driver) {
        super(driver);
    }

    /** Returns the confirmation message displayed under the 'Order Placed!' title. */
    public String getConfirmationMessage() {
        waitForVisible(orderPlacedTitle);
        String message = waitForVisible(confirmationMessage).getText();
        step("Step 9: Order confirmation page displayed with message: \"" + message + "\"");
        return message;
    }
}
