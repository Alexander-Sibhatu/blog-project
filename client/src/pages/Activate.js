import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { activateUser } from '../services/UserServices'
import { toast } from 'react-toastify'

const Activate = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const handleActivateUser = async () => {
    try {
      await activateUser( token );
      toast.success("Account activated successfully!")
      navigate("/login") // Redirect on success
    } catch (error) {
      console.log(error)
      // toast.error(error.response.data.error.message)
    }
  }
  return (
    <div>
      <button onClick={handleActivateUser}>Activate User</button>
    </div>
  )
}

export default Activate