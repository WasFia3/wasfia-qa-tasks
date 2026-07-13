# Task 5 — Selenium Place Order Test (automationexercise.com)

Selenium + Java automation of the "place order" scenario on
[automationexercise.com](https://automationexercise.com/), built with the
**Page Object Model** design pattern.

## Test scenario

1. Navigate to the home page.
2. Click a **random** product from the displayed products.
3. On the product details page, set the quantity to **2**.
4. Click **Add to cart**, then click **View Cart** in the modal.
5. On the cart page, click **Proceed To Checkout**.
6. On the checkout page, click **Place Order**.
7. Fill the payment form with fake data (card `123456789`, cvv `100`).
8. Print the confirmation message `Congratulations! Your order has been confirmed!` to the console.
9. Close the browser.

**Precondition note:** the site does not allow guest checkout — clicking
"Proceed To Checkout" as a guest shows a *Register / Login* popup. So the test
first creates a disposable account (fake data) through the site's own public
testing API (`POST /api/createAccount`) and logs in with it.

## Tech stack

| Tool | Purpose |
|---|---|
| Selenium 4 (Java) | Browser automation (Selenium Manager auto-downloads chromedriver) |
| TestNG | Test runner + assertions |
| ExtentReports 5 | Readable HTML report with an embedded screenshot on failure |
| Log4j2 | Logs to console and `logs/test.log`; steps are also logged into the report |
| Maven | Build tool + dependency management |

## Project structure (Page Object Model)

```
task5-selenium/
├── pom.xml                     # Maven dependencies & build config
├── testng.xml                  # TestNG suite (registers the report/screenshot listener)
├── src/main/java/com/wasfia/automationexercise/
│   ├── pages/                  # PAGE OBJECTS — one class per page, locators + actions
│   │   ├── BasePage.java       #   shared waits, ad-safe clicking, step logging
│   │   ├── LoginPage.java
│   │   ├── HomePage.java
│   │   ├── ProductDetailsPage.java
│   │   ├── CartPage.java
│   │   ├── CheckoutPage.java
│   │   ├── PaymentPage.java
│   │   └── OrderConfirmationPage.java
│   └── utils/
│       ├── DriverFactory.java  # creates/quits the ChromeDriver
│       ├── ExtentManager.java  # ExtentReports singleton
│       ├── ScreenshotUtil.java # screenshot capture (file + base64)
│       ├── TestListener.java   # attaches screenshot to the report on failure
│       └── TestAccountApi.java # precondition: creates a throwaway login account
└── src/test/java/com/wasfia/automationexercise/tests/
    ├── BaseTest.java           # browser + report lifecycle (setup/teardown)
    └── PlaceOrderTest.java     # THE TEST — the scenario steps, readable top to bottom
```

## How to run

Requirements: JDK 17+, Maven, Google Chrome. No manual Selenium or driver
downloads are needed — Maven pulls the libraries and Selenium Manager pulls
the driver.

```bash
# headed (visible browser — use this for the video demo)
mvn test

# headless
mvn test -Dheadless=true
```

## Outputs

- **HTML report:** `reports/ExtentReport.html` (open in a browser). Failing
  tests include a full-page screenshot taken at the moment of failure.
- **Failure screenshots (PNG):** `reports/screenshots/`
- **Log file:** `logs/test.log`
- **Console:** the confirmation message is printed at the end of the run.
