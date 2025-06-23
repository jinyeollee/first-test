import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

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

document.getElementById('signupSubmit').onclick = async function() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  if(password !== password2) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    alert('회원가입이 완료되었습니다!');
    window.location.href = 'login.html';
  } catch (error) {
    alert('회원가입 실패: ' + error.message);
  }
}; 