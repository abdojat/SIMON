$("button").css({ "border": "5px solid black", "margin": "3.5rem", "width": "9rem", "height": "9rem", "border-radius": "20px" });


var level = 0;
$(document).on("keypress", () => { simon(level+1); });

var order = [];
var orderNames = [];
var player = 0;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function simon(level) {
    $("h1").text("level " + level);
    chooseNext(level);
    for (var i = 0; i < level; i++) {
        await delay(1000);
        switch (order[i]) {
            case 1:
                fadeInNOutGreen();
                orderNames.push("green");
                break;
            case 2:
                fadeInNOutRed();
                orderNames.push("red");
                break;
            case 3:
                fadeInNOutYellow();
                orderNames.push("yellow");
                break;
            case 4:
                fadeInNOutBlue();
                orderNames.push("blue");
                break;
        }
    }
    console.log(orderNames);
    console.log(order);
    var win = 0;
    var promise = new Promise(async (resolve) => {
        resolve(waitForButtonClick(level,0));
    });
    var res = await promise;
    if (win === res) {
        level = 0;
        player = 0
        order = [];
        orderNames = [];
        $("h1").text("Game Over, Press Any Key To Restart");
        $("body").css("background-color", "red")
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(() => {
            $("body").css("background-color", "#404B69")
        }, 200);
    }
    else {
        order = [];
        orderNames = [];
        player = 0 ;
        simon(level+1);
    }
}

function chooseNext(lev) {
    var which = Math.floor(Math.random() * 4) + 1;
    order.push(which);
    lev--;
    if (lev > 0)
        chooseNext(lev);
}

function fadeInNOutGreen() {
    $(".green").fadeOut();
    $(".green").fadeIn();
   makeSound("green");
}
function fadeInNOutRed() {
    $(".red").fadeOut();
    $(".red").fadeIn();
    makeSound("red");
}
function fadeInNOutYellow() {
    $(".yellow").fadeOut();
    $(".yellow").fadeIn();
    makeSound("yellow");
}
function fadeInNOutBlue() {
    $(".blue").fadeOut();
    $(".blue").fadeIn();
    makeSound("blue");
}
function wellPlayed(turn, who, order) {
    if (order[turn] === who) return true;
    return false;
}

function buttonAnimation(currentKey) {
    $("." + currentKey).addClass("pressed");
    setTimeout(function () { $("." + currentKey).removeClass("pressed"); }, 100);
}

function makeSound(who) {
    var audio = new Audio("sounds/" + who + ".mp3");
    audio.play();
}


async function waitForButtonClick(lev, pla) {
    const promise = new Promise((resolve) => {
        const button = $("button");
        button.click((event) => resolve(event));
    });
    var clickEvent = await promise;
    buttonAnimation(clickEvent.currentTarget.innerHTML);
    console.log(clickEvent.currentTarget.classList.contains(orderNames[pla]));
    if (clickEvent.currentTarget.classList.contains(orderNames[pla]))
        pla++;
    else
        pla = -1;
    if (pla === lev)
        return 1;
    else if (pla === -1)
        return 0;
    else return waitForButtonClick(lev,pla);
    console.log("Button clicked!");
    console.log(lev);
    console.log(pla);
    console.log(clickEvent.currentTarget.innerHTML);
}
