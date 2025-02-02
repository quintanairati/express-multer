var express = require('express');
var router = express.Router();

const mongojs = require('mongojs')
const db = mongojs('ErabiltzaileakDB', ['erabiltzailea'])

let users = [];

db.erabiltzailea.find( function (err, userdocs) {
  if (err) {
    console.log(err)
  } else {
    users = userdocs
  }
})

/*
db.erabiltzailea.insert(users, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Usuario insertado correctamente:', result);
  }
});
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  res.json(users)
});

router.post("/new", (req, res) => {
  users.push(req.body);
  db.erabiltzailea.insert(req.body, function (err, user) {
    if(err) {
      console.log(err)
    } else {
      console.log(user)
      res.json(user);
    }
  })
});

/*
let updateUser = (id) => {
  let row = document.getElementById(id);
  let izena = row.children[1].children[0].value;
  let abizena = row.children[2].children[0].value;
  let email = row.children[3].children[0].value;
  row.innerHTML = `
  <th scope="row">${id}</th>
  <td>${izena}</td>
  <td>${abizena}</td>
  <td>${email}</td>
  <td> <a onclick="deleteUser('${id}')">[x]</a> <a onclick="editUser('${id}')">[e]</a>  </td>
  `;

  let user = {
      izena: izena,
      abizena: abizena,
      avatar: avatar,
      email: email
  }

  fetch(`/users/update/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  // handle the response data or action
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

let editUser = (id) => {
  let row = document.getElementById(id);
  let izena = row.children[1].innerHTML;
  let abizena = row.children[2].innerHTML;
  let email = row.children[3].innerHTML;
  row.innerHTML = `
  <th scope="row">${id}</th>
  <td><input type="text" id="izena" value="${izena}"></td>
  <td><input type="text" id="abizena" value="${abizena}"></td>
  <td><input type="text" id="email" value="${email}"></td>
  <td> <input type="button" onclick="updateUser('${id}')" value="Save"> </td>
  `;
}

let insertUser = (user) => {
var tableBody = document.getElementById("userTableBody");

// Loop through each user in the JSON array

// Create a new row and set its innerHTML based on the user data
var newRow = tableBody.insertRow();
newRow.setAttribute("id", user.id);
newRow.innerHTML = `
              <th scope="row">${user.id}</th>
              <td>${user.izena}</td>
              <td>${user.abizena}</td>
              <td>${user.email}</td>
              <td><a onclick="deleteUser('${user.id}')">[x]</a> <a onclick="editUser('${user.id}')">[e]</a>  </td>
          `;
};

let deleteUser = (id) => {
  fetch(`/users/delete/${id}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  // handle the response data or action
  })
  .catch((error) => {
      console.error('Error:', error);
  });

  let row = document.getElementById(id);
  row.parentNode.removeChild(row);
}

document.addEventListener("DOMContentLoaded", function () {
document.getElementById("formularioa").addEventListener("submit", (e) => {
  e.preventDefault();
  
  let user = {
      izena: e.target.izena.value,
      abizena: e.target.abizena.value,
      id: Date.now(),
      email: e.target.email.value
  }

  insertUser(user);

  fetch("/users/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // handle the response data or action
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Sample JSON array of users

fetch("/users/list")
  .then((r) => r.json())
  .then((users) => {
    console.log(users);
    // Select the table body where new rows will be appended

    users.forEach((user) => {
      insertUser(user);
    });
  });
});
*/
module.exports = router;
