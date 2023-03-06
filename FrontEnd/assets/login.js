
let user = {
  email: 'sophie.bluel@test.tld',
  password: 'S0phie'
};
 
fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user) })


.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
.then(function(token) {
	let login = token;
	console.log(login);
 
})
.catch(function(err) {
	console.log(err);
});
