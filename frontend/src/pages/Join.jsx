import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Join = () => {

    const BACKEND_API_BASE_URL = "http://localhost:5000"
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading , setLoading] = useState(false)

  const navigate = useNavigate()

  //check if user already exists or not
  const checkUserExists = async (email) => {

    
 return new Promise((resolve , reject) => {
    fetch(BACKEND_API_BASE_URL + "/api/users/user/" + email)
    .then(response => {
      // Handle successful response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse response body as JSON
    })
    .then(data => {
      // Handle JSON data
      console.log(data);
  
      resolve(data.found)
    })
    .catch(error => {
      // Handle errors
      console.error('There was a problem with the fetch operation:', error);
  
        resolve(false)
    });
 })
  }

 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNextStep = () => {

    if(step === 1){
        setLoading(true)

        checkUserExists(email).then(res => {
            console.log(res , ' response')
            if(!res){
              setStep(step + 1)  
            }
            else {
              navigate('/home/' + email)  
            }
            setLoading(false)
        })


    }
    
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleJoin = () => {
    // Perform join logic
    console.log("Email:", email);
    console.log("Name:", name);
    console.log("Image:", image);
    setLoading(true)
    fetch(BACKEND_API_BASE_URL + "/api/users/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name , 
            email
        })
      })
      .then(response => {
        if (!response.ok) {
          toast.error('Something went wrong' , 2000);
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response body as JSON
      })
      .then(data => {
        // Handle JSON data
        console.log(data , ' response of create');
        if(data.status === 'failed'){
            toast.error(data.message, 2000)
        }
        else {
            toast.success('Welcome ' + name , 2000);
        }
        // toast.success('Welcome ' + name);
        setLoading(false)

      })
      .catch(error => {
        toast.error('Something went wrong' , 2000);
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false)
      });
      

    // Redirect or perform further actions as needed
  };

  return (
    <div style={styles.container}>
      {step === 1 && (
        <div style={styles.page}>
          <h2>Email Input</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            style={styles.input}
            required
          />
          <button onClick={handleNextStep} style={styles.button}>{loading ? "Loading.."  :"Next"}</button>
        </div>
      )}
      {step === 2 && (
        <div style={styles.page}>
          <h2>Name Input</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
            style={styles.input}
            required
          />
          <button onClick={handlePrevStep} style={styles.button}>Back</button>
          <button onClick={handleNextStep} style={styles.button}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div style={styles.page}>
          <h2>Image Upload</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.input}
          />
          <button onClick={handlePrevStep} style={styles.button}>Back</button>
          <button onClick={handleJoin} style={styles.button}>Join</button>
        </div>
      )}
      <ToastContainer/>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  page: {
    marginBottom: '20px',
  },
  input: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    marginBottom : "5px",
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

export default Join;
