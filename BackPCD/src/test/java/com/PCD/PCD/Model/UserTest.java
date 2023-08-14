package com.PCD.PCD.Model;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest
class UserTest {
    @Autowired
    private User user;
    @Test
    void addChat() {
        int nb=user.getListChat().size();
        Chat o= new Chat();
        user.addChat(o);
        assertEquals(nb+1,user.getListChat().size());
    }

    @Test
    void deleteChat() {
        Chat o=new Chat();
        user.addChat(o);
        int nb=user.getListChat().size();
        user.deleteChat(o);
        assertEquals(nb-1,user.getListChat().size());
    }
}