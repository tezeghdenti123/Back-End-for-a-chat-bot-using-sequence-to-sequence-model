package com.PCD.PCD.Model;

import org.springframework.data.annotation.Id;

public class Message {
    @Id
    private String id;
    private String sender;
    private String message;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
