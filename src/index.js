let addToy = false;
const toyURL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  getToys()
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
function getToys(){
  fetch(toyURL)
  .then((res) => res.json())
  .then((toyArray) => {
    toyArray.forEach((toy) => renderToy(toy))
  })
}

function renderToy(toy){
    let toyBox = document.getElementById('toy-collection')
    let card = document.createElement('div')
    card.className = 'card'
    card.id = toy.id
     
    let cardTitle = document.createElement('h2')
    cardTitle.innerText = toy.name

    let cardLikes = document.createElement('p')
    cardLikes.innerHTML = `${toy.likes} Likes`

    let cardImage = document.createElement('img')
    cardImage.className = 'toy-avatar'
    cardImage.src = toy.image

    let cardButton  = document.createElement('button')
    cardButton.className = `like-btn ${toy.id}`
    cardButton.innerText = 'Like <3'
    
    

    cardButton.addEventListener('click', (event) =>{
      // event.target.className.split(' ')[1]
      addLikes(event.currentTarget)

    })

    card.append(cardTitle, cardLikes, cardImage, cardButton)
    toyBox.appendChild(card)

}
function addLikes(cardId){
  
    let card = document.getElementById(cardId)
    let likeCount = card.childNodes[1].innerText.split(' ')[0]
    likeCount =  parseInt(likeCount) + 1
    console.log(likeCount)
    cardLikes.innerHTML = `${likeCount} Likes`
    
    PATCH http://localhost:3000/toys/:id
headers: 
{
  "Content-Type": "application/json",
  Accept: "application/json"
}

body: JSON.stringify({
  "likes": likeCount
})

}
{/* <div class="card">
<h2>Woody</h2>
<img src=toy_image_url class="toy-avatar" />
<p>4 Likes </p>
<button class="like-btn">Like <3</button>
</div> */}