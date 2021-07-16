// localStorage.clear();
// created array for new user.
var arrNewUser = new Array();

let oldUserArr = localStorage.getItem("data");

const d = new Date();
// console.dir(`${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`);
// console.dir(document.getElementById("welcome"))

function submit() {
  var todos = [];

  let fullname = document.getElementById("fullname").value;
  //   console.log(fname);
  let email = document.getElementById("email").value;
  //   console.log(lname);
  let number = document.getElementById("number").value;
  //   console.log(username);
  let password = document.getElementById("password").value;
  //   console.log(password);
  let dob = document.getElementById("dob").value;
    // console.log(dob);
  let gender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
    // console.dir(gender);
  if(oldUserArr !== ""){
    arrNewUser = JSON.parse(localStorage.getItem("data"));
  }

  let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let numberReg = /^[0-9]{10}/;
  let passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  


  if(fullname=="" || email=="" || number=="" || password ==""|| dob=="" || gender=="0"){
    document.getElementById("err").textContent = "Please provide all information.";
    return;
  }

  if(emailReg.test(email)==false || numberReg.test(number)==false || passwordReg.test(password)==false){
    document.getElementById("err").textContent = "Please provide correct details";
  }
  let data = JSON.parse(localStorage.getItem("data"));
  if(data == null){
    data=[];
  }
  for (let i = 0; i < data.length; i++) {
    if (email == data[i].email) {
      // console.dir(document.getElementById("err"))
      document.getElementById("err").textContent = "User already exist.";
      return;
    }
  }

  if(arrNewUser==null){
    arrNewUser=[];
  }

  arrNewUser.push({
    "fullname": fullname,
    "email": email,
    "number": number,
    "dob":dob,
    "gender":gender,
    "password": password,
    "todos": todos,
  });


  localStorage.setItem("data", JSON.stringify(arrNewUser));

  localStorage.setItem("activeAccount", email);

  window.location.href = "home.html";
  // document.getElementById("welcome").innerText = `Welcome ${username1}`;
  // showNotes();
}

function login(){
  var username = document.getElementById("username").value;
  //   console.log(email);
  let password = document.getElementById("password").value;
  //   console.log(password);

  let data = JSON.parse(localStorage.getItem("data"));
  if(data == null){
    data=[];
  }
  //   console.log(data);

  for (let i = 0; i < data.length; i++) {
    var count = 0;
    // console.log(data[i]);
    if ((data[i].email == username && data[i].password == password) || (data[i].number == username && data[i].password == password)) {
      window.location.href = "home.html";
      
      count++;
      localStorage.setItem("activeAccount", data[i].email);
      showNotes();
      break;
    }
  }
  if (count == 0) {
    alert("Something went wrong. Please check user details.");
  }
}

function logout(){
  // let userEmail = localStorage.getItem("activeUser");
  localStorage.removeItem("activeAccount");
  window.location.href = "index.html";
}

function editProfileFillDetails(){
    let user = localStorage.getItem("activeAccount");
    // console.log(user);
    let allUser = JSON.parse(localStorage.getItem("data"));
    // console.log(allUser);
    for (let index = 0; index < allUser.length; index++) {
      // console.log(user + "  " + allUser[index].fullname)
      if (user == allUser[index].email) {
        // console.dir(document.getElementById("fullname"));
        // console.dir(document.getElementById("email"));
        // console.dir(document.getElementById("number"));
        // console.dir(document.getElementById("dob"));
        // console.dir(document.getElementById("gender"));
        // console.dir(document.getElementById("password"));
        document.getElementById("fullname").value = allUser[index].fullname;
        document.getElementById("email").value = allUser[index].email;
        document.getElementById("number").value = allUser[index].number;
        document.getElementById("dob").value = allUser[index].dob;
        document.getElementById("gender").value = allUser[index].gender;
        document.getElementById("password").value = allUser[index].password;
      }
    }
    
  }

  function editProfile(){
    let user = localStorage.getItem("activeAccount");
    let allUser = JSON.parse(localStorage.getItem("data"));

    let newFullName = document.getElementById("fullname").value;
    let newEmail = document.getElementById("email").value;
    let newNumber = document.getElementById("number").value;
    let newDob = document.getElementById("dob").value;
    let newGender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
    let newPassword = document.getElementById("password").value;

    // console.log(newFname + " " + newLname + " " + newPassword);

    for (let index = 0; index < allUser.length; index++) {
      if (user == allUser[index].email) {
        allUser[index].fullname = newFullName;
        allUser[index].email = newEmail;
        allUser[index].number = newNumber;
        allUser[index].dob = newDob;
        allUser[index].gender = newGender;
        allUser[index].password = newPassword;
      }
    }

    localStorage.setItem("data", JSON.stringify(allUser))
    localStorage.setItem("activeAccount", newEmail)
     
    window.alert("Your profile has been successfully updated.");
    window.location.href = "home.html";
    showNotes();
  }


  function deleteAccount() {
    let want = confirm("Are you sure you want to delete your account?")
    if(want){
      let user = localStorage.getItem("activeAccount");
      let allUser = JSON.parse(localStorage.getItem("data"));
      // console.log(user);
      for (let index = 0; index < allUser.length; index++) {
        if (user == allUser[index].email) {
          allUser.splice(index,1);
          // console.log(allUser);
          localStorage.setItem("data",JSON.stringify(allUser));
          localStorage.removeItem("activeAccount");
        }
      }
    window.location.href = "index.html";
    }
  }


  function addNote() {
    console.log("hello")
    let addBtn = document.getElementById("addBtn");
    let addTxt1 = document.getElementById("addTxt").value;
  
    let currentTime = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    let addTxt = {"notedata":addTxt1,"time":currentTime};
    console.log(addTxt)

    document.getElementById("addTxt").value = "";
    let data = JSON.parse(localStorage.getItem("data"));
    let userEmail= localStorage.getItem("activeAccount");
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == userEmail) {
        data[i].todos.push(addTxt);
        break;
      }
    }
    //   console.log(data);
    localStorage.setItem('data', JSON.stringify(data));
    showNotes();
  }



  function showNotes() {
    let data = JSON.parse(localStorage.getItem("data"));
    let username = localStorage.getItem("activeAccount");
    for (let i = 0; i < data.length; i++) {
      if (data[i].email == username) {
        var notesArr = data[i].todos;
        // document.getElementById("welcome").innerText = `Welcome ${data[i].fname}`;
        // console.log(notesArr);
      }
    }
  // console.log(notesArr);
  
  
    let html = "";
    if(notesArr==undefined){
      notesArr = [];
    }
    notesArr.forEach(function (element, index) {
      // console.log(element);
      html += `
              <div class="noteCard" id="${index}main" style="width: 18rem;">
                      <div class="card-body" id="${index}body">
                          <h5 class="card-title" id="${index}heading">Task ${index + 1}</h5>
                          <p class="time">${element["time"]}</p>
                          <textarea rows="5" cols="37" class="card-text" id="${index}Note"> ${element["notedata"]}</textarea><br>
                          <button class="btn btn-success" id="${index}" onclick="markasread(this.id)">Mark as read</button>
                          <button class="btn btn-primary" id="${index}" onclick="editNote(this.id)">Edit</button>
                          <button id="${index}" class="btn btn-danger" onclick="deleteNote(this.id)">Delete</button>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    // console.log(notesElm);
    if (notesArr.length != 0) {
      notesElm.innerHTML = html;
    } else {
      notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
    
  }


  function deleteNote(index) {
    let data = JSON.parse(localStorage.getItem("data"));
    let user = localStorage.getItem("activeAccount");
    let notesArr = [];
    for (let index = 0; index < data.length; index++) {
      // console.log(user + "  " + allUser[index].username)
      if (user == data[index].email) {
        notesArr = data[index].todos;
      }
    }
  
    // console.log(notesArr);
    notesArr.splice(index, 1);
    // console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    showNotes();
  }
  
  function editNote(index) {
    let data = JSON.parse(localStorage.getItem("data"));
    let user = localStorage.getItem("activeAccount");
    let notesArr = [];
    for (let i = 0; i < data.length; i++) {
      if (user == data[i].email) {
        notesArr = data[i].todos;
      }
    }
    // console.log(notesArr);
    let newNote1 = document.getElementById(`${index}Note`).value;
    let currentTime = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;
    let newNote = {"notedata":newNote1,"time":currentTime};
    // console.log(newNote);
    notesArr.splice(index, 1, newNote);
    // console.log(data);
    localStorage.setItem("data", JSON.stringify(data));
    showNotes();
  }


  function markasread(index){
    // console.log(notesArr);
    // console.log(index);
    let cardBody = document.getElementById(`${index}main`);
    cardBody.classList.toggle("fade");
    console.dir(document.getElementById(`${index}`));
    let txt;
    if(document.getElementById(`${index}`).innerText == "Mark as unread"){
      txt = "Mark as read";
    }
    else
    {
      txt = "Mark as unread";
    }
    document.getElementById(`${index}`).innerText = txt;
    // showNotes();
  }

 let timeElement = document.getElementById("current-time");
 

 setInterval(showTime,1000);

 function showTime(){
  const d1 = new Date();
   timeElement.innerText = `Time = ${d1.getHours()}:${d1.getMinutes()}:${d1.getSeconds()}`;
  }
  showTime();


function getData(){
const gifsBox1 = document.querySelector("#gif1");
const gifsBox2 = document.querySelector("#gif2");
const gifsBox3 = document.querySelector("#gif3");

fetch("https://api.giphy.com/v1/gifs/random?api_key=80bfcbf357864cd18518c324f47a7098")
  .then(response => response.text())
  .then(data => {

  let a = JSON.parse(data);
  gifsBox1.src = a.data.images.downsized.url;
});
fetch("https://api.giphy.com/v1/gifs/random?api_key=80bfcbf357864cd18518c324f47a7098")
  .then(response => response.text())
  .then(data => {

  let a = JSON.parse(data);
  gifsBox2.src = a.data.images.downsized.url;
});
fetch("https://api.giphy.com/v1/gifs/random?api_key=80bfcbf357864cd18518c324f47a7098")
  .then(response => response.text())
  .then(data => {

  let a = JSON.parse(data);
  gifsBox3.src = a.data.images.downsized.url;
});
}
getData();


const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})





function getWeatherData(){

var x = document.getElementById("weather");
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
  // x.innerHTML = "Latitude: " + position.coords.latitude +
  // "<br>Longitude: " + position.coords.longitude;
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bc12083e70d2d22298c2df1cec7101d9`)
  .then(response => response.text())
  .then(data => {
  let a = JSON.parse(data);
  console.log(a);
  let temp = (a.main.temp - 273.15).toFixed(1);
  
  let city = a.name;
  let condition = a.weather[0].main;

  document.getElementById("city").innerText = `City = ${city}`;
  document.getElementById("temp").innerText = `Temp = ${temp} °C`;
  document.getElementById("condition").innerText = `Weather = ${condition}`;   
})};
}
getWeatherData();