// Initialize or fetch cart data from LocalStorage context
let globalCart = JSON.parse(localStorage.getItem('terminal_cart')) || [];

function saveCartToStorage() {
    localStorage.setItem('terminal_cart', JSON.stringify(globalCart));
    updateGlobalCartCounters();
}

function addProductToCart(id, name, price, imageSrc, categorySpec) {
    const existingIndex = globalCart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
        globalCart[existingIndex].qty += 1;
    } else {
        globalCart.push({ id, name, price, image: imageSrc, spec: categorySpec, qty: 1 });
    }
    saveCartToStorage();
    alert(`[SYSTEM LOG]: Added "${name}" to collection vector.`);
}

function updateGlobalCartCounters() {
    const counterElements = document.querySelectorAll('.cart-count');
    const totalItems = globalCart.reduce((acc, item) => acc + item.qty, 0);
    counterElements.forEach(el => el.textContent = totalItems);
}

// Keep navbar badges updated when script mounts
document.addEventListener('DOMContentLoaded', updateGlobalCartCounters);
