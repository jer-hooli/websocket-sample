package com.websocket_poc.websocket_poc.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api") // Base URL path
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    // Simple GET endpoint
    @GetMapping("/log-request")
    public String logRequest(@RequestParam(value = "message", defaultValue = "Hello, World!") String message) {
        // Log the request message
        logger.info("Received GET request with message: {}", message);
        
        // Return a simple response
        return "Request logged successfully! Message: " + message;
    }
}