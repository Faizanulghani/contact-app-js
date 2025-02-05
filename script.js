let lActive = document.querySelector(".l-active")
let sActive = document.querySelector(".s-active")
let lActiveBtn = document.querySelector("#l-active-btn")
let sActiveBtn = document.querySelector("#s-active-btn")

sActiveBtn.addEventListener("click", () => {
  lActive.className = "animate__animated animate__fadeInDown active-box"
  lActive.style.opacity = "1"
  lActive.style.zIndex = "0"
  sActive.className = "animate__animated animate__fadeOutUp active-box"
})

lActiveBtn.addEventListener("click", () => {
  sActive.className = "animate__animated animate__fadeInDown active-box"
  sActive.style.opacity = "1"
  sActive.style.zIndex = "0"
  lActive.className = "animate__animated animate__fadeOutUp active-box"
})

// SignUp Functionality
let fName = document.querySelector("#f-name")
let lName = document.querySelector("#l-name")
let gender = document.querySelector("#floatingSelect")
let sUsername = document.querySelector("#s-username")
let sPassword = document.querySelector("#s-password")
let signupBtn = document.querySelector(".signup-btn")
let msg = document.querySelector(".msg")

signupBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let formatUsername = sUsername.value.trim().toLowerCase()
  if (fName.value && lName.value && gender.value != "gender" && formatUsername && sPassword.value) {
    let data = {
      fName: fName.value,
      lName: lName.value,
      sUsername: formatUsername,
      gender: gender.value,
      sPassword: sPassword.value,
    }
    if (localStorage.getItem(formatUsername) != null) {
      msg.innerText = "Username already Exists!"
      setTimeout(() => {
        msg.innerText = ""
      }, 2000)
    } else {
      localStorage.setItem(formatUsername, JSON.stringify(data))
      fName.value = ""
      lName.value = ""
      gender.value = "gender"
      sUsername.value = ""
      sPassword.value = ""
    }

  } else {
    msg.innerText = "Please Fill All Fields"
    setTimeout(() => {
      msg.innerText = ""
    }, 2000)
  }
})


// SignIn Functionality
let username = document.querySelector("#username")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#login-btn")
let lMsg = document.querySelector(".l-msg")

loginBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (username.value && password.value) {
    if (localStorage.getItem(username.value) != null) {
      let lPassword = JSON.parse(localStorage.getItem(username.value)).sPassword
      if (lPassword == password.value) {
        window.location = "./contact/contact.html"
        sessionStorage.setItem("username", username.value)
      } else {
        lMsg.innerText = "Username or Password Wrong!"
        setTimeout(() => {
          lMsg.innerText = ""
        }, 2000)
      }
    } else {
      lMsg.innerText = "Username or Password Wrong!"
      setTimeout(() => {
        lMsg.innerText = ""
      }, 2000)
    }

  } else {
    lMsg.innerText = "Please Fill All Fields"
    setTimeout(() => {
      lMsg.innerText = ""
    }, 2000)
  }
})
