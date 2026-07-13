package com.wasfia.automationexercise.utils;

import com.aventstack.extentreports.MediaEntityBuilder;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.WebDriver;
import org.testng.ITestListener;
import org.testng.ITestResult;

/**
 * TestNG listener: logs test outcomes to the Extent report and
 * attaches a screenshot automatically when a test fails.
 */
public class TestListener implements ITestListener {

    private static final Logger log = LogManager.getLogger(TestListener.class);

    @Override
    public void onTestSuccess(ITestResult result) {
        log.info("TEST PASSED: {}", result.getName());
        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().pass("Test passed");
        }
    }

    @Override
    public void onTestFailure(ITestResult result) {
        log.error("TEST FAILED: {}", result.getName(), result.getThrowable());
        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().fail(result.getThrowable());
            try {
                WebDriver driver = DriverFactory.getDriver();
                String base64 = ScreenshotUtil.captureBase64(driver);
                ScreenshotUtil.capture(driver, "FAILED_" + result.getName());
                ExtentManager.getTest().fail("Screenshot at the moment of failure:",
                        MediaEntityBuilder.createScreenCaptureFromBase64String(base64).build());
            } catch (Exception e) {
                log.error("Could not attach failure screenshot", e);
            }
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        log.warn("TEST SKIPPED: {}", result.getName());
        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().skip("Test skipped");
        }
    }
}
