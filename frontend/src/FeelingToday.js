import {useState} from 'react';
import goodimage from './images/happyguy.jpeg';
import badimage from './images/sadembiid.jpeg';
function FeelingToday({name}){
    const [good, setGood] = useState('Something else');
    const handleBad= ()=>{
        setGood(false);
    }
    const handleGood= ()=>{
        setGood(true);
    }
    let content = <div></div>;
    if(good===true){
        content= <img src={goodimage} width="400" height="250" alt="Giannis wins"></img>
    }
    else if(good===false){
        content= <img src={badimage} width="400" height="250" alt="Embiid loses"></img>
    }
    return(
        <div>
            Hello, {name}, how are you doing today?
            <button onClick={handleGood}>Good</button>
            <button onClick={handleBad}>Bad</button>
            <br></br>
            {content}
        </div>
    )
}
export default FeelingToday;