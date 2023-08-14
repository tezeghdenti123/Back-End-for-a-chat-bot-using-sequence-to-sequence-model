package com.PCD.PCD.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
@Component
@Document(collection="User")
public class User {
    @Field("name")
    private String name;
    @Id
    private String address;
    @Field("password")
    private String password;
    private ArrayList<Chat>listChat;

    public User(){
        this.listChat=new ArrayList<Chat>();
    }
    public void addChat(Chat chat){
        this.listChat.add(chat);
    }
    public Chat deleteChat(Chat chat){
        this.listChat.remove(chat);
        return chat;
    }
    public void cleanChat(){
        this.listChat.clear();
    }
    public String getPassword() {
        return password;
    }

    public ArrayList<Chat> getListChat() {
        return listChat;
    }

    public void setListChat(ArrayList<Chat> listChat) {
        this.listChat = listChat;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setPassword(String password) {
        this.password = password;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
