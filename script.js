let selectedSeats = [];
let totalPrice = 0;
let couponApplied = false;

function handleSeatClick(seatId) {
    const seatButton = document.getElementById(seatId);

    const index = selectedSeats.indexOf(seatId);
    if (index === -1 && selectedSeats.length < 4) {
        selectedSeats.push(seatId);
        seatButton.style.backgroundColor = 'green';
        updateSeatCounter();
        addTableRow(seatId, 'Economy', 550);
    }
    
    updateTotalPrice();
    updateCouponSection();
}

function updateSeatCounter() {
    const seatCounter = document.getElementById('seatCounter');
    seatCounter.textContent = 40 - selectedSeats.length;
    seatPlus.textContent = selectedSeats.length;
}

function addTableRow(seat, seatClass, seatPrice) {
    const tableBody = document.getElementById('selectedSeatsTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    cell1.textContent = seat;
    cell2.textContent = seatClass;
    cell3.textContent = seatPrice;
}

function updateTotalPrice() {
    totalPrice = 0;
    const tableBody = document.getElementById('selectedSeatsTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < tableBody.rows.length; i++) {
        totalPrice += parseInt(tableBody.rows[i].cells[2].textContent);
    }

    const totalElement = document.getElementById('totalPrice');
    totalElement.textContent = 'BDT ' + totalPrice;

    const grandTotalElement = document.getElementById('grandTotal');
    grandTotalElement.textContent = 'BDT ' + totalPrice;
}

function updateCouponSection() {
    const couponSection = document.getElementById('couponSection');
    const couponInput = document.getElementById('couponInput');
    const applyButton = document.getElementById('applyButton');

    if (selectedSeats.length === 4) {
        couponSection.style.display = 'block';
    } else {
        couponSection.style.display = 'none';
        couponInput.value = ''; 
        couponApplied = false;
        updateTotalPrice();
    }
}

function applyCoupon() {
    const couponInput = document.getElementById('couponInput');
    const couponCode = couponInput.value;

    if (couponCode === 'NEW15') {
        applyDiscount(15);
        hideCouponSection(); 
    } else if (couponCode === 'Couple 20') {
        applyDiscount(20);
        hideCouponSection(); 
    } else {
        alert('Invalid coupon code');
    }
}

function hideCouponSection() {
    const couponSection = document.getElementById('couponSection');
    couponSection.style.display = 'none';
}

function applyDiscount(discountPercentage) {
    couponApplied = true;
    const discountedPrice = totalPrice - (totalPrice * (discountPercentage / 100));

    const grandTotalElement = document.getElementById('grandTotal');
    grandTotalElement.textContent = 'BDT ' + discountedPrice.toFixed(2);
}

const applyButton = document.getElementById('applyButton');
applyButton.addEventListener('click', applyCoupon);

const seatButtons = document.querySelectorAll('.grid-cols-4 button');
seatButtons.forEach(button => {
    button.addEventListener('click', () => handleSeatClick(button.id));
});


const phoneNumberInput = document.getElementById('phoneNumberInput');
const nextButton = document.getElementById('nextButton');


function checkEnableNextButton() {
    const atLeastOneSeatSelected = selectedSeats.length > 0;
    const phoneNumberEntered = phoneNumberInput.value.trim() !== '';

    nextButton.disabled = !(atLeastOneSeatSelected && phoneNumberEntered);
}

document.getElementById('myButton').addEventListener('click', function() {
    var targetSection = document.getElementById('myElement'); 
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });


seatButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleSeatClick(button.id);
        checkEnableNextButton(); // 
    });
});

phoneNumberInput.addEventListener('input', checkEnableNextButton);
