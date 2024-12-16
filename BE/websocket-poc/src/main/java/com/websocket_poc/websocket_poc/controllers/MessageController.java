package com.websocket_poc.websocket_poc.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.websocket_poc.websocket_poc.pojos.Message;

@Controller
public class MessageController {


  @MessageMapping("/message")
  @SendTo("/topic/messages")
  public Message greeting(Message message) throws Exception {
    Thread.sleep(1000); // simulated delay
    
    return message;
  }

}