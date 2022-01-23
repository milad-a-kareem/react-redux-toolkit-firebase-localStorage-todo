import './App.css';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { todoActions } from './store/todo-slice'
import { themeActions } from './store/theme-slice'

let isFirst  = true

function App() {
  const [inputText, setInputText] = useState('')

  const todos = useSelector(state => state.todo.todos)
  const isDark = useSelector(state => state.theme.isDark)

  const dispatch = useDispatch()

  const inpuntHandler = (e)=>{
    setInputText(e.target.value)
  }
  const onAdd = ()=>{
    dispatch(todoActions.add(inputText))
  }
  const onRemove = (id)=>{
    dispatch(todoActions.remove(id))
  }

  useEffect(()=>{
    fetch('https://todo-list-1f081-default-rtdb.firebaseio.com/todos.json')
    .then(async(res)=> {
      const data = await res.json()
      dispatch(todoActions.replace(data))
      
    }
      )
    .catch(e=> console.log(e))
  },[])

  useEffect(()=>{
    if (!isFirst){
      fetch('https://todo-list-1f081-default-rtdb.firebaseio.com/todos.json',{
        method: 'PUT',
        body: JSON.stringify(todos)
      }).catch(e=>console.log(e))
  
    }
    isFirst=false
  },[todos])

  return (
    <div className={`App ${isDark ? 'dark' : null}`}>
      <button onClick={()=>{dispatch(themeActions.toggle())}}>toggle theme</button>
      <input onChange={inpuntHandler}/>
      <button onClick={onAdd}>add todo</button>
      {
        todos.map(todo=>{
        return <div key={todo.id}>
          <h1>{todo.text}</h1>
          <button onClick={()=>{onRemove(todo.id)}}>remove</button>
        </div>})
      }
    </div>
  );
}

export default App;
