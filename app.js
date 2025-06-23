  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
  import { getDatabase, ref, push, onValue, set, remove, update } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
  import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD7ft5S9ktV1HV6N6nhqcotvvDEP6cwxvw",
    authDomain: "vibe-coding-backend-12708.firebaseapp.com",
    projectId: "vibe-coding-backend-12708",
    storageBucket: "vibe-coding-backend-12708.firebasestorage.app",
    messagingSenderId: "925857839253",
    appId: "1:925857839253:web:4527b4df76ac650e64439c",
    databaseURL: "https://vibe-coding-backend-12708-default-rtdb.asia-southeast1.firebasedatabase.app/"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

  // 로그인/로그아웃 및 환영 메시지 처리
  const loginBtn = document.getElementById('loginBtn');
  const welcomeMsg = document.getElementById('welcomeMsg');

  function setWelcomeUI(user) {
    if (user) {
      welcomeMsg.textContent = `${user.displayName || user.email} 님 환영합니다.`;
      loginBtn.textContent = '로그아웃';
      loginBtn.onclick = async function() {
        await signOut(auth);
        window.location.reload();
      };
    } else {
      welcomeMsg.textContent = '';
      loginBtn.textContent = '로그인';
      loginBtn.onclick = function() {
        window.location.href = 'login.html';
      };
    }
  }
  onAuthStateChanged(auth, setWelcomeUI);

// 메모 저장 및 불러오기 (Firebase 사용)
const memoInput = document.getElementById('memoInput');
const addBtn = document.getElementById('addBtn');
const memoList = document.getElementById('memoList');
const clearBtn = document.getElementById('clearBtn');

// 저장된 메모 불러오기 (Firebase)
function loadMemos() {
  const memosRef = ref(db, 'memos');
  onValue(memosRef, (snapshot) => {
    const memos = snapshot.val() || {};
    memoList.innerHTML = '';
    Object.entries(memos).reverse().forEach(([key, memo]) => {
      const li = document.createElement('li');
      li.className = 'memo-item' + (memo.checked ? ' checked' : '');
      li.innerHTML = `
        <div class="memo-left">
          <button class="check-btn" data-key="${key}" title="완료">
            ${memo.checked ? '✔️' : '☐'}
          </button>
          <span class="memo-text">${memo.text}</span>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2px;">
          <span style="font-size:0.92em; color:#888;">${memo.author ? (memo.author.name || memo.author.email || '작성자 없음') : '작성자 없음'}</span>
          <button class="delete-btn" data-key="${key}" title="삭제">
            <svg viewBox="0 0 32 32">
              <rect x="6" y="8" width="20" height="18" rx="2" fill="#fff" stroke="#222" stroke-width="2"/>
              <rect x="12" y="14" width="2" height="8" fill="#222"/>
              <rect x="18" y="14" width="2" height="8" fill="#222"/>
              <rect x="10" y="6" width="12" height="3" rx="1" fill="#fff" stroke="#222" stroke-width="2"/>
            </svg>
          </button>
          <button class="star-btn${memo.starred ? ' active' : ''}" data-key="${key}" title="중요">
            ★
          </button>
        </div>
      `;
      memoList.appendChild(li);
    });
  });
}

// 메모 추가 (Firebase)
function addMemo() {
  const value = memoInput.value.trim();
  if (!value) return;
  const user = auth.currentUser;
  if (!user) {
    alert('로그인 후 할일을 추가할 수 있습니다.');
    return;
  }
  const memosRef = ref(db, 'memos');
  push(memosRef, {
    text: value,
    checked: false,
    starred: false,
    author: {
      uid: user.uid,
      name: user.displayName || '',
      email: user.email || ''
    }
  });
  memoInput.value = '';
}
addBtn.addEventListener('click', addMemo);
memoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addMemo();
  }
});

// 체크/삭제/별 이벤트 (Firebase)
memoList.addEventListener('click', (e) => {
  const checkBtn = e.target.closest('.check-btn');
  const deleteBtn = e.target.closest('.delete-btn');
  const starBtn = e.target.closest('.star-btn');
  if (checkBtn) {
    const key = checkBtn.getAttribute('data-key');
    const memoRef = ref(db, `memos/${key}`);
    // 현재 checked 상태를 토글
    onValue(memoRef, (snapshot) => {
      const memo = snapshot.val();
      if (memo) {
        update(memoRef, { checked: !memo.checked });
      }
    }, { onlyOnce: true });
  } else if (deleteBtn) {
    const key = deleteBtn.getAttribute('data-key');
    const memoRef = ref(db, `memos/${key}`);
    remove(memoRef);
  } else if (starBtn) {
    const key = starBtn.getAttribute('data-key');
    const memoRef = ref(db, `memos/${key}`);
    onValue(memoRef, (snapshot) => {
      const memo = snapshot.val();
      if (memo) {
        update(memoRef, { starred: !memo.starred });
      }
    }, { onlyOnce: true });
  }
});

// 전체 삭제 (Firebase)
clearBtn.addEventListener('click', () => {
  const memosRef = ref(db, 'memos');
  set(memosRef, null);
});

// 페이지 로드 시 메모 불러오기
window.addEventListener('DOMContentLoaded', loadMemos);