document.addEventListener('DOMContentLoaded', fetchData());

function fetchData() {
  fetch('http://localhost:3000/users')
  .then(res => res.json())
  .then(users => populateTable(users))
  .catch(() => console.log('error'));
}

function fetchUser() {
  let id = document.getElementById('input').value;
  fetch('http://localhost:3000/users/' + id)
    .then(res => res.json())
    .then(user => populateTable(user))
    .catch(() => console.log('error'));
}

function populateTable(users) {
  let now = new Date();
  let tbody = document.getElementById('tbody');
  for (let user of users) {
    //console.log(user);
    let row = document.createElement('tr');
    delete user._id;
    delete user.__v;
    let bornDate = new Date(user.birthday);
    user.birthday = bornDate.toLocaleDateString('es-AR');
    user.age = now.getFullYear() - bornDate.getFullYear();
    for (let prop in user) {
      //console.log(user[prop]);
      let col = document.createElement('td');
      col.innerHTML = user[prop];
      row.append(col);
    }
    tbody.append(row);
  }
}
