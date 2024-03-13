import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './Components/Layout/Landing'
import Home from './Components/Layout/Home'
import UserLayout from './Components/Users/UserLayout'
import UserRegister from './Components/Users/UserRegister'
import UserDashboard from './Components/Users/UserDashboard'
import AdminRegister from './Components/Admin/AdminRegister'
import { UserLogin } from './Components/Users/UserLogin'
import AdminLayout from './Components/Admin/AdminLayout'
import AdminDashboard from './Components/Admin/AdminDashboard'
import AdminLogin from './Components/Admin/AdminLogin'
import ConfirmEmail from './Components/Users/ConfirmEmail'

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
        <Route path='/user/login' element={<UserLogin />} />
        <Route path='/user/verifyEmail' element={<ConfirmEmail />} />

        <Route path="/user" element={<UserLayout />}>
          <Route path='/user' element={<Navigate to="/user/dashboard" />} />
          <Route path='/user/dashboard' element={<UserDashboard />} />
        </Route>


        {/* Admin page */}
        <Route path='/admin/register' element={<AdminRegister />} />
        <Route path='/admin/login' element={<AdminLogin/>}/>
        
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='/admin' element={<Navigate to="/admin/dashboard" />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />

        </Route>

      </Routes>
    </>
  )
}

export default App
