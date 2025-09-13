import { useState  , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const[showFinished , setshowFinished] = useState(true)
  


  useEffect(() => {
  let todoString= localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos) 
  }
  
}, [])


  const saveToLS =(params) => {
    localStorage.setItem("todos" , JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
    
  }
  
  


  const handleEdit=(e , id)=>{
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos) 
    saveToLS()
  }



  const handleDelete=(e , id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos) 
    saveToLS()
  }



  const handleAdd=()=>{
    setTodos([...todos,{ id: uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveToLS()
    alert("Task added successfully!")
  }


  const handleChange=(e)=>{
    setTodo(e.target.value)
  }


  const handleCheckbox=(e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted =! newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
     <Navbar/>

     <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-blue-100 min-h-[80vh] md:w-1/2">
     <h1 className='font-bold text-center text-3xl'>Manage Your Task By Task Manager</h1>
      <div className="addTodo my-5  flex flex-col gap-5">
        <h2 className='lext-lg font-bold my-2'>Add a Task</h2>
        <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg p-1 '  placeholder="Enter Task"/>
        <button  onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-500 hover:bg-blue-700 p-3 py-1 text-white  text-sm rounded-md mx-6 font-bold'>Save</button>
      </div>
       <input onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished Tasks

      <h2 className='text-lg font-bold p-4'> Your Tasks</h2>
      

      <div className="todos">
        {todos.length===0 && <div className="m-5"> No Task </div>}
        {todos.map(item=>{

         return (showFinished || !item.isCompleted) &&  <div key={item.id} className="todo flex   my-3 justify-between">
          <div className='flex gap-5'>
             <input onChange={handleCheckbox}   name={item.id} type="checkbox" checked={item.isCompleted}  id='' />
              <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
          </div>
          
          <div className="buttons">
            <button  onClick={(e)=>{handleEdit(e , item.id)}} className='bg-blue-500 hover:bg-blue-700 p-3 py-1 text-sm text-white rounded-md mx-2  font-bold'><FaEdit /></button>
            <button  onClick={(e)=>{handleDelete(e, item.id)}} className=' bg-blue-500 hover:bg-blue-700 p-3 py-1 text-sm text-white rounded-md mx-2  font-bold'><MdDelete /></button>
          </div>

        </div>
         })}
      </div>
      
     </div>
    </>
  )
}

export default App
