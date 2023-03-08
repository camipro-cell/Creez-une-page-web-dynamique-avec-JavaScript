
let loginFormulary = {
  password: document.querySelector("#password"),
  email: document.querySelector("#email"),
  submit: document.querySelector("#submit"),
};


loginFormulary.submit?.addEventListener('submit', function(event)
{
      event.preventDefault(event.target);
      console.log(event.target);
}); 
  
let user = {
  email: 'sophie.bluel@test.tld',
  password: 'S0phie'
};


fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  body: JSON.stringify(user),
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
 })
  

.then(function(response) {
  if(response.ok) {
    return response.json();
  }
})
.then(function(data) {
  
  console.log(data);
  localStorage.setItem("token", data.token);
  localStorage.setItem("userID", 1)
  if(user.email === true && user.password === true) {
    window.location = "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
  } else {
       
  }
 
 
})
.catch(function(err) {
  console.log(err);
}); 




