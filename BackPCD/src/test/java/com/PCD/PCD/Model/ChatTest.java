package com.PCD.PCD.Model;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest
class ChatTest {
    @Autowired
    Chat chat;
    @Test
    void addMessage() {
        int nb=chat.getListMessage().size();
        Object o= new Object();
        chat.addMessage(o);
        assertEquals(nb+1,chat.getListMessage().size());
    }

    @Test
    void deleteMessage() {
        chat.deleteMessage();
        assertEquals(0,chat.getListMessage().size());
    }
}