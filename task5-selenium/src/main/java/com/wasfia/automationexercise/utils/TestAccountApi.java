package com.wasfia.automationexercise.utils;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Checkout on automationexercise.com requires a logged-in user.
 * As a test precondition, this class creates a disposable account with fake
 * data through the site's own public testing API (POST /api/createAccount),
 * so the UI test can focus purely on the required scenario.
 */
public final class TestAccountApi {

    private static final Logger log = LogManager.getLogger(TestAccountApi.class);
    private static final String CREATE_ACCOUNT_URL = "https://automationexercise.com/api/createAccount";

    public final String email;
    public final String password;

    private TestAccountApi(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static TestAccountApi createFreshAccount() throws Exception {
        String email = "wasfia.qa." + System.currentTimeMillis() + "@testmail.com";
        String password = "Test@1234";

        Map<String, String> form = new LinkedHashMap<>();
        form.put("name", "Wasfia QA");
        form.put("email", email);
        form.put("password", password);
        form.put("title", "Mrs");
        form.put("birth_date", "1");
        form.put("birth_month", "1");
        form.put("birth_year", "2000");
        form.put("firstname", "Wasfia");
        form.put("lastname", "QA");
        form.put("company", "QA Training");
        form.put("address1", "123 Test Street");
        form.put("address2", "Apt 1");
        form.put("country", "United States");
        form.put("zipcode", "12345");
        form.put("state", "TestState");
        form.put("city", "TestCity");
        form.put("mobile_number", "0123456789");

        String body = form.entrySet().stream()
                .map(e -> URLEncoder.encode(e.getKey(), StandardCharsets.UTF_8) + "="
                        + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                .collect(Collectors.joining("&"));

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(CREATE_ACCOUNT_URL))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());

        log.info("createAccount API response: {}", response.body());
        if (!response.body().contains("201")) {
            throw new IllegalStateException("Could not create test account: " + response.body());
        }
        log.info("Test account created: {}", email);
        return new TestAccountApi(email, password);
    }
}
