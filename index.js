let data;
let thisWeek = {};

window.onload = () => {
    //load data
    getStorage();

    document.getElementById("add-week").addEventListener("click", (e) => {

        var newWeek ={};
        for (var key in thisWeek) {
            newWeek[key] = document.getElementById(key).value;
        }

        console.log(newWeek);
        //add new row in array
        data["interactions"].push(newWeek);

        localStorage.setItem('friend-data', JSON.stringify(data));
        console.log(localStorage.getItem('friend-data'));

        //reload visuals
        getStorage();
        reloadTimeline();
        updateTree();
    });

    document.getElementById("update-week").addEventListener("click", (e) => {
        for (var key in thisWeek) {
            thisWeek[key] = document.getElementById(key).value;
        }

        //replace last row with inputs
        data["interactions"][data["interactions"].length -1] = thisWeek;

        localStorage.setItem('friend-data', JSON.stringify(data));
        console.log(localStorage.getItem('friend-data'));

        //reload visuals
        getStorage();
        updateTree();
    });

    document.getElementById("clear-nums").addEventListener("click", (e) => {
        //reset input values
        for (var key in thisWeek) {
            document.getElementById(key).value = "0";
        }
    });

    document.getElementById("add-friend").addEventListener("click", (e) => {
        //add new key
        var friendName = document.getElementById("add-friend-name").value;
        thisWeek[friendName] = "0";

        //reload visuals
        reloadLeftControls();
        addRightControls(friendName);
        updateTree();

    });

    document.getElementById("timeline").addEventListener("change", (e) => {
        //update visuals
        updateTree();
    });
    
    reloadTimeline();

    reloadLeftControls();

    reloadRightControls();
    
    updateTree();
}

function getStorage() {
    data = JSON.parse(localStorage.getItem('friend-data'));
    //localStorage.clear();

    if(data === null) {
        data = {'interactions': [{}]};
    } 

    thisWeek = data["interactions"][data["interactions"].length -1];
}

function getWeeklyTotal(weekNum) {
    var interactionSum = 0;
    for (var key in data["interactions"][weekNum]) {
        interactionSum += int(data["interactions"][weekNum][key]);
    }

    return interactionSum;
}

function reloadTimeline() {
    var timeline = document.getElementById("timeline");
    timeline.min = 0;
    timeline.max = data["interactions"].length - 1;
    timeline.value = data["interactions"].length - 1;

}

function reloadLeftControls() {
    var friendList = document.getElementById("friend-list");
    friendList.innerHTML = "";

    for (var key in thisWeek) {
        var friendItem = document.createElement("p");
        friendItem.innerText = key;

        friendList.append(friendItem);
    }
}

function reloadRightControls() {
    var interactionList = document.getElementById("interaction-list");
    interactionList.innerHTML = "";

    for (var key in thisWeek) {
        var friendItem = document.createElement("div");
        var friendItemName = document.createElement("p");
        friendItemName.innerText = key;
        var friendItemInteractions = document.createElement("input");
        friendItemInteractions.setAttribute("type", "number");
        friendItemInteractions.id = key;
        friendItemInteractions.min = 0;
        friendItemInteractions.value = thisWeek[key];

        friendItem.append(friendItemName, friendItemInteractions);
        
        interactionList.append(friendItem);
    }

}

function addRightControls(key) {
    var interactionList = document.getElementById("interaction-list");

    var friendItem = document.createElement("div");
    var friendItemName = document.createElement("p");
    friendItemName.innerText = key;
    var friendItemInteractions = document.createElement("input");
    friendItemInteractions.setAttribute("type", "number");
    friendItemInteractions.id = key;
    friendItemInteractions.min = 0;
    friendItemInteractions.value = thisWeek[key];

    friendItem.append(friendItemName, friendItemInteractions);
        
    interactionList.append(friendItem);
}