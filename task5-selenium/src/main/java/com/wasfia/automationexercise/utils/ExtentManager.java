package com.wasfia.automationexercise.utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;
import com.aventstack.extentreports.reporter.configuration.Theme;

/**
 * Singleton wrapper around ExtentReports.
 * The HTML report is written to reports/ExtentReport.html.
 */
public final class ExtentManager {

    private static ExtentReports extent;
    private static ExtentTest currentTest;

    private ExtentManager() {
    }

    public static synchronized ExtentReports getExtent() {
        if (extent == null) {
            ExtentSparkReporter spark = new ExtentSparkReporter("reports/ExtentReport.html");
            spark.config().setDocumentTitle("AutomationExercise - Place Order");
            spark.config().setReportName("Selenium POM Test Report");
            spark.config().setTheme(Theme.STANDARD);
            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("Target site", "https://automationexercise.com");
            extent.setSystemInfo("Browser", "Chrome");
            extent.setSystemInfo("OS", System.getProperty("os.name"));
        }
        return extent;
    }

    public static void setTest(ExtentTest test) {
        currentTest = test;
    }

    public static ExtentTest getTest() {
        return currentTest;
    }

    /** Logs a step to both the Extent report and the console/file log. */
    public static void logStep(String message) {
        if (currentTest != null) {
            currentTest.info(message);
        }
    }
}
