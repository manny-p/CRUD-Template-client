import React, { useEffect, useState } from 'react'
import Routes from './config/Routes'
import { Link, useHistory } from 'react-router-dom'
import AuthModel from './models/auth'

function App() {
  const [user, setUser] = useState({username: ''})
  const history = useHistory()
  const checkForUser = async () => {
    console.log(user)
    try {
      const localUser = await localStorage.getItem('username')
      if (localUser)
        setUser({
          username: localUser,
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkForUser()
  }, [user.username])

  const logout = async () => {
    try {
      await AuthModel.logout()
      await localStorage.setItem('username', '')
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      {user.username !== '' && <button type="submit" onClick={logout}>Logout</button>}
      {Routes}
    </div>
  )
}

export default App
