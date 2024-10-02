

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
//   const db = firebase.firestore();


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

// Firebase initialization (asegúrate de tener tu firebaseConfig aquí)

auth.onAuthStateChanged(user => {
    if (!user) {
        window.location.href = "index.html"; // Si no hay usuario, redirigir al login
    } else {
        console.log("Usuario autenticado:", user.email);
    }
});

// Referencia a Firestore
const db = firebase.firestore();

// Función para agregar un cliente a Firestore
const clientForm = document.getElementById('client-form');
clientForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;
    const clientPhone = document.getElementById('client-phone').value;
    const clientNotes = document.getElementById('client-notes').value;

    db.collection('clients').add({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        notes: clientNotes,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Cliente agregado!");
        clientForm.reset(); // Limpiar el formulario
        loadClients(); // Cargar la lista de clientes
    }).catch((error) => {
        console.error("Error agregando cliente: ", error);
    });
});

// Función para cargar y mostrar los clientes en la lista
const loadClients = () => {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = ''; // Limpiar la lista antes de cargar los clientes

    db.collection('clients').orderBy('timestamp', 'desc').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const client = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${client.name}</strong><br>
                Email: ${client.email}<br>
                Teléfono: ${client.phone}<br>
                Notas: ${client.notes}
            `;
            clientList.appendChild(li);
        });
    }).catch((error) => {
        console.error("Error al cargar clientes: ", error);
    });
};

// Cargar los clientes cuando se carga la página
document.addEventListener('DOMContentLoaded', loadClients);

// Cerrar sesión
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = "index.html"; // Redirigir al login
    }).catch((error) => {
        console.error("Error al cerrar sesión: ", error);
    });
});