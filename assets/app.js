

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDpRYdddiiYvjNwfEUozYXFz1MKj9S2Uus",
    authDomain: "crm-personal-a09ca.firebaseapp.com",
    projectId: "crm-personal-a09ca",
    storageBucket: "crm-personal-a09ca.appspot.com",
    messagingSenderId: "827704755216",
    appId: "1:827704755216:web:6940badfc7fe4ad414f695"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();


  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // El usuario ha iniciado sesión
            console.log('Usuario iniciado:', userCredential.user);
            window.location.href = "dashboard.html"; // Redirigir al dashboard
        })
        .catch(error => {
            console.error('Error de autenticación:', error.message);
            document.getElementById('error-message').innerText = error.message;
        });
});


auth.onAuthStateChanged(user => {
    if (!user) {
        // Si no hay usuario autenticado, redirigir al login
        window.location.href = "index.html";
    } else {
        console.log('Usuario autenticado:', user.email);
        // Mostrar el contenido del dashboard
    }
});