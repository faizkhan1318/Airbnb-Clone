const roomData = JSON.parse(localStorage.getItem('roomId'));
console.log(roomData);
const {result} = roomData.result;
console.log(result);

function handleHeader() {
    document.querySelector('#title').innerText = result.name;
    document.querySelector('#rating').innerText = result.rating;
    document.querySelector('#review').innerText = result.reviewsCount + " reviews";
    if(result.isSuperhost){
        document.querySelector('#isSupHost').innerText = "Super Host";
    }
    document.querySelector('#address').innerText = result.address;
}
handleHeader();

function handleImages() {
    let i;
    let char = 97;
    const imageCont = document.querySelector('.hero'); 
   for (i = 0;  i < 5; i++) {
       let img = document.createElement('img');
       img.className = String.fromCharCode(char);
       img.src = result.images[i];
       char++;
       imageCont.appendChild(img);
   }
}
handleImages();

function handlePrice() {
    document.querySelector('.price').innerText = `${result.price.rate} ₹ / night`
    document.querySelector('#rate').innerText = `${result.rating}`
    document.querySelector('#rev').innerText = `${result.reviewsCount} reviews`
    let price_cont = document.querySelector('.price-details');
    let total = 0;
    for (let i = 0; i < result.price.priceItems.length; i++) {
        const div = document.createElement('div');
        div.className = 'row2';
        div.innerHTML = `
                        <div class="weekly-discount">${result.price.priceItems[i].title}</div>
                        <div class="weekly-discount-price">₹${result.price.priceItems[i].amount}</div>`;
        total += result.price.priceItems[i].amount;
        price_cont.appendChild(div);
    }

    const div = document.createElement('div');
    div.className = 'row2';
    div.innerHTML = `<div class="total">Total</div>
    <div id="tot">₹${total}</div>`
    price_cont.appendChild(div);
    
}
handlePrice();


function addColor(event) {
    if(event.target.style.color === 'red'){
        event.target.style.color = 'black';
    }else{
        event.target.style.color = 'red';
    }
}

async function getRoomDetails() {
    const url = `https://airbnb19.p.rapidapi.com/api/v1/getPropertyDetails?propertyId=${roomData.id}&currency=INR`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f883b90791msha59eee7d63130abp1b6ef4jsn68f1a6a10240',
            'X-RapidAPI-Host': 'airbnb19.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    
}
// getRoomDetails();


// Creating a map object
 var map = L.map('map').setView([result.lat, result.lng], 13);
mapLink =
  '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
  }).addTo(map);

 
 // Creating a Layer object
 var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
 map.addLayer(layer);         // Adding layer to the map
 var marker = L.marker([result.lat, result.lng]);    // Creating a Marker
 
 // Adding popup to the marker
 marker.bindPopup('You will be exactly here').openPopup().addTo(map);
 marker.addTo(map); // Adding marker to the map

  

function showBookingCostBreakdown(listing) {
    // Calculate additional fees and total cost
    const additionalFees = listing.price * 0.10; // Assuming additional fees are 10% of base price
    const totalCost = listing.price + additionalFees;

    // Create a modal dialog box
    const modal = document.createElement("div");
    modal.style.display = "block";
    modal.style.width = "300px";
    modal.style.height = "200px";
    modal.style.backgroundColor = "#fff";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.padding = "20px";
    modal.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    // Add booking cost breakdown to the modal
    modal.innerHTML = `
        <h2>Booking Cost Breakdown</h2>
        <p>Base Rate: $${listing.price.toFixed(2)}</p>
        <p>Additional Fees: $${additionalFees.toFixed(2)}</p>
        <p>Total Cost: $${totalCost.toFixed(2)}</p>
    `;

    // Add a close button to the modal
    const closeButton = document.createElement("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", () => modal.style.display = "none");
    modal.appendChild(closeButton);

    // Add the modal to the body
    document.body.appendChild(modal);
}
