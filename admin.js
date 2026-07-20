import { db } from "./firebase.js";

import {
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Dashboard Counters

const totalUsers = document.getElementById("totalUsers");
const liveTournament = document.getElementById("liveTournament");
const todayMatches = document.getElementById("todayMatches");
const revenue = document.getElementById("revenue");

// Total Users
onValue(ref(db, "users"), (snapshot) => {
    if (snapshot.exists()) {
        totalUsers.innerHTML = Object.keys(snapshot.val()).length;
    } else {
        totalUsers.innerHTML = 0;
    }
});

// Total Tournaments
onValue(ref(db, "tournaments"), (snapshot) => {
    if (snapshot.exists()) {
        liveTournament.innerHTML = Object.keys(snapshot.val()).length;
    } else {
        liveTournament.innerHTML = 0;
    }
});

// Temporary Revenue
revenue.innerHTML = "₹0";
todayMatches.innerHTML = "0";

// ----------------------------
// Create Tournament
// ----------------------------

document.getElementById("createTournament").onclick = () => {

    const title = prompt("Tournament Name");

    if (!title) return;

    const prize = prompt("Prize Pool");

    const entry = prompt("Entry Fee");

    const slots = prompt("Total Slots");

    const tournamentRef = push(ref(db, "tournaments"));

    set(tournamentRef, {

        title,
        prize,
        entry,
        slots,

        joined: 0,

        status: "Upcoming",

        createdAt: Date.now()

    });

    alert("Tournament Created Successfully");

};

// ----------------------------
// Private Match
// ----------------------------

document.getElementById("privateMatch").onclick = () => {

    const code = prompt("Private Match Access Code");

    if (!code) return;

    const matchRef = push(ref(db, "privateMatches"));

    set(matchRef, {

        accessCode: code,

        status: "Upcoming",

        createdAt: Date.now()

    });

    alert("Private Match Created");

};

// ==========================
// Tournament List
// ==========================

const tournamentList = document.getElementById("tournamentList");

onValue(ref(db, "tournaments"), (snapshot) => {

    tournamentList.innerHTML = "";

    if (!snapshot.exists()) {

        tournamentList.innerHTML =
        "<p style='color:gray'>No Tournament Found</p>";

        return;

    }

    snapshot.forEach((item) => {

        const data = item.val();

        tournamentList.innerHTML += `

        <div class="card">

            <h3>${data.title}</h3>

            <p>💰 Prize : ₹${data.prize}</p>

            <p>🎟 Entry : ₹${data.entry}</p>

            <p>👥 Slots : ${data.joined}/${data.slots}</p>

            <p>📌 Status : ${data.status}</p>

            <button
            onclick="deleteTournament('${item.key}')"
            class="btn"
            style="background:red;color:white;margin-top:10px;">
                Delete
            </button>

        </div>

        `;

    });

});


// ==========================
// Delete Tournament
// ==========================

import {
    remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

window.deleteTournament = function(id){

    if(confirm("Delete Tournament?")){

        remove(ref(db,"tournaments/"+id));

        alert("Tournament Deleted");

    }
  
}

import {
ref,
push,
set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const form=document.getElementById("tournamentForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const id=push(ref(db,"tournaments")).key;

await set(ref(db,"tournaments/"+id),{

id,

title:title.value,

game:game.value,

entry:entry.value,

prize:prize.value,

slots:slots.value,

date:date.value,

time:time.value,

joined:0,

status:"Upcoming",

roomId:"",

password:"",

createdAt:Date.now()

});

alert("Tournament Created");

form.reset();

});

import {
onValue,
update,
remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const container=document.getElementById("tournamentContainer");

onValue(ref(db,"tournaments"),(snapshot)=>{

container.innerHTML="";

if(!snapshot.exists()){

container.innerHTML="<p>No Tournament Found</p>";

return;

}

snapshot.forEach((item)=>{

const t=item.val();

container.innerHTML+=`

<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-700">

<h2 class="text-lg font-bold">${t.title}</h2>

<p>💰 Prize : ₹${t.prize}</p>

<p>🎟 Entry : ₹${t.entry}</p>

<p>👥 Slots : ${t.joined}/${t.slots}</p>

<p>📅 ${t.date}</p>

<p>⏰ ${t.time}</p>

<input
placeholder="Room ID"
id="room${item.key}"
value="${t.roomId||""}"
class="w-full mt-2 p-2 rounded bg-black border border-zinc-700">

<input
placeholder="Room Password"
id="pass${item.key}"
value="${t.password||""}"
class="w-full mt-2 p-2 rounded bg-black border border-zinc-700">

<select
id="status${item.key}"
class="w-full mt-2 p-2 rounded bg-black border border-zinc-700">

<option ${t.status=="Upcoming"?"selected":""}>Upcoming</option>

<option ${t.status=="Live"?"selected":""}>Live</option>

<option ${t.status=="Completed"?"selected":""}>Completed</option>

</select>

<div class="grid grid-cols-2 gap-2 mt-3">

<button
onclick="saveTournament('${item.key}')"
class="bg-green-500 rounded-xl py-2">

Save

</button>

<button
onclick="deleteTournament('${item.key}')"
class="bg-red-500 rounded-xl py-2">

Delete

</button>

</div>

</div>

`;

});

});

window.saveTournament=async(id)=>{

await update(ref(db,"tournaments/"+id),{

roomId:document.getElementById("room"+id).value,

password:document.getElementById("pass"+id).value,

status:document.getElementById("status"+id).value

});

alert("Tournament Updated");

};

window.deleteTournament=async(id)=>{

if(confirm("Delete Tournament?")){

await remove(ref(db,"tournaments/"+id));

alert("Deleted");

}

};

// ==========================
// Joined Players
// ==========================

const joinedPlayers = document.getElementById("joinedPlayers");

window.viewPlayers = (id) => {

    onValue(ref(db, "tournaments/" + id + "/players"), (snapshot) => {

        joinedPlayers.innerHTML = "";

        if (!snapshot.exists()) {

            joinedPlayers.innerHTML = `
                <p class="text-gray-400">
                    No Players Joined
                </p>
            `;

            return;

        }

        snapshot.forEach((player) => {

            const p = player.val();

            joinedPlayers.innerHTML += `

            <div class="bg-zinc-900 rounded-xl p-3 mb-2">

                <h3>${p.name}</h3>

                <p>UID : ${p.uid}</p>

                <p>Game UID : ${p.gameUid}</p>

            </div>

            `;

        });

    });

};
