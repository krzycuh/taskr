package pl.kmazurek.taskr.infrastructure.repository

import org.springframework.data.mongodb.repository.MongoRepository
import pl.kmazurek.taskr.domain.model.Task

interface TaskRepository : MongoRepository<Task, String>