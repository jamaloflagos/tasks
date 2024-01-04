import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import Task from './components/Task';
import CreateProfile from './components/CreateProfile';
import Main from './components/Main';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import NavBar from './components/NavBar';
import useProfile from './hooks/useProfile';



function App() {
  const { profile } = useProfile()
  
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
            <Route index element={profile ? <Main /> : <Navigate to='/create-profile' />} />

            <Route path='/' element={<Main /> } />
            
            <Route path='/:id' element={<Task />} />
            
            <Route path='/add-task' element={<AddTask />} />
            
            <Route path='/edit-task/:id' element={<EditTask />} />
            
            <Route path='/profile' element={<Profile />} />
            
            <Route path='/edit-profile' element={<EditProfile />} />
            
            <Route path='/create-profile' element={!profile ? <CreateProfile /> : <Navigate to='/' />} />
      </Routes>  

      <NavBar />
    </BrowserRouter>
    </div>
  );
}

export default App;