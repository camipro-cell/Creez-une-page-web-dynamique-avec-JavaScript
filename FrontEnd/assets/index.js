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
		myFigure.setAttribute ('id', `work-item-${work.id}`);
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
		if(category.id === 0) myButton.classList.add('filter-active', 'filter-all');
		myButton.setAttribute('data-filter', category.id);
		myButton.textContent = category.name;
		// Adding the new <button> into the existing div.filters
		document.querySelector("div.filters").appendChild(myButton);
		// Click event 
		myButton.addEventListener('click', function(event) {
			event.preventDefault();
			// Handling filters
			document.querySelectorAll('.work-filter').forEach((workFilter) => {
				workFilter.classList.remove('filter-active');
			});
			event.target.classList.add('filter-active');
			// Handling works
			let categoryId = myButton.getAttribute('data-filter');
			document.querySelectorAll('.work-item').forEach(workItem => {
				workItem.style.display = 'none';
			});
			document.querySelectorAll(`.work-item.category-id-${categoryId}`).forEach(workItem => {
				workItem.style.display = 'block';
			});
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
		myFigure.setAttribute ('id', `work-item-popup-${work.id}`);
		// <img>
		let myImg = document.createElement('img');
		myImg.setAttribute('src', work.imageUrl);
		myImg.setAttribute('alt', work.title);
		myFigure.appendChild(myImg);
		// <figcaption>
		let myFigCaption = document.createElement('figcaption');
		myFigCaption.textContent = 'éditer';
		myFigure.appendChild(myFigCaption);
		// cross icon
		let crossDragDrop = document.createElement('i');
		crossDragDrop.classList.add('fa-solid','fa-arrows-up-down-left-right', 'cross');
		//crossDragDrop.style.display = "none";
		myFigure.appendChild(crossDragDrop);
		// trash icon
		let trashIcon = document.createElement('i');
		trashIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
		myFigure.appendChild(trashIcon);
		// Handling delete
		trashIcon.addEventListener('click', function(event) {
			event.preventDefault();
			console.log(event);
			// Fetch to delete work
			fetch(`http://localhost:5678/api/works/${work.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('token')
				}
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
					case 204:
						console.log("Supprimer le projet");
						delete confirm("Supression réussi!");
						
						// @todo
						// Supprimer le work-item dans la popup
						// Supprimer le work-item dans la page
						// Travail préliminaire : A la création ajouter un id="work-item-X" (et work-popup-item-X) à chacun des work-items
					break;
					default:
						alert("Erreur inconnue");
					break;
				}
			})
			.catch(function(err) {
				console.log(err);
			});
			
		});

		// Adding the new <figure> into the existing div.modal-content
		document.querySelector("div.modal-content").appendChild(myFigure);
	});
})
.catch(function(err) {
	console.log(err);
});

document.addEventListener('DOMContentLoaded', function() {

	// Check if the token and userId are present in the localStorage
	if(localStorage.getItem('token') != null && localStorage.getItem('userId') != null) {
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

	// Click on logout to disconnect
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

	// Open modal with all galery photos with button "modifier"
	document.getElementById('update-works').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "flex";
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "block";
	});

	// Close first window of modal with button "x"
	document.getElementById('button-to-close-first-window').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "none";
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "none";
	});

	// Close second window of modal with button "x"
	document.getElementById('button-to-close-second-window').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modal = document.getElementById("modal");
		modal.style.display = "none";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "none";
	});

	// Open second window of modal with button "Ajouter photo"
	document.getElementById('modal-edit-add').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "none";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "block";
	});

	// Return first window of modal with arrow
	document.getElementById('arrow-return').addEventListener('click', function(event) {
		event.preventDefault();
		console.log(event);
		let modalWorks = document.getElementById("modal-works");
		modalWorks.style.display = "block";
		let modalEdit = document.getElementById("modal-edit");
		modalEdit.style.display = "none";
	});

	// Handling form
	document.getElementById('modal-edit-work-form').addEventListener('submit', function(event) {
		event.preventDefault();
		let formData = new FormData();
		formData.append('title', document.getElementById('form-image').value);
		formData.append('category', document.getElementById('form-image').value);
		formData.append('image', document.getElementById('form-image').files[0]);
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: formData
		})
		.then(function(response) {
			if(response.ok) {
				return response.json();
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
