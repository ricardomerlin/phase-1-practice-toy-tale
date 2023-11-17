let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch (`http://localhost:3000/toys`)
  .then(res => res.json())
  .then(data => {
    submitNewToy(data)
    for (let i of data) {
      renderToys(i)
    }
  })

  function renderToys(data) {
    let toysContainer = document.getElementById('toy-collection');
    let createToySpace = document.createElement('div');
    createToySpace.className = 'card';
    toysContainer.appendChild(createToySpace);


    let toyName = document.createElement('h2');
    toyName.textContent = data.name;
    createToySpace.appendChild(toyName);

    let toyImage = document.createElement('img');
    toyImage.src = data.image;
    toyImage.className = 'toy-avatar'
    createToySpace.appendChild(toyImage);

    let toyLikes = document.createElement('p')
    toyLikes.textContent = data.likes + " Likes"
    createToySpace.appendChild(toyLikes)

    let likeButton = document.createElement('button')
    likeButton.textContent = "Like"
    createToySpace.appendChild(likeButton)

    let count = parseInt(toyLikes.textContent)
    likeButton.addEventListener('click', (e) => {
      e.preventDefault()
      count++
      toyLikes.textContent = count + " Likes"

      fetch (`http://localhost:3000/toys/${data.id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          likes: parseInt(toyLikes.textContent)
        })
      })

    })
  }
  
  function submitNewToy(data) {

    let toyForm = document.getElementsByClassName('add-toy-form')[0]
    
    toyForm.addEventListener('submit', (e) => {

      e.preventDefault()
      let newToyName = e.target.name.value
      let newToyImage = e.target.image.value

      fetch (`http://localhost:3000/toys`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          "name": newToyName,
          "image": newToyImage,
          "likes": 0,
        })
      })

    .then(res => res.json())
    .then(data => {
        renderToys(data)
    })
    })
  }