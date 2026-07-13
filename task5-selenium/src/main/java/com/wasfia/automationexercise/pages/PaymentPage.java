package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** /payment - card details form. Fake data is accepted by this practice site. */
public class PaymentPage extends BasePage {

    private final By nameOnCard = By.cssSelector("input[name='name_on_card']");
    private final By cardNumber = By.cssSelector("input[name='card_number']");
    private final By cvc = By.cssSelector("input[name='cvc']");
    private final By expiryMonth = By.cssSelector("input[name='expiry_month']");
    private final By expiryYear = By.cssSelector("input[name='expiry_year']");
    private final By payButton = By.cssSelector("button[data-qa='pay-button']");

    public PaymentPage(WebDriver driver) {
        super(driver);
    }

    public void completePayment(String name, String card, String cvcValue, String month, String year) {
        step("Step 8: Filling the payment form with fake card data");
        waitForVisible(nameOnCard).sendKeys(name);
        waitForVisible(cardNumber).sendKeys(card);
        waitForVisible(cvc).sendKeys(cvcValue);
        waitForVisible(expiryMonth).sendKeys(month);
        waitForVisible(expiryYear).sendKeys(year);
        step("Clicking 'Pay and Confirm Order'");
        safeClick(payButton);
    }
}
