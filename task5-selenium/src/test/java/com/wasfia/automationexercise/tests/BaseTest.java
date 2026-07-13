package com.wasfia.automationexercise.tests;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.wasfia.automationexercise.utils.DriverFactory;
import com.wasfia.automationexercise.utils.ExtentManager;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;

import java.lang.reflect.Method;

/** Shared setup/teardown: browser lifecycle and Extent report lifecycle. */
public abstract class BaseTest {

    protected static final Logger log = LogManager.getLogger(BaseTest.class);
    protected WebDriver driver;
    private static ExtentReports extent;

    @BeforeSuite(alwaysRun = true)
    public void setUpReport() {
        extent = ExtentManager.getExtent();
    }

    @BeforeMethod(alwaysRun = true)
    public void setUp(Method method) {
        ExtentTest test = extent.createTest(method.getName());
        ExtentManager.setTest(test);
        driver = DriverFactory.getDriver();
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        // Step 10 (post condition): close the browser
        DriverFactory.quitDriver();
    }

    @AfterSuite(alwaysRun = true)
    public void flushReport() {
        extent.flush();
        log.info("Extent report written to reports/ExtentReport.html");
    }
}
