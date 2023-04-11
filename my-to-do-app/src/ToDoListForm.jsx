import { useState ,useRef} from "react"

function ToDoListForm(props) {

const [input, setInput] = useState(props.edit ? props.edit.value : '');
const [tasks, setTasks] = useState([
    "Wake Up",
    "Toilet",
    "Brush",
  ]);

const inputRef = useRef(null);

const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const newTodo = input.trim(); 
    if (newTodo.length > 0) {
      const newTasks = { ...tasks, [`task${Object.keys(tasks).length + 1}`]: newTodo };
      setInput("");
      setTasks(newTasks);
    }
  };
 
return(
    <>
    <form>
    <input
      placeholder='Add a todo'
      value={input}
      onChange={handleChange}
      name='text'
      className='todo-input'
      ref={inputRef}
    />
    <button onClick={handleSubmit} className='todo-button'>Add todo </button>
    </form>

    <ul>
       {Object.keys(tasks).map(key => (
    <li key={key}>{tasks[key]}</li>
  ))}
</ul>
    </>
)
};
export default ToDoListForm
