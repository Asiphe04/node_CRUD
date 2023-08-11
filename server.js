
const express = require("express");
const app = express();
const PORT = 3001;
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.get("/Users", function (req, res) {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});


//CRUD
//Adding a user
app.get("/addUser", (req, res) => {
  fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the file: ", err);
      return res.status(500).send("Error reading data.json file.");
    }

    const users = JSON.parse(data);
    const newUser = {
      name: "new_user66",
      password: "new_password88",
      profession: "new_profession8765",
      id: 5,
    };

    users["user4"] = newUser;

    const updatedData = JSON.stringify(users, null, 2);

    fs.writeFile(__dirname + "/" + "data.json", updatedData, (err) => {
      if (err) {
        console.error("Error writing to data.json file: ", err);
        return res.status(500).send("Error writing data to file.");
      }

      console.log("User added successfully!");
      res.send("User added successfully!");
    });
  });
});


//Update user
app.get("/updateUser/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading data.json file.");
      }
  
      const users = JSON.parse(data);
      if (!users.hasOwnProperty(`user${userId}`)) {
        return res.status(404).send(`User with ID ${userId} not found.`);
      }
  
      const updatedUser = {
        name: "updated_user",
        password: "updated_password",
        profession: "updated_profession",
        id: Number(userId),
      };
  
      users[`user${userId}`] = updatedUser;
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "data.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to data.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log(`User with ID ${userId} updated successfully!`);
        res.send(`User with ID ${userId} updated successfully!`);
      });
    });
  });

  //DELETE USER
  app.get("/deleteUser/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile(__dirname + "/" + "data.json", "utf8", function (err, data) {
      if (err) {
        console.error("Error reading the file: ", err);
        return res.status(500).send("Error reading data.json file.");
      }
  
      const users = JSON.parse(data);
      if (!users.hasOwnProperty(`user${userId}`)) {
        return res.status(404).send(`User with ID ${userId} not found.`);
      }
  
      delete users[`user${userId}`];
  
      const updatedData = JSON.stringify(users, null, 2);
  
      fs.writeFile(__dirname + "/" + "data.json", updatedData, (err) => {
        if (err) {
          console.error("Error writing to data.json file: ", err);
          return res.status(500).send("Error writing data to file.");
        }
  
        console.log(`User with ID ${userId} deleted successfully!`);
        res.send(`User with ID ${userId} deleted successfully!`);
      });
    });
  });
  
  //END OF CRUD
  
  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });