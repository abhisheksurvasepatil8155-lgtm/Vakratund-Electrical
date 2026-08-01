const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value;

    const phone =
        document.getElementById("customerPhone").value;

    const service =
        document.getElementById("service").value;

    const problem =
        document.getElementById("problem").value;


    // YOUR WHATSAPP NUMBER
    const electricianNumber = "917559110974";


    const message =
        `⚡ New Electrician Booking

Name: ${name}
Mobile: ${phone}
Service: ${service}
Problem: ${problem}

Please contact the customer.`;


    const whatsappURL =
        "https://wa.me/" +
        electricianNumber +
        "?text=" +
        encodeURIComponent(message);


    window.open(whatsappURL, "_blank");

});