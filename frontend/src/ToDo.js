import {useState} from 'react';
function ToDo({handleTaskSubmitted}){
    const [task, setTask] = useState('');
    const handleSubmit= (event)=>{
        event.preventDefault();
        handleTaskSubmitted(task, setTask);
    }
    const handleChange = (event)=>{
        setTask(event.target.value);
    }
    return(
        <form onSubmit={handleSubmit}>
            <input placeholder="Add Task" value={task} onChange={handleChange}></input>
            <button>Submit Task!</button>
        </form>
    )
}
export default ToDo;