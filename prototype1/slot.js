const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const spinBtn = document.getElementById("spinBtn");
const result = document.getElementById("result");
const lever = document.getElementById("lever");

const items = ["🍎", "🍌", "🍒", "⭐", "💎", "🎁"];

function randomEmoji() {
  return items[Math.floor(Math.random() * items.length)];
}

function spinReel(reel, duration) {
  return new Promise(resolve => {
    let count = 0;
    const interval = setInterval(() => {
      reel.textContent = randomEmoji();
      // efek bergulir ke bawah
      reel.style.transform = `translateY(${count % 2 === 0 ? "20px" : "0"})`;
      count++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      reel.style.transform = "translateY(0)";
      const final = randomEmoji();
      reel.textContent = final;
      resolve(final);
    }, duration);
  });
}

spinBtn.addEventListener("click", async () => {
  result.textContent = "Spinning...";
  result.style.color = "white" ;
    result.style.textShadow = "0 0 10px yellow, 0 0 20px white";
  
  lever.classList.add("pull");
  setTimeout(() => lever.classList.remove("pull"), 600);

  // jalankan reel bergantian
  const r1 = await spinReel(reel1, 1500);
  const r2 = await spinReel(reel2, 2000);
  const r3 = await spinReel(reel3, 2500);

  // cek hasil
  if (r1 === r2 && r2 === r3) {
    result.textContent = `🎉 JACKPOT! ${r1} x3 🎉`;
    result.style.color = "gold" ;
    result.style.textShadow = "0 0 10px yellow, 0 0 20px orange";
  } else {
    result.textContent = "!TRYAGAIN!";
    result.style.color = "red" ;
    result.style.textShadow = "0 0 10px orange, 0 0 20px red";
  }
});
