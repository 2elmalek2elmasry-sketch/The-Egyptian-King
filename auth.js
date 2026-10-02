// auth.js
const firebaseConfig = {
  apiKey: "AIzaSyAOtDF71w3oXICE04c9CGtz_prRHBnMq6c",
  authDomain: "the-egyptian-king-68e45.firebaseapp.com",
  projectId: "the-egyptian-king-68e45",
  storageBucket: "the-egyptian-king-68e45.firebasestorage.app",
  messagingSenderId: "94881816710",
  appId: "1:94881816710:web:10fca569f1b43c583ab107",
  measurementId: "G-ZR0FBN0PRV"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Sync local cart to Firebase
function saveCartToBackend() {
    const user = auth.currentUser;
    if (!user) return; // Only save to backend if logged in

    const cart = JSON.parse(localStorage.getItem('kingCart')) || [];
    const cartRef = db.collection('users').doc(user.uid).collection('cart');

    cartRef.get().then(snapshot => {
        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref)); // Clear old cloud cart
        cart.forEach(item => {
            const newDocRef = cartRef.doc(item.id.toString());
            batch.set(newDocRef, item); // Save new cart
        });
        return batch.commit();
    }).catch(err => console.error("Cart sync error:", err));
}

// Load cart from Firebase and overwrite local
function loadCartFromBackend(user) {
    db.collection('users').doc(user.uid).collection('cart').get().then(snapshot => {
        const backendCart = snapshot.docs.map(doc => doc.data());
        localStorage.setItem('kingCart', JSON.stringify(backendCart));
        if (typeof updateCartCount === 'function') updateCartCount();
    }).catch(err => console.error("Load cart error:", err));
}

// Update Header UI based on Auth State
auth.onAuthStateChanged(user => {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!dropdownMenu) return; // Stop if header isn't loaded

    const existingAuthSection = document.getElementById('auth-dropdown-section');
    if (existingAuthSection) existingAuthSection.remove();

    let authHTML = '';
    if (user) {
        // User is logged in
        authHTML = `
            <div class="dropdown-section" id="auth-dropdown-section" style="border-bottom: 1px solid #1c1c1c; padding-bottom: 1.25rem;">
                <div class="dropdown-title">Account</div>
                <ul class="dropdown-links">
                    <li><a href="account.html">My Account</a></li>
                    <li><a href="#" id="logout-btn" style="color: #ff4d4d;">Logout</a></li>
                </ul>
            </div>
        `;
        loadCartFromBackend(user); // Load cloud cart on login
    } else {
        // User is logged out
        authHTML = `
            <div class="dropdown-section" id="auth-dropdown-section" style="border-bottom: 1px solid #1c1c1c; padding-bottom: 1.25rem;">
                <div class="dropdown-title">Account</div>
                <ul class="dropdown-links">
                    <li><a href="login.html" style="color: var(--accent);">Login / Sign Up</a></li>
                </ul>
            </div>
        `;
    }

    dropdownMenu.insertAdjacentHTML('afterbegin', authHTML);

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut().then(() => {
                window.showToast && window.showToast("Logged out successfully.");
                localStorage.removeItem('kingCart'); // Clear local cart on logout
                if (typeof updateCartCount === 'function') updateCartCount();
                setTimeout(() => window.location.href = 'index.html', 800);
            }).catch(err => window.showToast && window.showToast("Logout failed."));
        });
    }
});
