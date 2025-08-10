let votes = JSON.parse(localStorage.getItem("animePoll")) || { aot: 0, naruto: 0 };
let hasVoted = localStorage.getItem("hasVoted") === "true";
let votedFor = localStorage.getItem("votedFor") || null;

document.addEventListener("DOMContentLoaded", () => {
    const aotBtn = document.querySelectorAll(".button")[0];
    const narutoBtn = document.querySelectorAll(".button")[1];
    const resetBtn = document.getElementById("resetVote");

    aotBtn.addEventListener("click", () => vote("aot"));
    narutoBtn.addEventListener("click", () => vote("naruto"));
    resetBtn.addEventListener("click", resetVote);

    if (hasVoted) {
        showResults();
        disableButtons();
    } else {
        resetButtonLabels();
    }
});

function vote(option) {
    if (hasVoted) return;

    votes[option]++;
    votedFor = option;

    localStorage.setItem("animePoll", JSON.stringify(votes));
    localStorage.setItem("hasVoted", "true");
    localStorage.setItem("votedFor", option);

    hasVoted = true;

    showResults();
    disableButtons();
}

function showResults() {
    let total = votes.aot + votes.naruto;
    let aotPercent = total ? ((votes.aot / total) * 100).toFixed(1) : 0;
    let narutoPercent = total ? ((votes.naruto / total) * 100).toFixed(1) : 0;

    const aotBtn = document.querySelectorAll(".button")[0];
    const narutoBtn = document.querySelectorAll(".button")[1];

    aotBtn.textContent = `ATTACK ON TITAN - ${aotPercent}%`;
    narutoBtn.textContent = `NARUTO - ${narutoPercent}%`;

    aotBtn.style.background = `linear-gradient(to right, #ff69b4 ${aotPercent}%, #f1f1f1 ${aotPercent}%)`;
    narutoBtn.style.background = `linear-gradient(to right, #87cefa ${narutoPercent}%, #f1f1f1 ${narutoPercent}%)`;
}

function resetButtonLabels() {
    document.querySelectorAll(".button")[0].textContent = "ATTACK ON TITAN";
    document.querySelectorAll(".button")[1].textContent = "NARUTO";
    document.querySelectorAll(".button").forEach(btn => {
        btn.style.background = "white";
        btn.disabled = false;
        btn.style.cursor = "pointer";
        btn.style.opacity = "1";
    });
}

function disableButtons() {
    document.querySelectorAll(".button").forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = "not-allowed";
        btn.style.opacity = "0.7";
    });
}

function resetVote() {
    if (!hasVoted) return;

    // Remove their previous vote from the count
    if (votedFor) {
        votes[votedFor] = Math.max(0, votes[votedFor] - 1);
        localStorage.setItem("animePoll", JSON.stringify(votes));
    }

    // Clear voting status
    localStorage.removeItem("hasVoted");
    localStorage.removeItem("votedFor");
    hasVoted = false;
    votedFor = null;

    resetButtonLabels();
}
