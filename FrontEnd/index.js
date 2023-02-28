fetch("http://localhost:5678/api/works")
.then(function(response) {
  if(response.ok) {
    return response.json();
  }
})

.then(function(data) 
{
  console.log(data)
})
.catch(function(err) {
console.log(err);
});


  