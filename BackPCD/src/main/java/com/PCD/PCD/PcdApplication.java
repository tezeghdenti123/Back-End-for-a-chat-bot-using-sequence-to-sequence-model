package com.PCD.PCD;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.security.Timestamp;

@SpringBootApplication
public class PcdApplication {

	public static void main(String[] args) {
		SpringApplication.run(PcdApplication.class, args);
		DateFormat dateFormat=new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
		Date date = new Date();
		System.out.println(dateFormat.format(date));




	}

}
