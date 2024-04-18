export var users = {
    "a@a.com": {
      name: "Alice",
      email: "a@a.com",
      imageUrl: "https://picsum.photos/200"
    },
    "b@b.com": {
      name: "Bob",
      email: "b@b.com",
      imageUrl: "https://source.unsplash.com/200x200/?portrait"
    },
    "c@c.com": {
      name: "Charlie",
      email: "c@c.com",
      imageUrl: "https://picsum.photos/200"
    }
  };

  // users.js
export const getUsers = () => {
    return users;
  };


  export const setUsers = (newUsers) => {
     users = newUsers
  }
  

  