import React, { useState } from "react";
import { Accordion, Form, ListGroup, Spinner } from 'react-bootstrap';
import axios from './api/axios';
import './index.css';

export default function ShowTasks({ tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkBox = (e) => {
    e.stopPropagation();
  };

  const fetchTaskDetails = async (taskId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/dashboard/tasks/getAssignedTasks/${taskId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        }
      });
      setTimeout(() => {
        setSelectedTask(response.data);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const formatStartDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <div className="list">
        <Accordion className="accordian">
          <ListGroup>
            {tasks.map((task) => (
              <Accordion.Item key={task.id} eventKey={task.id}>
                <Accordion.Header onClick={() => fetchTaskDetails(task.id)}>
                  <div className="accordianheader">
                    <div className="for-checkbox">
                      <Form.Check type="checkbox" id="checkbox" onClick={checkBox} />
                      <div>
                        <span>Task Name: {task.task_name}</span>
                      </div>
                    </div>
                    <div>
                      <span>Assigned to: {task.assigned_to}</span>
                    </div>
                    <div>
                      <span>Deadline: {task.end_date}</span>
                    </div>
                    <div>
                      <span>Status: {task.status}</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className="task-detail">
                  {selectedTask && selectedTask._id === task.id && !isLoading ? (
                    <div>
                      <p>Description: {selectedTask.description}</p>
                      <p>ERP: {selectedTask.erp}</p>
                      <p>Start Date: {formatStartDate(selectedTask.start_date)}</p>
                      <p>Department: {selectedTask.department}</p>
                      <p>Files:</p>
                      <ul>
                        {selectedTask.files.map((file, index) => (
                          <li key={index}>{file.filename}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="loading-icon">
                      <Spinner animation="grow" role="status" variant="primary">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </ListGroup>
        </Accordion>
      </div>
    </>
  );
}
