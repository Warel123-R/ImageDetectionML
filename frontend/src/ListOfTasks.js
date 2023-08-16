import axios from 'axios';
import {useState, useEffect} from 'react';
import Task from './Task';
function ListOfTasks({rendagain}){
    const [alltasks, setAllTasks] = useState([]); 
    const [staterender, setStateRender] = useState(false);
    const [lastrender, setlastRender] = useState(false);

    const GetAllTasks = async()=>{
       const res=await axios.get('http://localhost:5004/findall');
       let arr = res.data;
       setAllTasks(arr);
    }

    if(rendagain!==lastrender){
        setlastRender(rendagain);
        GetAllTasks();
    }

    const changeStateRender = ()=>{
        setStateRender(!staterender);
    }

    useEffect(() => {
        GetAllTasks();
    }, [staterender]);

    
    const changedTasks = alltasks.map((taskobject, index)=>{
        return(
            <Task key={index} task={taskobject.task} id={taskobject.id} refresh={changeStateRender}></Task>
        )
    });
    return(
        <div>
            <br></br>
            {changedTasks}
        </div>
    )
};
export default ListOfTasks;
