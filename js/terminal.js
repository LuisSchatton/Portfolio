let i = 0
var j = 0

var speed = 5

let elements = [
  ["text", "c_text"],
  ["link1", "c_link1"],
  ["link2", "c_link2"],
  ["link3", "c_link3"],
  ["link4", "c_link4"]
]

/* elements = elements.filter(isNull);
console.log(elements)

function isNull () {
  if ( document.getElementById(elements) == null  ) {
    return true
  } else {
    return false
  }
} */


console.log(elements)

addElements(elements[0][0], elements[0][1])

function addElements(elementID, elementCID) {

  c_element = document.getElementById(elementCID).textContent


  if (j < c_element.length) {

    document.getElementById(elementID).innerHTML += c_element.charAt(j)
    j++

    setTimeout(function () {
      addElements(elementID, elementCID)
    }, speed)
    

  } else {
    i++
    j = 0
    if (i < elements.length) {
      addElements(elements[i][0], elements[i][1])
    }

  }

}

/* if (document.getElementById(elementID) !== null) {
  addElements(elements[i][0], elements[i][1])
} */

