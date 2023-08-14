package com.PCD.PCD;

import com.PCD.PCD.Model.Chat;
import com.PCD.PCD.Model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @Autowired
    private MainService service;
    @Autowired
    private MainRepositry mainRepositry;


    @PostMapping(value = "/identifier")
    public  boolean identifier(@RequestBody User user){
        return service.signIn(user);
    }
    @PostMapping(value = "/Register")
    public User saveUser(@RequestBody User user){
        return service.registerUser(user);
    }
    @PostMapping(value = "/chat")
    public User inscrire(@RequestBody User user){
        return service.saveUser(user);
    }
    @GetMapping(value="/user")
    public User getUser(@RequestParam(name="address") String address){
        return mainRepositry.findUserByAddress(address);
    }
    @PostMapping(value = "/save")
    public User saveChat(@RequestBody User user){
        return service.insertChat(user);
    }
    @DeleteMapping(value = "/erase")
    public void delete(){
        mainRepositry.deleteAll();
    }
    @DeleteMapping(value = "/Clean")
    public String deleteChat(@RequestParam(name="address") String address){
        return service.deleteChat(address);
    }
    @GetMapping(value="/test")
    public String get(@NonNull HttpServletRequest request){
        final  String authHeader= request.getHeader("Authorization");
        System.out.println(authHeader);
        return authHeader;
    }

}
