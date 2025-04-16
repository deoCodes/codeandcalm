// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDe3lvdaYg76LiAVicYcqgUgPs5yKzDA8M",
  authDomain: "calmandcoders.firebaseapp.com",
  projectId: "calmandcoders",
  storageBucket: "calmandcoders.firebasestorage.app",
  messagingSenderId: "695944043480",
  appId: "1:695944043480:web:90f16d5ed1f54f199bf0ad",
  measurementId: "G-XSWPJVJFH1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const statusText = document.getElementById("registerStatus");
  const googleBtn = document.getElementById("googleSignIn");

  // Email/Password registration
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusText.textContent = "Creating account...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      await auth.createUserWithEmailAndPassword(email, password);
      statusText.textContent = "🎉 Account created! Redirecting...";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
      statusText.textContent = "⚠️ " + error.message;
    }
  });

  // Google sign-in
  googleBtn.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
      statusText.textContent = "✅ Signed in with Google!";
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } catch (error) {
      console.error("Google Sign-in error:", error);
      statusText.textContent = "⚠️ " + error.message;
    }
  });
});
