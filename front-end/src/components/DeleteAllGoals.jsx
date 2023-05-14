import React from 'react'
import axios from 'axios'

const DeleteAllGoals = () => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete('/api/goals')
      console.log(response.data)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>Delete All Goals</button>
    </div>
  )
}

export default DeleteAllGoals
