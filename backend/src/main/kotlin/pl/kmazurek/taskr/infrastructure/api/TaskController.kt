package pl.kmazurek.taskr.infrastructure.api


import org.springframework.web.bind.annotation.*
import pl.kmazurek.taskr.domain.model.Task
import pl.kmazurek.taskr.infrastructure.repository.TaskRepository

@RestController
@RequestMapping("/api/tasks")
class TaskController(private val repository: TaskRepository) {

  @GetMapping
  fun getAllTasks(): List<Task> = repository.findAll()

  @PostMapping
  fun addTask(@RequestBody task: Task) = repository.save(task)
}