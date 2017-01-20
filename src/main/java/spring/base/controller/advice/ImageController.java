package spring.base.controller.advice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.base.service.ImageService;

/**
 * Created by Clark on 2017/1/11.
 */
@Controller
public class ImageController {
    @Autowired
    ImageService imageService;

    @RequestMapping("/iminsert")
    public String insertImage(){
        imageService.insertImage();
        return "/index";
    }

    @RequestMapping("/imread")
    public String imread(){
        imageService.readImage();
        return "/index";
    }
}
