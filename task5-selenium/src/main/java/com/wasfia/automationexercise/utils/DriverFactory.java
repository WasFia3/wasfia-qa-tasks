package com.wasfia.automationexercise.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

/**
 * Creates and holds the WebDriver instance for the test run.
 * Selenium Manager (bundled with Selenium 4) downloads the matching
 * chromedriver automatically - no manual driver setup is needed.
 */
public final class DriverFactory {

    private static final Logger log = LogManager.getLogger(DriverFactory.class);
    private static WebDriver driver;

    private DriverFactory() {
    }

    public static WebDriver getDriver() {
        if (driver == null) {
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--start-maximized");
            options.addArguments("--disable-notifications");
            options.addArguments("--disable-popup-blocking");
            if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
                options.addArguments("--headless=new", "--window-size=1920,1080");
                log.info("Starting Chrome in headless mode");
            } else {
                log.info("Starting Chrome in headed mode");
            }
            driver = new ChromeDriver(options);
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
            log.info("Chrome started successfully");
        }
        return driver;
    }

    public static void quitDriver() {
        if (driver != null) {
            driver.quit();
            driver = null;
            log.info("Browser closed (post condition)");
        }
    }
}
