// userRoutes.js
import express from 'express';
import { getUsers , setUsers } from '../database/users.js';

const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  res.json({ message: 'User route is working!' });
});

//get the user fo=rom the db
router.get('/user/:id', (req, res) => {

    const params = req.params
    const {id} = params
    console.log(id , ' id params')

    const user = getUsers()[id]

    
    res.status(200).json({
        found : user ? true  :false,
        data : user ? user   : null
    })
    

    // res.json({ message: 'User route is working! ' + id });
  });

//create user in db
router.post('/create', (req, res) => {

    const {name , email}  = req.body
    console.log(req.body , ' req.body ')

    const oldUsers = getUsers()

    const user = oldUsers[email]
    if(user){
        res.status(200).json({
            status : "failed",
            message : "User already exists"

        })
        
    }
    else {
        const newUsers = {
            ...oldUsers ,
             [email] : {
                name,
                email,
                imageUrl : "https://picsum.photos/200"
             }
        }
        setUsers(newUsers)
        res.status(200).json({
            status : "success",
            data : newUsers

        })
    }

  });




export default router;
