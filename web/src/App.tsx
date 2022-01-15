import React, { useState } from 'react';
import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Header from './components/Header';

const App = () => {

  const [showForm, setShowForm] = useState(false)

  return (
    <div className="App">
      <Header />
      <EntryForm 
        showForm={showForm}
        setShowForm={setShowForm}
      />
      <EntryList />
    </div>
  )
}

export default App
