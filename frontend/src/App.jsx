import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom' 
import Login from './components/Login'
import Create from './components/Create'
import Register from './components/Register'
import Posts from './components/Posts'
import Postpage from './components/Postpage'
import Navbar from './components/Navbar'
import Edit from './components/Edit'
import {UserContextProvider } from './context/UserContext'
function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Posts/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/post/:id' element={<Postpage/>}></Route>
          <Route path='/post/:id/edit' element={<Edit/>}></Route>
        </Routes>
      </Router>
    </UserContextProvider>
  )
}

export default App
