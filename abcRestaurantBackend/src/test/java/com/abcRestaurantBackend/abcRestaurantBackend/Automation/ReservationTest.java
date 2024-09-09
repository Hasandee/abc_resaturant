package com.abcRestaurantBackend.abcRestaurantBackend.Automation;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ReservationTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/reservation");
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testReservationForm() throws InterruptedException {
        // Fill in the form fields
        driver.findElement(By.id("name")).sendKeys("John Doe");
        driver.findElement(By.id("type")).sendKeys("Dinner");
        driver.findElement(By.id("date")).sendKeys("2024-09-08","19:00","PM");
        driver.findElement(By.id("peopleno")).sendKeys("4");

        // Select a branch
        WebElement branchDropdown = driver.findElement(By.id("branch"));
        Select selectBranch = new Select(branchDropdown);
        selectBranch.selectByVisibleText("Townhall Branch");

        driver.findElement(By.id("phone")).sendKeys("1234567890");
        driver.findElement(By.id("email")).sendKeys("johndoe@example.com");

        // Add special requests if any
        driver.findElement(By.id("requests")).sendKeys("Please arrange a corner table.");

        // Submit the form
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.id("submit")));

// Now click the button
        loginButton.click();

        // Handle alert confirmation
        Alert alert = driver.switchTo().alert();
        String alertText = alert.getText();
        assertEquals("Reservation successfully added", alertText);
        alert.accept();  // Click OK on the alert
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
