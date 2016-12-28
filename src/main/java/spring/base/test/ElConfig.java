package test;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;

import java.io.IOException;

/**
 * Created by Administrator on 2016/11/28.
 *
 */
@Configuration
@ComponentScan("test")
@PropertySource("test.properties")
public class ElConfig {

    @Value("I love you")
    private String normal;

    @Value("#{systemProperties['os.name']}")
    private String osName;
    @Value("${book.name}")
    private String bookName;
    @Value("test.txt")
    private Resource resource;
    @Value("http://www.baidu.com")
    private Resource testUrl;
    @Value("${book.author}")
    private String author;
    @Autowired
    private Environment environment;
    public void outputResource() {
        try {
            System.out.println(normal);
            System.out.println(osName);
            System.out.println(bookName);
            System.out.println(author);
            System.out.println(IOUtils.toString(testUrl.getInputStream()));
            System.out.println(IOUtils.toString(resource.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
