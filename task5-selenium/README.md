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

## Outputs

- **HTML report:** `reports/ExtentReport.html` (open in a browser). Failing
  tests include a full-page screenshot taken at the moment of failure.
- **Failure screenshots (PNG):** `reports/screenshots/`
- **Log file:** `logs/test.log`
- **Console:** the confirmation message is printed at the end of the run.
