let limit = 1000;
let fullLimit = 1000;
let clicks = 0;
let balance = 0;
let tapSpeed = 1;
let limitCost = 1000;
let speedCost = 100;


window.onload = loadGame();

$("#clicker").on("click", gotClicked);
$(".tap").on("click", upgrSp);
$(".lim").on("click", upgrLim);

function upgrSp() {
    if (balance >= speedCost) {
        balance -= speedCost;
        tapSpeed++;
        speedCost *= 2;
        update();
        saveGame();
    }
    else {
       $(".tap").text("Not enough balance!");
       $(".tap").css("background-color", "#F12B04");

       setTimeout(function() {
        $(".tap").text("Tap speed +1");
        $(".tap").css("background-color", "#89FC00");
       }, 1000)
    }
}

function upgrLim() {
    if (balance >= limitCost) {
        balance -= limitCost;
        limitCost *= 5
        fullLimit *= 2
        updateLimit();
        update();
        saveGame();
    }
    else {
        $(".lim").text("Not enough balance!");
        $(".lim").css("background-color", "#F12B04");

        setTimeout(function() {
            $(".lim").text("Daily limit x2");
            $(".lim").css("background-color", "#FCE622");
           }, 1000)
    }
}

function gotClicked() {
    if (limit > 0) {
        limit -= 1;
        clicks += 1;
        balance += tapSpeed;
        update();
        saveGame();
    }

}

function update() {
    $("#balance").text(balance);
    $("#limit").attr("value", limit);
    $(".label_limit").text(limit);
    $(".forSp").text("Cost: " + speedCost);
    $(".forLim").text("Cost: " + limitCost);
    $("#limit").attr("max", fullLimit);
    displayTimeUntilNextHour();
}



function saveGame() {
    localStorage.setItem('balance', balance);
    localStorage.setItem('clicks', clicks);
    localStorage.setItem('limit', limit);
    localStorage.setItem('tapSpeed', tapSpeed);
    localStorage.setItem('speedCost', speedCost);
    localStorage.setItem('limitCost', limitCost);
    localStorage.setItem('fullLimit', fullLimit);
}

function loadGame() {
    const userBalance = localStorage.getItem('balance');
    const userClicks = localStorage.getItem('clicks');
    const userLimit = localStorage.getItem('limit');
    const userSpeed = localStorage.getItem('tapSpeed');
    const userSpCost = localStorage.getItem('speedCost');
    const userLimCost = localStorage.getItem('limitCost');
    const userFullLimit = localStorage.getItem('fullLimit');
    
    if (userBalance !== null) {
        balance = parseInt(userBalance);
    }
    if (userClicks !== null) {
        clicks = parseInt(userClicks);
    }
    if (userLimit !== null) {
        limit = parseInt(userLimit);
    }
    if (userSpeed !== null) {
        tapSpeed = parseInt(userSpeed);
    }
    if (userSpCost !== null) {
        speedCost = parseInt(userSpCost);
    }

    if (userLimCost !== null) {
        limitCost = parseInt(userLimCost);
    }

    if (userFullLimit !== null) {
        fullLimit = parseInt(userFullLimit);
    }

    update();
}

function updateLimit() {
    limit = fullLimit;
    update();
    saveGame();
}

function getTimeUntilNextHour() {
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
    return nextHour - now;
}

function displayTimeUntilNextHour() {
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
    const timeLeft = nextHour - now;
    const minutesLeft = Math.ceil(timeLeft / 60000);
    $(".label_updateLimit").text(minutesLeft + " minutes left until reset.");
}

const initialDelay = getTimeUntilNextHour();
setTimeout(() => {
    updateLimit();
    displayTimeUntilNextHour();
    setInterval(update, 60000);
    setInterval(updateLimit, 3600000);
}, initialDelay);