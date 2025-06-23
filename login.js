import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7ft5S9ktV1HV6N6nhqcotvvDEP6cwxvw",
  authDomain: "vibe-coding-backend-12708.firebaseapp.com",
  projectId: "vibe-coding-backend-12708",
  storageBucket: "vibe-coding-backend-12708.appspot.com",
  messagingSenderId: "925857839253",
  appId: "1:925857839253:web:4527b4df76ac650e64439c"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('loginSubmit').onclick = async function() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert('로그인 성공!');
    window.location.href = 'index.html';
  } catch (error) {
    alert('로그인 실패: ' + error.message);
  }
};
document.getElementById('goTodo').onclick = function() {
  window.location.href = 'index.html';
}; 