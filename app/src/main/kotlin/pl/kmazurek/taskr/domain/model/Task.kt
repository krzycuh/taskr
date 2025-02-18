package pl.kmazurek.taskr.domain.model

import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "tasks")
data class Task(
    @Id val id: String? = null,
    val name: String,
    val age: Int
)