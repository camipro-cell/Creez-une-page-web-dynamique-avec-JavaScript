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
						delete confirm ("Suppresion réussi!")
						document.querySelectorAll(`#work-item-${work.id}`).forEach(workItem => {
							workItem.parentNode.removeChild(workItem);
							
						});
						console.log(`work-item-${work.id}`);
						
					
						document.querySelectorAll(`#work-item-popup-${work.id}`).forEach(workItemPopup => {
							workItemPopup.parentNode.removeChild(workItemPopup);
							
						});
						console.log(`work-item-popup-${work.id}`);
					
						
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
	
	// close both modal windows with a click outside
	document.querySelectorAll('#modal-works').forEach(modalWorks => {
		modalWorks.addEventListener('click', function(event) {
			event.stopPropagation();
			console.log(event);
		})
	
		document.querySelectorAll('#modal-edit').forEach(modalEdit => {
			modalEdit.addEventListener('click', function(event) {
				event.stopPropagation();
				console.log(event);
		})
	
			document.getElementById("modal").addEventListener('click', function(event) {
				event.preventDefault();
				console.log(event);
				let modal = document.getElementById("modal");
				modal.style.display = "none";
				let modalWorks = document.getElementById("modal-works");
		 		modalWorks.style.display = "none";
				let modalEdit = document.getElementById("modal-edit");
				modalEdit.style.display = "none";
				// Reset form
				document.getElementById('modal-edit-work-form').reset();
				document.getElementById("submit-new-work").disabled = false;
				document.getElementById("submit-new-work").style.backgroundColor= "#A7A7A7";
			});
		});
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
		// Reset form
		document.getElementById('modal-edit-work-form').reset();
		document.getElementById("submit-new-work").disabled = false;
		document.getElementById("submit-new-work").style.backgroundColor= "#A7A7A7";
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
		// Reset form
		document.getElementById('modal-edit-work-form').reset();
		document.getElementById("submit-new-work").disabled = false;
		document.getElementById("submit-new-work").style.backgroundColor= "#A7A7A7";
	});

	
	
	function showPreview(event) {
		if(event.target.files.lenght > 0) {
			let src = URL.createObjectURL(event.target.files[0]);
			let preview = document.getElementById("form-image");
			preview.src = src;
			preview.style.display = "block";
		}
	}
	
		// Binder the checkNewProjectFields() function on the 3 fields by listening to the "input" & "change" events
			document.getElementById('form-title').addEventListener('input', checkNewProjectFields);
			document.getElementById('form-title').addEventListener('change', checkNewProjectFields);
			document.getElementById('form-category').addEventListener('input', checkNewProjectFields);
			document.getElementById('form-category').addEventListener('change', checkNewProjectFields);
			document.getElementById('form-image').addEventListener('input', checkNewProjectFields);
			document.getElementById('form-image').addEventListener('change', checkNewProjectFields);
			//document.getElementById('form-image').addEventListener('input', showPreview);
			//document.getElementById('form-image').addEventListener('change', showPreview);

		// Check the size of the image file
			document.getElementById('form-image').addEventListener('change', () => {
				let file = document.getElementById('form-image').files[0];
				const maxFileSize = 4 * 1024 * 1024; // 4MB
				if (file.size > maxFileSize) {
				  alert("Le fichier sélectionné est trop volumineux. La taille maximale est de 4 Mo.");
				  document.getElementById('form-image').value = ''; 
				}
			  });
		
		// Creation of the checkNewProjectFields() function that checks the image + title + category fields
			function checkNewProjectFields(){
				let title = document.getElementById('form-title');
				let category = document.getElementById('form-category');
				let image = document.getElementById('form-image');
				let submitWork = document.getElementById("submit-new-work");
			if(title.value === "" || category.value === "" || image.value === "") {
				submitWork.disabled = true;
				submitWork.style.backgroundColor= "#A7A7A7";
				
			} else {
				submitWork.disabled = false;
				submitWork.style.backgroundColor= "#1D6154";
			} };

		// Handling form
			document.getElementById("modal-edit-work-form").addEventListener('submit', function(event) {
				event.preventDefault();
				console.log(event);
				let formData = new FormData();
				formData.append('title', document.getElementById('form-title').value);
				formData.append('category', document.getElementById('form-category').value);
				formData.append('image', document.getElementById('form-image').files[0]);
		

	
		
		fetch('http://localhost:5678/api/works', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('token'),
				
			},
			body: formData
		})
				.then(function(response) {
					switch(response.status) {
						case 500:
						case 503:
							alert("Erreur inattendue!");
						break;
						case 400:
						case 404:
							alert("Impossible d'ajouter le nouveau projet!");
						break;
						case 200:
						case 201:
							console.log("Projet ajouté avec succés!");
							return response.json();
						break;
						default:
							alert("Erreur inconnue!");
						break;
					}})
				
		
		.then(function(data) {
	
		console.log(data);
		// Close modal
			let modal = document.getElementById("modal");
			modal.style.display = "none";
			let modalEdit = document.getElementById("modal-edit");
			modalEdit.style.display = "none";
		// Reset form
			document.getElementById('modal-edit-work-form').reset();
			document.getElementById("submit-new-work").disabled = false;
			document.getElementById("submit-new-work").style.backgroundColor= "#A7A7A7";
		
			fetch("http://localhost:5678/api/works") 
			.then(function(response) {
				if(response.ok) {
					return response.json();
				}
			})
			.then(function(data) {
				
				console.log(data);
				let works = data;
				

				
					//<figure>
				works.forEach((work, index=[index.lenght-1] ) => {
					console.log(index);
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
		})
			
			
	.catch(function(err) {
	console.log(err);
});
})
});

