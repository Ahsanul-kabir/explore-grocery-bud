import React, { useState } from "react";
import Alert from './components/Alert'
import List from "./components/List";


function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)

  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      // display alert
      showAlert(true, 'danger', 'please enter value')
    }
    else if (name && isEditing) {
      // editing
      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, title: name }
        }
        return item
      }))

      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'success', 'value change')
    }
    else {
      // show alert
      showAlert(true, 'success', 'item added to the list')
      const newItem = { id: new Date().getTime.toString(), title: name };
      setList([...list, newItem]);
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item remove')
    setList(list.filter((item) => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)

  }
  return (
    <section className="section-center">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bird</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button type="submit" className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {
        list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className='clear-btn' onClick={clearList}>Clear Items</button>
          </div>
        )
      }
    </section>
  );
}

export default App;
