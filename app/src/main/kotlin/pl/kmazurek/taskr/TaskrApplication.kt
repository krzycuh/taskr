package pl.kmazurek.taskr

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class TaskrApplication

fun main(args: Array<String>) {
	runApplication<TaskrApplication>(*args)
}
