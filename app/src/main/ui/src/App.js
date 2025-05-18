
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const TaskCard = styled(Card)`
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data));
    };

    const addTask = () => {
        const newTask = {
            title,
            description,
            dueDate,
            priority,
            status: 'PENDING'
        };

        axios.post('/api/tasks', newTask)
            .then(response => {
                setTasks([...tasks, response.data]);
                clearForm();
                setIsDialogOpen(false);
            });
    };

    const deleteTask = (taskId) => {
        axios.delete(`/api/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== taskId));
            });
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('MEDIUM');
    };

    const getPriorityColor = (priority) => {
        const colors = {
            LOW: '#4caf50',
            MEDIUM: '#ff9800',
            HIGH: '#f44336'
        };
        return colors[priority] || colors.MEDIUM;
    };

    return (
        <Container>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Zadania Domowe
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsDialogOpen(true)}
                >
                    Dodaj zadanie
                </Button>
            </Box>

            <TaskGrid>
                {tasks.map(task => (
                    <TaskCard key={task.id} elevation={2}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{task.title}</Typography>
                                <Box>
                                    <IconButton size="small" onClick={() => deleteTask(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography color="textSecondary" gutterBottom>
                                {task.description}
                            </Typography>
                            <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                <Chip
                                    label={task.priority}
                                    size="small"
                                    style={{ backgroundColor: getPriorityColor(task.priority), color: 'white' }}
                                />
                                <Typography variant="body2" color="textSecondary">
                                    Termin: {new Date(task.dueDate).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </CardContent>
                    </TaskCard>
                ))}
            </TaskGrid>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>Dodaj nowe zadanie</DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={2} mt={1}>
                        <TextField
                            label="Tytuł"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Opis"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField
                            label="Termin"
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            select
                            label="Priorytet"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            fullWidth
                            SelectProps={{
                                native: true
                            }}
                        >
                            <option value="LOW">Niski</option>
                            <option value="MEDIUM">Średni</option>
                            <option value="HIGH">Wysoki</option>
                        </TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Anuluj</Button>
                    <Button onClick={addTask} variant="contained" color="primary">
                        Dodaj
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default App;