
// Getting existing works from api
fetch("http://localhost:5678/api/works") 
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
.then(function(data) {
	let works = data;
	console.log(works);
	// Looping on each work
	works.forEach((work, index) => {
		//console.log(work);
		// <figure>
		let myFigure = document.createElement('figure');
		myFigure.setAttribute ('class','work-item category-id-?');
		// <img src="assets/images/abajour-tahina.png" alt="Abajour Tahina">
		let myImg = document.createElement('img');
		myImg.setAttribute('src', work.imageUrl);
		myImg.setAttribute('alt', work.title);
		myFigure.appendChild(myImg);
		// <figcaption>Abajour Tahina</figcaption>
		let myFigCaption = document.createElement('figcaption');
		myFigCaption.textContent = work.title;
		myFigure.appendChild(myFigCaption);

		// Adding the new <figure> into the existing div.gallery
		document.querySelector("div.gallery").appendChild(myFigure);

	});
})
.catch(function(err) {
	console.log(err);
});

// Getting existing categories from api
fetch("http://localhost:5678/api/categories")
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
.then(function(data) {
	let categories = data;
	console.log(categories);
	// Looping on each work
	categories.forEach((category, index) => {
		//console.log(category);
    	// <button>
	    let myButton = document.createElement('button');
		myButton.setAttribute('class', 'work-filter filters-design');
		myButton.setAttribute('data-filter', category.id);
		
		myButton.textContent = category.name;
		
		// Adding the new <button> into the existing div.filters
		document.querySelector("div.filters").appendChild(myButton);

		// Click event 
		document.querySelector(".filter-all-categories").addEventListener('click', function(event) {
			event.preventDefault(event.target);
			myButton.getAttribute('data-filter');
			console.log(event.target); },
		
			myButton.addEventListener('click', function(event) {
				event.preventDefault(event.target);
				myButton.getAttribute('data-filter');
				console.log(event.target);
		
		
		})
	)
  })})


		
.catch(function(err) {
	console.log(err);
}) ;
