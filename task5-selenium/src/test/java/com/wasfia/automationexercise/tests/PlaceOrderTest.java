package com.wasfia.automationexercise.tests;

import com.wasfia.automationexercise.pages.CartPage;
import com.wasfia.automationexercise.pages.CheckoutPage;
import com.wasfia.automationexercise.pages.HomePage;
import com.wasfia.automationexercise.pages.LoginPage;
import com.wasfia.automationexercise.pages.OrderConfirmationPage;
import com.wasfia.automationexercise.pages.PaymentPage;
import com.wasfia.automationexercise.pages.ProductDetailsPage;
import com.wasfia.automationexercise.utils.TestAccountApi;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Task scenario: pick a random product, set quantity to 2, add to cart,
 * checkout, pay with fake card data and print the confirmation message.
 */
public class PlaceOrderTest extends BaseTest {

    @Test(description = "Place an order for a random product with quantity 2")
    public void placeOrderForRandomProduct() throws Exception {
        // Precondition: checkout requires a logged-in user, so create a
        // disposable test account via the site's public API and log in.
        TestAccountApi account = TestAccountApi.createFreshAccount();
        new LoginPage(driver).login(account.email, account.password);

        // Step 1: navigate to the home page
        HomePage homePage = new HomePage(driver);
        homePage.open();

        // Step 2: click on a random product
        homePage.clickRandomProduct();

        // Step 3: update the quantity to 2
        ProductDetailsPage productPage = new ProductDetailsPage(driver);
        String productName = productPage.getProductName();
        log.info("Selected product: {}", productName);
        productPage.setQuantity(2);

        // Step 4: add to cart
        productPage.addToCart();

        // Step 5: from the cart modal, click View Cart
        productPage.viewCartFromModal();

        // Verify the cart really contains quantity 2
        CartPage cartPage = new CartPage(driver);
        Assert.assertEquals(cartPage.getDisplayedQuantity(), "2",
                "Cart should show quantity 2 for the selected product");

        // Step 6: proceed to checkout
        cartPage.proceedToCheckout();

        // Step 7: place order
        new CheckoutPage(driver).placeOrder();

        // Step 8: complete the payment with fake data
        new PaymentPage(driver).completePayment(
                "Wasfia QA", "123456789", "100", "12", "2030");

        // Step 9: print the confirmation message to the IDE console
        String message = new OrderConfirmationPage(driver).getConfirmationMessage();
        System.out.println(message);

        Assert.assertEquals(message, "Congratulations! Your order has been confirmed!",
                "Confirmation message should match the expected text");

        // Step 10 (close browser) happens in BaseTest tearDown
    }
}
