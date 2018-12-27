(() => {
  // Firebase Config
  const config = {
    apiKey: "AIzaSyADDZlV_0uIea8l7vnXUQTCcglIGsYj1_8",
    authDomain: "auth-test-b4594.firebaseapp.com",
    databaseURL: "https://auth-test-b4594.firebaseio.com",
    projectId: "auth-test-b4594",
    storageBucket: "auth-test-b4594.appspot.com",
    messagingSenderId: "218485155605"
  };

  // Firebase Init
  firebase.initializeApp(config);

  // Firebase Data Observer
  const database = firebase.database();
  database.ref("users").on("value", snap => {
    updateDisplay(snap);
  });

  // Update Display
  const updateDisplay = function(data) {
    if (data.val()) {
      const list = Object.values(data.val());
      $list.empty();
      list.forEach(item => {
        const user = firebase.auth().currentUser;
        if (user !== null && item.user === user.uid) {
          $list.append(`<p>${item.email}</p>`);
        }
      });
    }
  };

  // Old
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  const message = document.getElementById("message");
  const idk = document.getElementById("doSomething");

  // New
  const $btnLogin = $("#btnLogin");
  const $btnSignUp = $("#btnSignUp");
  const $btnLogout = $("#btnLogout");
  const $btnIdk = $("#doSomething");
  const $list = $("#list");

  // Login
  btnLogin.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => (message.innerHTML = e.message));
  });

  // Sign Up
  btnSignUp.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => (message.innerHTML = e.message));
  });

  // Logout
  btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    message.innerHTML = "";
  });

  // Testing with database
  idk.addEventListener("click", e => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      database.ref("users/").push({
        user: user.uid,
        email: txtEmail.value
      });
    } else {
      message.innerHTML = "You must log in to do that.";
    }
  });

  // User Observer
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref("users/").once("value", snap => {
        // message.innerHTML = `Welcome ${snap.val().email}`
        // $list.empty();
        updateDisplay(snap);
      });
      $btnLogin.addClass("d-none");
      $btnSignUp.addClass("d-none");
      $btnLogout.removeClass("d-none");
      $btnIdk.removeClass("d-none");
    } else {
      $list.empty();
      message.innerHTML = "You are not logged in.";
      $btnLogin.removeClass("d-none");
      $btnSignUp.removeClass("d-none");
      $btnLogout.addClass("d-none");
      $btnIdk.addClass("d-none");
    }
  });
})();
