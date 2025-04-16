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
  
  // Init Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const statusText = document.getElementById("loginStatus");
    const googleBtn = document.getElementById("googleLoginBtn");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusText.textContent = "Logging in...";
  
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
  
      try {
        await auth.signInWithEmailAndPassword(email, password);
        statusText.textContent = "✅ Logged in! Redirecting...";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error) {
        statusText.textContent = "⚠️ " + error.message;
      }
    });
  
    // Google Sign-In
    googleBtn.addEventListener("click", async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      try {
        await auth.signInWithPopup(provider);
        statusText.textContent = "🌟 Google Sign-in successful!";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1500);
      } catch (error) {
        console.error(error);
        statusText.textContent = "⚠️ Google Sign-in failed: " + error.message;
      }
    });
  });
  