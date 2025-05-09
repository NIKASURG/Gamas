import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTSRn86V81fCLsgagpHXvEc0RIfcYMEPE",
  authDomain: "towerdefencegame-5a530.firebaseapp.com",
  projectId: "towerdefencegame-5a530",
  storageBucket: "towerdefencegame-5a530.firebasestorage.app",
  messagingSenderId: "58157639757",
  appId: "1:58157639757:web:ee265037988c33ab2ad404",
  measurementId: "G-6EDLH1JKEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let user;
const provider = new GoogleAuthProvider();

// Check user authentication status on page load
onAuthStateChanged(auth, (userCredential) => {
  if (userCredential) {
    user = userCredential;
    console.log("Prisijungė:", user.displayName);
    document.getElementById("showLogin").style.display = "none";
    document.getElementById("showLogout").style.display = "block";
    document.getElementById("userEmail").textContent = user.email;

    // Optionally, load user-specific data (e.g., results)
    loadUserData(user);
  } else {
    console.log("Naudotojas neprisijungęs");
    document.getElementById("showLogin").style.display = "block";
    document.getElementById("showLogout").style.display = "none";
    document.getElementById("userEmail").textContent = "";
  }
});

// Google Login
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      user = result.user;
      console.log("Prisijungė:", user.displayName);

      // Save user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        lastLogin: new Date()
      });

      document.getElementById("showLogin").style.display = "none";
      document.getElementById("showLogout").style.display = "block";
      document.getElementById("userEmail").textContent = user.email;
      loadUserData()
    })
    .catch((error) => {
      console.error("Prisijungimo klaida:", error.message);
    });
});

// Google Logout
document.getElementById("google-logout").addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      console.log("Atsijungė");
      document.getElementById("showLogin").style.display = "block";
      document.getElementById("showLogout").style.display = "none";
      document.getElementById("userEmail").textContent = "";
    })
    .catch((error) => {
      console.error("Atsijungimo klaida:", error.message);
    });
});

// Save game data in Firestore (subcollection under user)

// Save game data in Firestore (perrašyti esamus duomenis)
export async function saveDataInFireStore(gameState) {
  gameState = {
    wave: wave,
    savasData: savasData,
      };

  if (user) {
    try {
      const docRef = doc(db, "users", user.uid, "results", "gameData"); // Pakeisk "gameData" į norimą dokumento ID
      await setDoc(docRef, {
        gameState: gameState
      });
      console.log("Duomenys sėkmingai perrašyti.");
    } catch (e) {
      console.error("Klaida perrašant duomenis: ", e);
    }
  } else {
    console.log("Naudotojas neprisijungęs, negalima išsaugoti duomenų.");
  }
}


// Example function to get data (you can customize it as needed)
export async function loadUserData() {
  const querySnapshot = await getDocs(collection(db, "users", user.uid, "results"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const data = (doc.id, " => ", doc.data()).gameState;
    wave = data.wave;
    savasData = data.savasData;
    console.log(wave,data)
  });
  
}
setInterval(saveDataInFireStore,5000*60)
