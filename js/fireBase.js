import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTSRn86V81fCLsgagpHXvEc0RIfcYMEPE",
  authDomain: "towerdefencegame-5a530.firebaseapp.com",
  projectId: "towerdefencegame-5a530",
  storageBucket: "towerdefencegame-5a530.firebasestorage.app",
  messagingSenderId: "58157639757",
  appId: "1:58157639757:web:ee265037988c33ab2ad404",
  measurementId: "G-6EDLH1JKEX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Kai paspaudžiamas mygtukas
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Prisijungė:", user.displayName);
      // čia gali nukreipti žaidėją arba išsaugoti vartotojo info
    })
    .catch((error) => {
      console.error("Prisijungimo klaida:", error.message);
    });
});
