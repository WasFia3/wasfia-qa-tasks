package com.wasfia.automationexercise.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.List;
import java.util.Random;

/** Home page: shows the featured products grid. */
public class HomePage extends BasePage {

    private final By productCards = By.cssSelector(".features_items .product-image-wrapper");
    private final By viewProductLinks = By.cssSelector(".features_items .choose a[href*='/product_details/']");

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public void open() {
        step("Step 1: Navigating to the Home Page");
        driver.get("https://automationexercise.com/");
        waitForVisible(productCards);
        step("Home page loaded, products grid is visible");
    }

    /** Picks a random product from the displayed products and opens its details page. */
    public void clickRandomProduct() {
        List<WebElement> links = driver.findElements(viewProductLinks);
        int index = new Random().nextInt(links.size());
        WebElement chosen = links.get(index);
        String href = chosen.getAttribute("href");
        step("Step 2: Clicking a random product (" + (index + 1) + " of " + links.size() + "): " + href);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block: 'center'});", chosen);
        try {
            chosen.click();
        } catch (Exception e) {
            log.warn("Normal click intercepted, using JavaScript click");
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", chosen);
        }
        dismissAdIfPresent();
    }
}
