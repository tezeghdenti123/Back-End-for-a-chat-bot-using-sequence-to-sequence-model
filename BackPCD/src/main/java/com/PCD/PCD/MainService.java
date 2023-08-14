package com.PCD.PCD;

import com.PCD.PCD.Model.Chat;
import com.PCD.PCD.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MainService {
    @Autowired
    private MainRepositry mainRepositry;
    private String timestamp;

    public User saveUser(User user){
        String address= user.getAddress();
        Date date=new Date();
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        timestamp=dateFormat.format(date);
        User user1=mainRepositry.findUserByAddress(address);
        if(user1!=null) {

            for (Chat chat : user.getListChat()) {
                chat.setTimestamp(timestamp);
                user1.addChat(chat);
            }
            mainRepositry.delete(user);
            mainRepositry.insert(user1);
            return mainRepositry.findUserByAddress(address);
        }
        return user;

    }
    public User insertChat(User user){
        User user1=mainRepositry.findUserByAddress(user.getAddress());
        mainRepositry.delete(user1);
        mainRepositry.insert(user);
        /*Date date=new Date();
        DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        timestamp=dateFormat.format(date);
        for (Chat chat : user.getListChat()) {
            if(chat.getTimestamp()==""){
                chat.setTimestamp(timestamp);
            }

        }
        User user1=mainRepositry.findUserByAddress(user.getAddress());
        if(user1!=null){
            mainRepositry.delete(user1);
            mainRepositry.insert(user);
        }
        else{
            mainRepositry.insert(user);
        }*/
        return user;
    }
    public User registerUser(User user){

        return mainRepositry.insert(user);
    }
    public ArrayList<User> getAll(){
        return (ArrayList<User>) mainRepositry.findAll();
    }
    public boolean signIn(User user){
        User user1=mainRepositry.findUserByAddress(user.getAddress());
        if(user1!=null){
            if(user1.getPassword().equals(user.getPassword())){
                return true;
            }
            else{
                return false;
            }

        }
        else{
            return false;

        }

    }
    public User getUser(String address){
        /*public User insertChat(User user){
            Date date=new Date();
            DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            timestamp=dateFormat.format(date);
            for (Chat chat : user.getListChat()) {
                if(chat.getTimestamp()==""){
                    chat.setTimestamp(timestamp);
                }

            }
            User user1=mainRepositry.findUserByAddress(user.getAddress());
            if(user1!=null){
                mainRepositry.delete(user1);
                mainRepositry.insert(user);
            }
            else{
                mainRepositry.insert(user);
            }
            return user;
        }*/
        User user=new User();
        return user;
    }

    public String deleteChat(String address){
        User user1=mainRepositry.findUserByAddress(address);
        mainRepositry.delete(user1);
        if(user1!=null) {
            user1.cleanChat();
            mainRepositry.insert(user1);
        }
        return "good";
    }

}
