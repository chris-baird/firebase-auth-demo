(() => {
  var config = {
    apiKey: process.env.APIKEY,
    authDomain: "auth-test-b4594.firebaseapp.com",
    databaseURL: "https://auth-test-b4594.firebaseio.com",
    projectId: "auth-test-b4594",
    storageBucket: "auth-test-b4594.appspot.com",
    messagingSenderId: "218485155605"
  };
  firebase.initializeApp(config);
  const database = firebase.database();

  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const btnSignUp = document.getElementById("btnSignUp");
  const btnLogout = document.getElementById("btnLogout");
  const idk = document.getElementById("doSomething");

  btnLogin.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnSignUp.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
  });

  idk.addEventListener("click", e => {

    const user = firebase.auth().currentUser
    if (user !== null) {
      console.log("Submitted");
      firebase.database().ref('users/' + user.uid ).set({
          email: txtEmail.value
      })
    } else {
        console.log('Not Logged In');
    }
  });

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid);
      firebase.database().ref('/users/' + user.uid).once('value').then(snap => {
          console.log(snap.val());
      })
    } else {
      console.log("Not Logged In");
    }
  });
})();
