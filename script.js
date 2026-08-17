import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =========================
// FIREBASE
// =========================

const firebaseConfig = {
    apiKey: "AIzaSyCarRfxysCE13BaZVmA5huwExoD7WUHDOQ",
    authDomain: "vakratund-electical.firebaseapp.com",
    projectId: "vakratund-electical",
    storageBucket: "vakratund-electical.firebasestorage.app",
    messagingSenderId: "413104103979",
    appId: "1:413104103979:web:4bb88a6ef54b2ee18fc06e",
    measurementId: "G-TGXCL1ZHDG"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

console.log("Firebase connected");


// =========================
// BOOKING FORM
// =========================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

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

       
        const message =
`⚡ New Electrician Booking

Name: ${name}
Mobile: ${phone}
Service: ${service}
Problem: ${problem}

Please contact the customer.`;

const electricianNumbers = [
    "917559110974",
    "918459264909"
];

electricianNumbers.forEach(function(number) {

    const whatsappURL =
        "https://wa.me/" +
        number +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

});
    });

}


// =========================
// REVIEW ELEMENTS
// =========================

const reviewButton =
    document.getElementById("submit-review");

const reviewsContainer =
    document.getElementById("reviews-container");

const reviewMessage =
    document.getElementById("review-message");


// =========================
// SUBMIT REVIEW
// =========================

if (reviewButton) {

    reviewButton.addEventListener("click", async function() {

        console.log("SUBMIT BUTTON CLICKED");

        const name =
            document.getElementById("review-name").value.trim();

        const rating =
            Number(
                document.getElementById("review-rating").value
            );

        const review =
            document.getElementById("review-text").value.trim();


        // Check empty fields

        if (!name || !review) {

            reviewMessage.textContent =
                "Please enter your name and review.";

            return;
        }


        try {

            // Save review to Firebase

            await addDoc(
                collection(db, "reviews"),
                {
                    name: name,
                    rating: rating,
                    review: review,
                    createdAt: serverTimestamp()
                }
            );


            // Success message

            reviewMessage.textContent =
                "Thank you! Your review has been submitted.";


            // Clear form

            document.getElementById("review-name").value = "";

            document.getElementById("review-rating").value = "5";

            document.getElementById("review-text").value = "";


            // Reload reviews

            loadReviews();

        }

        catch (error) {

            console.error("Firebase Error:", error);

            reviewMessage.textContent =
                "Review submit failed. Check Console.";

        }

    });

}


// =========================
// LOAD REVIEWS
// =========================

async function loadReviews() {

    if (!reviewsContainer) {
        return;
    }


    reviewsContainer.innerHTML = "";


    try {

        const reviewsQuery = query(
            collection(db, "reviews"),
            orderBy("createdAt", "desc")
        );


        const snapshot =
            await getDocs(reviewsQuery);


        snapshot.forEach(function(doc) {

            const data = doc.data();


            const card =
                document.createElement("div");

            card.className = "review-card";


            const stars =
                "★".repeat(data.rating || 0);


            card.innerHTML = `

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    ${data.review || ""}
                </p>
<h3>
    ${data.name || "Customer"}
    <span class="verified-review">✓</span>
</h3>
            `;


            reviewsContainer.appendChild(card);

        });

    }

    catch (error) {

        console.error(
            "Error loading reviews:",
            error
        );

    }

}


// =========================
// LOAD REVIEWS WHEN PAGE OPENS
// =========================

loadReviews();