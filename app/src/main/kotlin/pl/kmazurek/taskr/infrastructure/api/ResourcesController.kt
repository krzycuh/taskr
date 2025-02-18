package pl.kmazurek.taskr.infrastructure.api

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.servlet.ModelAndView

@Controller
class ResourcesController{

  @GetMapping("/")
  fun home() = ModelAndView("static/index.html")

}