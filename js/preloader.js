var loader = document.querySelector(".loaded")

window.addEventListener("load", vanish)

function vanish()  {
    loader.classList.add("disappear")
}

const toggleButton = document.getElementsByClassName("toggle-button")[0]
const listContainer = document.getElementsByClassName("list-container")[0]

toggleButton.addEventListener("click", () => {
   listContainer.classList.toggle("activeButton")
})