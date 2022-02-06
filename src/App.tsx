// @ts-nocheck
import { useSelector } from 'react-redux';
import './App.css';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import Header from './components/Header';
import Preview from './components/Preview';

const App = () => {

  const { isPreviewVisible } = useSelector((state: RootState) => state.form)

  return (
    <div className="App">
      <Header />
      <EntryForm />
      {isPreviewVisible && <Preview /> }
      <EntryList />
    </div>
  )
}

export default App
