package com.wasfia.automationexercise.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/** Captures screenshots for the report (saved under reports/screenshots). */
public final class ScreenshotUtil {

    private static final Logger log = LogManager.getLogger(ScreenshotUtil.class);

    private ScreenshotUtil() {
    }

    /** Saves a PNG screenshot and returns its path relative to the reports folder. */
    public static String capture(WebDriver driver, String name) {
        try {
            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            Path dir = Path.of("reports", "screenshots");
            Files.createDirectories(dir);
            Path target = dir.resolve(name + "_" + timestamp + ".png");
            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.copy(src.toPath(), target);
            log.info("Screenshot saved: {}", target);
            // Path relative to reports/ExtentReport.html so the image loads inside the report
            return "screenshots/" + target.getFileName();
        } catch (Exception e) {
            log.error("Could not capture screenshot", e);
            return null;
        }
    }

    /** Returns the screenshot as a Base64 string (embedded directly in the HTML report). */
    public static String captureBase64(WebDriver driver) {
        return ((TakesScreenshot) driver).getScreenshotAs(OutputType.BASE64);
    }
}
