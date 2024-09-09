package com.abcRestaurantBackend.abcRestaurantBackend.Automation;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class FeedbackTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/feedback"); // URL of your feedback form
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testFeedbackForm() throws InterruptedException {
        // Fill in the user ID
        driver.findElement(By.id("userId")).sendKeys("12345");

        // Fill in the message
        driver.findElement(By.id("message")).sendKeys("Great service!");

        // Select a rating
        WebElement ratingDropdown = driver.findElement(By.id("rating"));
        Select selectRating = new Select(ratingDropdown);
        selectRating.selectByValue("5"); // Choose a rating between 1 and 5

        // Submit the form
        driver.findElement(By.cssSelector("button[type='submit']")).click();

        // Wait for confirmation alert and validate it
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

// Get the text from the alert
        String alertText = alert.getText();

// Assert that the alert text is correct
        assertEquals("Thank you for your feedback!", alertText);

// Accept the alert
        alert.accept();
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
