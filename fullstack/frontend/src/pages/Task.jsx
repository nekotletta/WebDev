import React, { useEffect, useState } from 'react';
import '../styles/profile.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function TaskManager({ title, completed, task_id, onClick, removal }) {
  const buttonColor = completed ? 'btn-success' : 'btn-danger';
  const textStyle = completed ? { textDecoration: 'line-through', color: '#595daeaa' } : {};

  return (
    <div>
      <div className="card bg-secondary" onClick={onClick} style={{ cursor: 'pointer', marginBottom: "5px" }}>
        <div className='row'>
          <h3 style={textStyle} className='col-sm-12 gap-3'>{title}</h3>
        </div>

        <div className='row justify-content-center'>
          <div className='col-sm-8'>
            {/* read scss colors as ${} */}
            <p className={`status-button btn ${buttonColor} text-center`} style={{ margin: '10px 0', width: '100%' }}>
              Task Status: {completed ? 'Completed' : 'Pending'}
            </p>
          </div>
          <div className='col-sm-4'>
            <button className='btn btn-danger' style={{"margin" : "10px 0"}} data-bs-toggle="modal" data-bs-target={`#modal-${task_id}`}>Remove <i className="bi bi-trash"></i></button>
          </div>
        </div>
      </div>

      {/* source for modal: https://getbootstrap.com/docs/5.0/components/modal/ */}
      <div className="modal fade" id={`modal-${task_id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Remove selected task</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to remove this task?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => removal(task_id)}>Remove task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TodoList = () => { 
  const [tasks, setList] = useState([]); 

  const addTask = (newTask) => {
    // by using setList, react knows which list (state/object*) is being talked about
    // each list-state? has its own set method/variable name
    // react is umutable, so the array.push method doesnt really exist

    // to add to an array we do [...existing-array-name, { new-item-paerams },]
    // this add an item at the end of it

    setList(already_existing_tasks =>
    [...already_existing_tasks,
      // calculate next id and new task name, default option is incomplete
      {id: already_existing_tasks.length + 1, title: newTask, completed: false},
    ])
  };



  const createNewTask = () => {
    const newTaskTitle = prompt("Enter the task title:"); 
    if (newTaskTitle) {
      addTask(newTaskTitle);
    }
  };


  // react is unmutable, can't just go list.remove()
  // what filter seems to do is that it removes objects that meet the condition 
  // setlist is called to update the whole list

  const removeCompletedTasks = (all_tasks) => {
    // keep tasks that are not completed yet
    const updated_tasks = all_tasks.filter(task => task.completed == false);
    setList(updated_tasks);


    
  }

  const removeSelTask = (task_id) => {
    // keep all tasks, except the one that matches the ID to remove
    const remaining_tasks = tasks.filter(task => task.id !== task_id);
    setList(remaining_tasks);
    
    
  }


  useEffect(() => { 
    console.log("View Mounted"); 
  }, []); 

  const toggleTaskCompletion = (id) => {
    setList((og_tasks) => 
      og_tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (  
    <div className='space-navbar'> 
    <h1>To do list</h1>
    <div className='row'>
      <div className='col-sm-6'>
        <button style={{width: "100%", height: "100%"}} onClick={createNewTask} className="btn btn-success d-flex align-items-center justify-content-center">Add new task</button>
      </div>
      <div className='col-sm-6'>
        <button style={{width: "100%", height: "100%"}} onClick={() => removeCompletedTasks(tasks)} className="btn btn-danger d-flex align-items-center justify-content-center">Remove all completed tasks</button>
      </div>
    </div>
    <br />
    {
      tasks.map((task) => ( 
        <TaskManager  
          key={task.id}
          title={task.title} 
          completed={task.completed}
          task_id={task.id} 
          onClick={() => toggleTaskCompletion(task.id)}
          removal={removeSelTask}
        />
      ))
    }
  </div>  
  );
};

export default TodoList;