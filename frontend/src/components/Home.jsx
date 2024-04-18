import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUser, fetchUserFailue, fetchUserSuccess } from '../features/userSlice'

function Home() {

    

    const BACKEND_API_BASE_URL = "http://localhost:5000"

    const params = useParams()
    const dispatch = useDispatch()


    const {user} = useSelector(state => state)

    useEffect(() => {
        const {id} = params

        dispatch(fetchUser())
        fetch(BACKEND_API_BASE_URL + "/api/users/user/" + id)
  .then(response => {
    // Handle successful response
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse response body as JSON
  })
  .then(data => {
    // Handle JSON data
    dispatch(fetchUserSuccess(data))
    console.log(data);
  })
  .catch(error => {
    // Handle errors
    dispatch(fetchUserFailue(error.message))
    console.error('There was a problem with the fetch operation:', error);
  });

    },[])
  return (
    <div>
      {user.loading ? <h1>Loading..</h1>   :
      user.data.found ? <div>
        <h1>{user.data.data.name}</h1>
        <img src={user.data.data.imageUrl} alt="" />
      </div>   :
       <h1>Oops! Profile not found or User might have deleted the account</h1> }
    </div>
  )
}

export default Home
