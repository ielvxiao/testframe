package spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Created by Administrator on 2016/11/13.
 */
//@Configuration
//@ComponentScan({"spring"})
//@EnableAutoConfiguration
    @SpringBootApplication

public class WebApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebApplication.class, args);
    }

}
