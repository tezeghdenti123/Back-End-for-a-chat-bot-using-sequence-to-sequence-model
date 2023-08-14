package com.PCD.PCD.Model;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Component;

import java.security.Timestamp;
import java.util.*;

@Component
public class Chat {
    @Id

    private String timestamp ;
    private String tag;

    private List<Object> listMessage;

    public Chat() {
        this.listMessage=new ArrayList<Object>();

    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public void addMessage(Object o){
        this.listMessage.add(o);
    }
    public void deleteMessage(){
        this.listMessage.clear();
    }
    public List<Object> getListMessage() {
        return listMessage;
    }

    public void setListMessage(List<Object> listMessage) {
        this.listMessage = listMessage;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }


}
