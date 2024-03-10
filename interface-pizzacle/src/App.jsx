import {Routes, Route} from 'react-router-dom'
import Landing from './Components/Layout/Landing'
import Home from './Components/Layout/Home'
import UserLayout from './Components/Users/UserLayout'
import UserRegister from './Components/Users/UserRegister'
import UserDashboard from './Components/Users/UserDashboard'

function App() {

  return (
    <>
    <Routes>

        {/* Landing page */}
      <Route path="/" element={<Landing />} >
        <Route path='/' element={<Navigate to='/home' />} /> 
        <Route path='/home' element={<Home />} />
      </Route>

      {/* user page */}
      <Route path='/user/register' element={<UserRegister />} />
      <Route path="/user" element={<UserLayout />}>
        <Route path='/user/dashboard' element={<UserDashboard/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
