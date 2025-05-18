package pl.kmazurek.taskr.domain.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import java.time.LocalDate

@Document(collection = "tasks")
data class Task(
    @Id val id: String? = null,
    val title: String,
    val description: String,
    val dueDate: LocalDate,
    val priority: Priority = Priority.MEDIUM,
    val status: TaskStatus = TaskStatus.PENDING
)

enum class Priority {
    LOW,
    MEDIUM,
    HIGH;

}

enum class TaskStatus {
    PENDING, COMPLETED
}