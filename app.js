// Gamer Esports v1

// ---------- Banner Slider ----------

const banners = [
    "🔥 FREE FIRE TOURNAMENT",
    "🏆 WIN CASH DAILY",
    "🎮 PLAY & EARN",
    "💎 CUSTOM ROOM MATCHES"
];

let bannerIndex = 0;

const banner = document.querySelector(".banner");

function changeBanner(){

    if(!banner) return;

    banner.innerHTML = banners[bannerIndex];

    bannerIndex++;

    if(bannerIndex >= banners.length){
        bannerIndex = 0;
    }
}

changeBanner();
setInterval(changeBanner,3000);


// ---------- Countdown Timer ----------

function startCountdown(){

    const timers = document.querySelectorAll(".countdown");

    timers.forEach(timer=>{

        let time = Number(timer.dataset.time);

        setInterval(()=>{

            if(time<=0){
                timer.innerHTML="Match Started";
                return;
            }

            let h=Math.floor(time/3600);
            let m=Math.floor((time%3600)/60);
            let s=time%60;

            timer.innerHTML=`${h}h ${m}m ${s}s`;

            time--;

        },1000);

    });

}

startCountdown();


// ---------- Bottom Navigation ----------

const navItems=document.querySelectorAll(".bottomNav i");

navItems.forEach(item=>{

    item.addEventListener("click",()=>{

        navItems.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

    });

});


// ---------- Join Button ----------

document.querySelectorAll(".joinBtn").forEach(btn=>{

    btn.onclick=()=>{

        alert("Tournament Join Page Coming Soon");

    }

});


// ---------- Welcome ----------

console.log("Gamer Esports Loaded Successfully");
