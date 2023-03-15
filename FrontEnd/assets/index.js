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
			const clickOnFilter = document.querySelectorAll('.work-filter');
				for (let allCategories of clickOnFilter) {
					allCategories.addEventListener('click', function() {
					for(let allCategoriesremove of clickOnFilter) {
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


// New fetch to see all works in the modal
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
		// <img>
		let myImg = document.createElement('img');
		myImg.setAttribute('src', work.imageUrl);
		myImg.setAttribute('alt', work.title);
		myFigure.appendChild(myImg);
		// <figcaption>
		let myFigCaption = document.createElement('figcaption');
		myFigCaption.textContent = 'éditer';
		myFigure.appendChild(myFigCaption);
		// trash icon 
		let trashIcon = document.createElement('i');
		trashIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
		myFigure.appendChild(trashIcon);

		// Adding the new <figure> into the existing div.modal-content
		document.querySelector("div.modal-content").appendChild(myFigure);
		
	});
})
.catch(function(err) {
	console.log(err);
});


document.addEventListener('DOMContentLoaded', function() {
	// Check if the token and userId are present in the localStorage
	
	if(localStorage.getItem('token', 'userID') != null) {
		document.querySelector('body').classList.add('connected');
		let topBar = document.getElementById('top-bar');
		topBar.style.display = "flex";
		let filters = document.getElementById('all-filters');
		filters.style.display = "none";
		let space = document.getElementById('space-only-admin');
		space.style.paddingBottom = "100px";
		let introduction = document.getElementById('space-introduction-in-mode-admin');
		introduction.style.marginTop = "-50px";
	}
		
	// click on logout to deconnect
	document.getElementById('nav-logout').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		document.querySelector('body').classList.remove(`connected`);
	    let topBar = document.getElementById('top-bar');
		topBar.style.display = "none";
		let filters = document.getElementById('all-filters');
		filters.style.display = "flex";
		let space = document.getElementById('space-only-admin');
		space.style.paddingBottom = "0"; 
		
	
	});
	
	// open modal with all galery photos with button "modifier"
	document.getElementById('update-works').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "flex";
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "block";
		
	});
	
	 // close  first window of modal with button "x"
	document.getElementById('button-to-close-first-window').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "none";
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "none";

	}); 

	// open second window of modal with button "Ajouter photo"
	document.getElementById('modal-edit-add').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "none";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "block";
	
	});
	
  	// close second window of modal with button "x"
	document.getElementById('button-to-close-second-window').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "none";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "none";
	
	});
	
	// return first window of modal with arrow
	document.getElementById('arrow-return').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "block";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "none";

	});

	// Fetch to delete work
	document.getElementById('delete-all').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		
		fetch(`http://localhost:5678/api/works/{id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: null,
		})
		.then(function(response) {
			switch(response.status) {
				case 500:
					alert("Comportement inattendu!");
				break;
				case 401:
					alert("Suppresion impossible!");
				break;
				case 200:
					console.log("Supprimer le projet");
					return response.json();
				break;
				default:
					alert("Erreur inconnue");
				break;
			}
		})
		.then(function(data) {
			console.log(data);
			
			
			
		})
	
		.catch(function(err) {
			console.log(err);
		});
	});
	

})
	
	

// Fetch to send a new work
document.addEventListener('DOMContentLoaded', function() {
	
fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
			image: "string($binary)",
			title: "string",
			category: "integer($int64)"

			})
		})
		.then(function(response) {
			if(response.ok) {
				return response.json();
			}
			}
		)
		.then(function(data) {
			console.log(data);
		
		
	})
	
		
		
		.catch(function(err) {
			console.log(err);
		});
})
