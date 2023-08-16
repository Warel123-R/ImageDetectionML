import {useState} from 'react';
import FeelingToday from './FeelingToday';
import ToDo from './ToDo';
import axios from 'axios';
import ListOfTasks from './ListOfTasks';
import Rekognition from './Rekognition';

function App(){
    const [clickedbutton, setClickedButton] = useState(false);
    const [name, setName] = useState("");
    const[formsubmitted, setFormSubmitted] = useState(false);
    const [disabled, setDisabled] = useState('');
    const [reRender, setReRender] = useState(false);
    const handleClick = ()=>{
        setClickedButton(!clickedbutton);
    }
    const handleChange = (event)=>{
        setName(event.target.value);
    }
    const handleSubmit= (event)=>{
        event.preventDefault();
        if(name.length>0){
            setFormSubmitted(true);
            setDisabled("disabled");
        }
    }
    const handleTaskSubmitted = async (task, setTask)=>{
        await axios.post('http://localhost:5004/todoitems',
            {
                task
            }
        );
        setTask('');
        setReRender(!reRender);
    }
    let content = clickedbutton? <div>This is a cool thing that is appearing!</div>: <div></div>
    let content2 = formsubmitted ? <FeelingToday name={name}></FeelingToday>: <div></div>
    return(
        <div>
            <h2>This is dynamic website!</h2>
            <hr></hr>
            <h3>Section 1, Simple React</h3>
            <button onClick={handleClick}>Click!</button>
            {content}
            <hr></hr>
            <h3>Section 2, Personalize</h3>
            <label>Please enter your name:</label>
            <form onSubmit={handleSubmit}>
                <input disabled={disabled} value={name} onChange={handleChange}></input>
                <button>Enter</button>
            </form>
            {content2}
            <hr></hr>
            <h3>Section 3, a Todo App</h3>
            <div>To Do List adder:</div>
            <ToDo handleTaskSubmitted={handleTaskSubmitted}></ToDo>
            <ListOfTasks rendagain={reRender}></ListOfTasks>
            <hr></hr>
            <h3>Section 4, using AWS Rekognition</h3>
            <Rekognition></Rekognition>
        </div>
    )
}
export default App;