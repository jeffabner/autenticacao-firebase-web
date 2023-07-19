// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC_hxNAiGfW5BC6TXmFsTAbToE0AQwXJxk",
    authDomain: "autenticacao-a8aba.firebaseapp.com",
    projectId: "autenticacao-a8aba",
    storageBucket: "autenticacao-a8aba.appspot.com",
    messagingSenderId: "611843672712",
    appId: "1:611843672712:web:0759c99e48f80737f3ad3d",
    measurementId: "G-RX58KZCWRK"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  senha = document.getElementById('senha').value
  repetir_senha = document.getElementById('repetir_senha').value
  nome_completo = document.getElementById('nome_completo').value
  cpf = document.getElementById('cpf').value
  telefone = document.getElementById('telefone').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(senha) == false) {
    alert('E-mail ou senha inválido!!')
    return
    // Don't continue running the code
  }
  if (validate_field(nome_completo) == false || validate_field(cpf) == false || validate_field(telefone) == false) {
    alert('Um ou mais campos extras estão inválidos!!')
    return
  }
    // Validate input fields
  if (senha !=repetir-senha) {
    alert('senha confirmada diferente!')
    return
    // Don't continue running the code
  }
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, senha)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      nome_completo : nome_completo,
      cpf : cpf,
      telefone : telefone,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('usuarios/' + user.uid).set(user_data)

    // DOne
    alert('Usuário Criado!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email_login').value
  password = document.getElementById('password_login').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('E-mail ou senha inválido!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('Usuário logado!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
