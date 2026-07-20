import { db, auth } from "./firebase.js";

// =======================================
// Gamer Esports App
// Version 2.0
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    alert("✅ Gamer Esports Loaded");

    initializeApp();

});

function initializeApp() {

    loadFeaturedTournament();
    bindButtons();

}

function loadFeaturedTournament() {

    const featured = document.getElementById("featuredTournament");

    if (!featured) return;

    featured.innerHTML = `
        <div class="tournamentCard">

            <div class="tournamentBanner">
                FREE FIRE
            </div>

            <div class="tournamentBody">

                <h3 class="tournamentTitle">
                    Squad Cash Tournament
                </h3>

                <div class="tournamentInfo">

                    <div class="infoBox">
                        <span>Prize Pool</span>
                        <strong>₹5000</strong>
                    </div>

                    <div class="infoBox">
                        <span>Entry Fee</span>
                        <strong>₹50</strong>
                    </div>

                    <div class="infoBox">
                        <span>Slots</span>
                        <strong>48 / 48</strong>
                    </div>

                    <div class="infoBox">
                        <span>Time</span>
                        <strong>8:00 PM</strong>
                    </div>

                </div>

                <button class="joinBtn" id="joinTournamentBtn">
                    JOIN TOURNAMENT
                </button>

            </div>

        </div>
    `;

}

function bindButtons() {

    document.addEventListener("click", (e) => {

        if (e.target.id === "joinTournamentBtn") {
            alert("Firebase Join System Coming Next");
        }

    });

}
