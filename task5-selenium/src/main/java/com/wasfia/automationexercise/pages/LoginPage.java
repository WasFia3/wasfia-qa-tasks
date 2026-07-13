package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/** /login - used as a precondition because checkout requires a logged-in user. */
public class LoginPage extends BasePage {

    private final By emailField = By.cssSelector("input[data-qa='login-email']");
    private final By passwordField = By.cssSelector("input[data-qa='login-password']");
    private final By loginButton = By.cssSelector("button[data-qa='login-button']");
    private final By loggedInBanner = By.xpath("//a[contains(., 'Logged in as')]");

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void login(String email, String password) {
        step("Precondition: logging in as " + email);
        driver.get("https://automationexercise.com/login");
        waitForVisible(emailField).sendKeys(email);
        waitForVisible(passwordField).sendKeys(password);
        safeClick(loginButton);
        waitForVisible(loggedInBanner);
        step("Login successful - 'Logged in as' banner is visible");
    }
}
