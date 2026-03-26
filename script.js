function toggleMenu() {
  document.getElementById("sideMenu").classList.toggle("active");
  document.getElementById("overlay").classList.toggle("active");
}
// Mobile menu toggle
document.getElementById('menu-button').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Sign modal open
document.getElementById('sign-btn-header').addEventListener('click', () => {
  document.getElementById('sign-choice-modal').style.display = 'flex';
});
document.getElementById('sign-btn-mobile').addEventListener('click', () => {
  document.getElementById('sign-choice-modal').style.display = 'flex';
});

function closeSignModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}
const currencyBtn = document.getElementById("currency-btn");
const currencyModal = document.getElementById("currency-modal");
const applyCurrencyBtn = document.getElementById("apply-currency");

let selectedCurrency = "EGP"; 
let selectedRate = 1;

// Store original prices
const productPrices = document.querySelectorAll(".product-card p.text-gray-400");
productPrices.forEach(p => {
  p.dataset.egp = parseFloat(p.textContent.replace(/[^0-9.]/g, ""));
});

// Open modal
currencyBtn.addEventListener("click", () => {
  currencyModal.style.display = "flex";
});

// Close modal
currencyModal.addEventListener("click", (e) => {
  if (e.target === currencyModal) currencyModal.style.display = "none";
});

// Select currency
document.querySelectorAll(".currency-option").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".currency-option")
      .forEach(b => b.classList.remove("bg-yellow-400", "text-black"));

    btn.classList.add("bg-yellow-400", "text-black");
    selectedCurrency = btn.dataset.currency;
    selectedRate = parseFloat(btn.dataset.rate);
  });
});

// Apply currency
applyCurrencyBtn.addEventListener("click", () => {
  productPrices.forEach(p => {
    let egp = parseFloat(p.dataset.egp);
    let converted = (egp * selectedRate).toFixed(2);
    p.textContent = `${selectedCurrency} ${converted}`;
  });

  currencyBtn.textContent = selectedCurrency;
  currencyModal.style.display = "none";
});
let currentProduct = {};
let currentStep = 1;

function openModal(name, price, image) {
  currentProduct = { name, price, image };
  document.getElementById('modal-product-name').innerText = name;
  document.getElementById('modal-product-price').innerText = price;
  document.getElementById('modal-product-image').src = image || '';
  document.getElementById('checkout-modal').style.display = 'flex';
  showStep(1);
}

function closeModal() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.getElementById('checkout-form').reset();
  currentStep = 1;
}

function showStep(step) {
  currentStep = step;
  document.getElementById('step-1-summary').style.display = step === 1 ? 'block' : 'none';
  document.getElementById('step-2-shipping').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('step-3-confirmation').style.display = step === 3 ? 'block' : 'none';
}

function nextStep(step) {
  showStep(step);
}

// Quick buy buttons
document.querySelectorAll('.buy-button').forEach(btn => {
  btn.addEventListener('click', function() {
    openModal(this.dataset.productName, this.dataset.productPrice, this.dataset.productImage);
  });
});

// PayPal
function redirectPayPal() {
  window.open('https://www.paypal.me/OmarGlelah1', '_blank');
  showStep(3);
}
let currentProduct = {};
let currentStep = 1;

function openModal(name, price, image) {
  currentProduct = { name, price, image };
  document.getElementById('modal-product-name').innerText = name;
  document.getElementById('modal-product-price').innerText = price;
  document.getElementById('modal-product-image').src = image || '';
  document.getElementById('checkout-modal').style.display = 'flex';
  showStep(1);
}

function closeModal() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.getElementById('checkout-form').reset();
  currentStep = 1;
}

function showStep(step) {
  currentStep = step;
  document.getElementById('step-1-summary').style.display = step === 1 ? 'block' : 'none';
  document.getElementById('step-2-shipping').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('step-3-confirmation').style.display = step === 3 ? 'block' : 'none';
}

function nextStep(step) {
  showStep(step);
}

// Quick buy buttons
document.querySelectorAll('.buy-button').forEach(btn => {
  btn.addEventListener('click', function() {
    openModal(this.dataset.productName, this.dataset.productPrice, this.dataset.productImage);
  });
});

// PayPal
function redirectPayPal() {
  window.open('https://www.paypal.me/OmarGlelah1', '_blank');
  showStep(3);
}
const GLOBAL_START = Date.UTC(2026, 0, 1, 11, 0, 0);
const ONE_DAY = 24 * 60 * 60 * 1000;

function getNextFriday11UTC(fromTime) {
  const date = new Date(fromTime);
  const day = date.getUTCDay();
  let daysUntilFriday = (5 - day + 7) % 7;

  if (daysUntilFriday === 0 && date.getUTCHours() >= 11) {
    daysUntilFriday = 7;
  }

  date.setUTCDate(date.getUTCDate() + daysUntilFriday);
  date.setUTCHours(11, 0, 0, 0);

  return date.getTime();
}

function getCurrentPhase() {
  let t = GLOBAL_START;
  let phase = "day";

  while (true) {
    if (phase === "day") {
      if (Date.now() < t + ONE_DAY) {
        return { target: t + ONE_DAY };
      }
      t += ONE_DAY;
      phase = "friday";
    } else {
      const friday = getNextFriday11UTC(t);
      if (Date.now() < friday) {
        return { target: friday };
      }
      t = friday;
      phase = "day";
    }
  }
}

function updateCountdown() {
  const { target } = getCurrentPhase();
  let diff = target - Date.now();

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown-timer").textContent =
    `${String(d).padStart(2,"0")}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m ${String(s).padStart(2,"0")}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
function getColorFromEmail(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 55%)`;
}

function showUserAvatar(email) {
  const avatar = document.getElementById('user-avatar');
  const signBtnHeader = document.getElementById('sign-btn-header');
  const signBtnMobile = document.getElementById('sign-btn-mobile');

  avatar.textContent = email.charAt(0).toUpperCase();
  avatar.style.backgroundColor = getColorFromEmail(email);
  avatar.style.color = '#111';

  avatar.classList.remove('hidden');
  signBtnHeader.style.display = 'none';
  signBtnMobile.style.display = 'none';
}
const firebaseConfig = { /* your config */ };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

let lastVisible = null;
const reviewsPerPage = 5;

// Submit review
window.submitRoyalReview = async function() {
  const name = document.getElementById('side-rev-name').value;
  const text = document.getElementById('side-rev-text').value;

  if (!name || !text) return alert("Fill all fields 👑");

  await db.collection("reviews").add({
    name,
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  loadReviews(true);
};

// Load reviews
async function loadReviews(isInitial = true) {
  let query = db.collection("reviews").orderBy("timestamp","desc").limit(reviewsPerPage);

  if (!isInitial && lastVisible) {
    query = query.startAfter(lastVisible);
  }

  const snap = await query.get();
  lastVisible = snap.docs[snap.docs.length - 1];
}

// Auth state
auth.onAuthStateChanged(user => {
  const avatar = document.getElementById("user-avatar");

  if (user) {
    avatar.classList.remove("hidden");
    avatar.innerHTML = `<img src="${user.photoURL}" class="w-10 h-10 rounded-full">`;
  } else {
    avatar.classList.add("hidden");
  }
});

// Google login
window.handleGoogleLogin = function() {
  auth.signInWithPopup(provider);
};

// Logout
window.logoutUser = function() {
  auth.signOut().then(() => location.reload());
};
