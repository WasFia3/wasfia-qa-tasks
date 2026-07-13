package com.wasfia.automationexercise.pages;

import com.wasfia.automationexercise.utils.ExtentManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

/**
 * Parent of all page objects: shared waits, safe clicking
 * (the site shows Google ads that can intercept normal clicks),
 * and step logging into the Extent report.
 */
public abstract class BasePage {

    protected final WebDriver driver;
    protected final WebDriverWait wait;
    protected final Logger log = LogManager.getLogger(getClass());

    protected BasePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    protected WebElement waitForVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    protected WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    /** Scrolls to the element and clicks it, falling back to a JS click if an ad overlay intercepts it. */
    protected void safeClick(By locator) {
        WebElement element = waitForClickable(locator);
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView({block: 'center'});", element);
        try {
            element.click();
        } catch (Exception e) {
            log.warn("Normal click intercepted, using JavaScript click on {}", locator);
            ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
        }
        dismissAdIfPresent();
    }

    /** The site sometimes redirects into a full-page Google ad (#google_vignette); go back if that happens. */
    protected void dismissAdIfPresent() {
        if (driver.getCurrentUrl().contains("google_vignette")) {
            log.warn("Full-page ad detected, navigating back");
            driver.navigate().back();
        }
    }

    /** Logs a step to the console, the log file and the Extent report. */
    protected void step(String message) {
        log.info(message);
        ExtentManager.logStep(message);
    }
}
