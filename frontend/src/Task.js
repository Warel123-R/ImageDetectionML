import axios from 'axios';
function Task({task, id, refresh}){
    const handleDelete = async()=>{
        const res = await axios.post('http://localhost:5004/deleteitem', {data: id});
        console.log(res);
        if(res.data==='UPDSTATE'){
            refresh();
        }
    }
    return(
        <div>
            {task}
            <button onClick={handleDelete}>Remove Task</button>
        </div>
    )
}
export default Task;