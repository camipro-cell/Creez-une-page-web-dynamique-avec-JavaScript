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
		myFigure.setAttribute ('class', `work-item category-id-0 category-id-${work.categoryId}`);
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
	categories.unshift({id: 0, name: 'Tous'});
	console.log(categories);
	// Looping on each work
	categories.forEach((category, index) => {
		//console.log(category);
		// <button>
		let myButton = document.createElement('button');
		myButton.classList.add('work-filter');
		myButton.classList.add('filters-design');
		//myButton.classList.add('only-guest');
		if(category.id === 0) myButton.classList.add('filter-active');
		myButton.setAttribute('data-filter', category.id);
		myButton.textContent = category.name;
		
		// Adding the new <button> into the existing div.filters
		document.querySelector("div.filters").appendChild(myButton);

		// Click event 
		myButton.addEventListener('click', function(event) {
			event.preventDefault();
			let categoryId = myButton.getAttribute('data-filter');
			document.querySelectorAll('.work-item').forEach(workItem => {
				workItem.style.display = 'none';
				
			});
			document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
				workItem.style.display = 'block';
				
			}); 
			// the clicked button in filters turns green and the others return to their original color
			const onClick = document.querySelectorAll('.work-filter');
				for (let allCategories of onClick) {
					allCategories.addEventListener('click', function() {
					for(let allCategoriesremove of onClick) {
						allCategoriesremove.classList.remove('filter-active')
					}
						allCategories.classList.add('filter-active')
				
				})
			}
			
			   
		});
		


		})
	
	})

.catch(function(err) {
	console.log(err);
});
// Click on logout

			
		//localStorage.removeItem('userId');
       // localStorage.removeItem('token');


	   


// New fetch for works in the modal
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
		
		// <img>
		let myImg = document.createElement('img');
		myImg.setAttribute('src', work.imageUrl);
		myFigure.appendChild(myImg);
		// <figcaption>Abajour Tahina</figcaption>
		let myFigCaption = document.createElement('figcaption');
		myFigCaption.textContent = "éditer";
		myFigure.appendChild(myFigCaption);

		// Adding the new <figure> into the existing div.gallery
		document.querySelector("div.modal-content").appendChild(myFigure);
	});
})
.catch(function(err) {
	console.log(err);
});

// open modal with all galery photos with button "modifier"
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('work').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("update-works");
		modal.style.display = "flex";
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "block";
		
	});
	
	 // close modal with all galery photos with button "x"
	document.getElementById('close-modal').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("update-works");
		modal.style.display = "none";
		window.close = modal;
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "none";
		window.close = modalWorks;

}); 
	
	//open second window of modal with button "Ajouter photo"
	document.getElementById('modal-edit-add').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal-works");
		modal.style.display = "none";
		window.close = modal;
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "block";
		


});
  // close second window of modal with button "x"
	document.getElementById('modal-close-second-window').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("update-works");
		modal.style.display = "none";
		window.close = modal;
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "none";
		window.close = modalEdit;
	


});


})
	
   
	