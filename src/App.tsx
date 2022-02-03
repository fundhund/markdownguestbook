// @ts-nocheck
import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Header from './components/Header';

const App = () => {

  return (
    <div className="App">
      <Header />
      <EntryForm />
      <EntryList />
    </div>
  )
}

export default App
