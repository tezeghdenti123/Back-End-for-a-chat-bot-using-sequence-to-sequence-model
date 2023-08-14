package com.PCD.PCD;

import com.PCD.PCD.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainRepositry extends MongoRepository<User,String> {
    public User findUserByAddress(String address);
}
