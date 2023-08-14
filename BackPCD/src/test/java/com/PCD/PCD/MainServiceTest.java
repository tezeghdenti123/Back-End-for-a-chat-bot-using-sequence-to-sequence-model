package com.PCD.PCD;

import com.PCD.PCD.Model.Chat;
import com.PCD.PCD.Model.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest
class MainServiceTest {
    @Autowired
    private MainService mainService;
    @Autowired
    private User user;
    @Autowired
    private MainRepositry mainRepositry;
    @Test
    void saveUser() {
    }

    @Test
    void registerUser() {

    }

    @Test
    void getAll() {
    }

    @Test
    void signIn() {
    }

    @Test
    void insertChat() {
        Chat chat= new Chat();
        chat.setTimestamp("");
        assertEquals(chat.getTimestamp(),"");
        user.addChat(chat);
        user=mainService.insertChat(user);
        for (Chat c : user.getListChat()) {
            assertNotEquals(c.getTimestamp(),"");
        }

    }
}