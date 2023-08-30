let cart = [];
let total = 0;
let itemQuantities = {};

function changeQuantity(itemName, amount) {
    if (itemQuantities[itemName] === undefined) {
        itemQuantities[itemName] = 0;
    }

    itemQuantities[itemName] += amount;
    itemQuantities[itemName] = Math.max(0, itemQuantities[itemName]);
    updateQuantity(itemName);
}

function updateQuantity(itemName) {
    const quantityElement = document.getElementById(`quantity-${itemName}`);
    quantityElement.textContent = itemQuantities[itemName];
}

function addToCart(itemNumber) {
    const itemName = `Nama Barang ${itemNumber}`;
    const itemPrice =
        itemNumber === 1 ? 100000 :
        itemNumber === 2 ? 150000 :
        itemNumber === 3 ? 50000 :
        itemNumber === 4 ? 65000 :
        itemNumber === 5 ? 275000 : 2500;

    if (itemQuantities[itemName] === undefined) {
        itemQuantities[itemName] = 0;
    }

    const quantityToAdd = itemQuantities[itemName];

    cart.push({ name: itemName, price: itemPrice });
    total += itemPrice * quantityToAdd;
    updateCart();
    updateQuantity(itemName);
}

function updateCart() {
    const cartItemsElement = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");

    cartItemsElement.innerHTML = "";
    cart.forEach(item => {
        const li = document.createElement("li");
        const quantity = itemQuantities[item.name] || 0;
        li.innerText = `${item.name} - Rp. ${item.price} x ${quantity}`;
        cartItemsElement.appendChild(li);
    });
    const tax = total * (11/100);
    const totalWtax = total + tax;

    totalElement.innerHTML = `Total Pembelian = Rp. ${total.toFixed(2)}<br>Pajak 11% = Rp. ${tax.toFixed(2)}<br>Total Biaya = Rp. ${totalWtax.toFixed(2)}`;
}

// Panggil fungsi updateQuantity untuk menginisialisasi tampilan
for (const itemName in itemQuantities) {
    updateQuantity(itemName);
}