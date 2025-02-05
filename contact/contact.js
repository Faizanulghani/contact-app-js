let userName = sessionStorage.getItem("username")

if (userName == null) {
  console.log("None");
  document.body.className = "illigal"
  document.body.innerHTML = "<h2>Illegal Activity</h2>"
}

let welcome = document.querySelector("#welcome")
let welName = JSON.parse(localStorage.getItem(userName))
if (welName.gender == "female") {
  welcome.innerHTML = `<span>Welcome <strong>Ms.${welName.sUsername}</strong> in Our Contact App</span>`
} else {
  welcome.innerHTML = `<span>Welcome <strong>Mr.${welName.sUsername}</strong> in Our Contact App</span>`
}

// Logout Functionality
let logoutBtn = document.querySelector("#logout-btn")

logoutBtn.addEventListener('click', () => {
  window.location = "../index.html"
  sessionStorage.removeItem("username")
})

// Create Accordion Functionality
let name = document.querySelector('.name')
let number = document.querySelector('.number')
let createBtn = document.querySelector("#create-btn")
let changeBtn = document.querySelector("#update-btn")
let contactDetails = document.querySelector(".contact-details")

let arrayList = JSON.parse(localStorage.getItem(userName + "_list")) || []
if (localStorage.getItem(userName + "_list") != null) {
  arrayList = JSON.parse(localStorage.getItem(userName + "_list")) || []
  arrayList.forEach(task => {
    createAccordion(task)
  });
}

createBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (name.value && number.value) {
    createAccordion()
    updateLocalStorage()
  } else {
    alert("Fill Both Fields")
  }
})

function createAccordion(task) {
  let i;
  let name_el = name.value
  let number_el = number.value
  if (task) {
    name_el = task.co_name
    number_el = task.co_number
  }
  let accordion = document.createElement("div")
  accordion.className = "accordion mb-3"
  let allAccordion = contactDetails.querySelectorAll(".accordion")
  for (i = 0; i < allAccordion.length; i++) {

  }
  accordion.innerHTML = `
    <div class="accordion-item">
              <h5 class="accordion-header">
                <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}">${name_el}</button>
              </h5>
              <div class="accordion-collapse collapse" id="collapse-${i}">
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-6">
                      <h5 id="contact-${i}">${name_el}</h5>
                      <p>${number_el}</p>
                    </div>
                    <div class="col-md-6 d-flex justify-content-around align-items-center position-relative">
                      <i class="fa-regular fa-message"></i>
                      <i class="fa-solid fa-phone-flip"></i>
                      <i class="fa-solid fa-ellipsis-vertical op-btn"></i>
                      <div class="option-box opacity">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <i class="fa-solid fa-trash"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `
  contactDetails.append(accordion)
  name.value = ""
  number.value = ""

  accordion.querySelector(".op-btn").addEventListener('click', function () {
    this.nextElementSibling.classList.toggle("opacity")
  })

  // Delete Functionality
  let delBtn = accordion.querySelector(".fa-trash")
  delBtn.onclick = function () {
    accordion.remove()
    updateLocalStorage()
    createRestored(accordion)
  }

  // Update Functionality
  let updateBtn = accordion.querySelector(".fa-pen-to-square")
  updateBtn.onclick = function () {
    let parent = this.parentElement.parentElement.parentElement
    let h5 = parent.getElementsByTagName('h5')
    let p = parent.getElementsByTagName('p')
    name.value = h5[0].innerHTML
    number.value = p[0].innerHTML
    createBtn.classList.add("d-none")
    changeBtn.classList.remove("d-none")

    changeBtn.onclick = function () {
      let coName = name.value
      let coNumber = number.value
      let id = h5[0].getAttribute("id").replace("contact-", "")
      updateLocalStorage(coName, coNumber, id)

    }
  }

}

let updateLocalStorage = (name, number, id) => {
  if (name && number) {
    arrayList[id] = {
      co_name: name,
      co_number: number
    }
  } else {
    arrayList = []
    let accordion = contactDetails.querySelectorAll(".accordion")
    for (let i = 0; i < accordion.length; i++) {
      let h5 = accordion[i].getElementsByTagName("h5")[1]
      let p = accordion[i].getElementsByTagName("p")[0]
      arrayList.push({
        co_name: h5.innerHTML,
        co_number: p.innerHTML,
      })
    }
  }
  localStorage.setItem(userName + "_list", JSON.stringify(arrayList))

}

// Search Functionality
let search = document.querySelector("#search")
search.addEventListener('input', (e) => {
  let searchValue = e.target.value.toLowerCase()
  let accordion = contactDetails.getElementsByClassName("accordion")
  for (let i = 0; i < accordion.length; i++) {
    const h5 = accordion[i].getElementsByTagName("h5")[1].innerHTML;
    if (h5.toLowerCase().includes(searchValue)) {
      accordion[i].style.display = ""
    } else {
      accordion[i].style.display = "none"
    }
  }
})

// Restore Accordion Functionality
let restoreDelete = document.querySelector("#restore-delete")
let restoreList = JSON.parse(localStorage.getItem(userName + "_restore")) || []
if (localStorage.getItem(userName + "_restore") != null) {
  restoreList.forEach(task => {
    restoreDeleted(task.coName, task.coNumber)
  });
}

let createRestored = (accordion) => {
  let h5 = accordion.getElementsByTagName("h5")[1].innerHTML
  let p = accordion.getElementsByTagName("p")[0].innerHTML
  restoreList.push({
    coName: h5,
    coNumber: p
  })
  localStorage.setItem(userName + "_restore", JSON.stringify(restoreList))

  restoreDeleted(h5, p)
}

function restoreDeleted(name, number) {
  let i
  let name_el = name
  let number_el = number
  let accordion = document.createElement("div")
  accordion.className = "accordion mb-3"
  let allAccordion = restoreDelete.querySelectorAll(".accordion")
  for (i = 0; i < allAccordion.length; i++) {

  }
  accordion.innerHTML = `
    <div class="accordion-item">
              <h5 class="accordion-header">
                <button class="accordion-button" data-bs-toggle="collapse" data-bs-target="#restore-${i}">${name_el}</button>
              </h5>
              <div class="accordion-collapse collapse" id="restore-${i}">
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-6">
                      <h5 id="contact-${i}">${name_el}</h5>
                      <p>${number_el}</p>
                    </div>
                    <div class="col-md-6 d-flex justify-content-around align-items-center position-relative">
                        <i class="fa-solid fa-window-restore restore-btn"></i>
                        <i class="fa-solid fa-trash delete-btn"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `
  restoreDelete.append(accordion)

  let resBtn = accordion.querySelector(".restore-btn")
  resBtn.addEventListener('click', () => {
    createAccordion({ co_name: name, co_number: number })
    updateLocalStorage()
    accordion.remove()

    let restoreList = JSON.parse(localStorage.getItem(userName + "_restore")) || []
    restoreList = restoreList.filter((item) => item.coName != name_el)
    localStorage.setItem(userName + "_restore", JSON.stringify(restoreList))
  })

  let delBtn = accordion.querySelector(".delete-btn")
  delBtn.addEventListener('click', () => {
    accordion.remove()

    let restoreList = JSON.parse(localStorage.getItem(userName + "_restore")) || []
    restoreList = restoreList.filter((item) => item.coName != name_el)
    localStorage.setItem(userName + "_restore", JSON.stringify(restoreList))
  })
}