package pl.kmazurek.taskr.infrastructure.api

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import pl.kmazurek.taskr.domain.model.Task
import pl.kmazurek.taskr.domain.model.TaskStatus
import pl.kmazurek.taskr.infrastructure.repository.TaskRepository

@RestController
@RequestMapping("/api/tasks")
class TaskController(private val repository: TaskRepository) {

  @GetMapping
  fun getAllTasks(): List<Task> = repository.findAll()

  @PostMapping
  fun addTask(@RequestBody task: Task): Task = repository.save(task)

  @DeleteMapping("/{id}")
  fun deleteTask(@PathVariable id: String): ResponseEntity<Void> {
    if (!repository.existsById(id)) {
      return ResponseEntity.notFound().build()
    }
    repository.deleteById(id)
    return ResponseEntity.noContent().build()
  }

  @PutMapping("/{id}")
  fun updateTask(@PathVariable id: String, @RequestBody task: Task): ResponseEntity<Task> {
    if (!repository.existsById(id)) {
      return ResponseEntity.notFound().build()
    }
    val updatedTask = task.copy(id = id)
    return ResponseEntity.ok(repository.save(updatedTask))
  }

  @PatchMapping("/{id}/status")
  fun updateTaskStatus(
    @PathVariable id: String,
    @RequestBody status: TaskStatus
  ): ResponseEntity<Task> {
    val task = repository.findById(id)
      .orElse(null)
      ?: return ResponseEntity.notFound().build()

    val updatedTask = task.copy(status = status)
    return ResponseEntity.ok(repository.save(updatedTask))
  }
}