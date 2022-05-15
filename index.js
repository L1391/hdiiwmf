let data;
let thisWeek = {};

window.onload = () => {
    //load data
    getStorage();

    document.getElementById("add-week").addEventListener("click", (e) => {

        var newWeek ={};
        for (var key in thisWeek) {
            friendData = {};
            friendData["int"] = document.getElementById(key+"int").value;
            friendData["notes"] = document.getElementById(key+"notes").value;
            newWeek[key] = friendData;
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
            friendData = {};
            friendData["int"] = document.getElementById(key+"int").value;
            friendData["notes"] = document.getElementById(key+"notes").value;
            thisWeek[key] = friendData; 
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
            document.getElementById(key+"int").value = "0";
            document.getElementById(key+"notes").value = "";
        }
    });

    document.getElementById("add-friend").addEventListener("click", (e) => {
        //add new key
        var friendName = document.getElementById("add-friend-name").value;
        friendData = {};
        friendData["int"] = "0";
        friendData["notes"] = "";
        thisWeek[friendName] = friendData;

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
    console.log(localStorage.getItem('friend-data'));
    data = JSON.parse(localStorage.getItem('friend-data'));
        
    //localStorage.clear();



    console.log(data);

    if(data === null) {
        data = {'interactions': [{}]};
    } 

    console.log(data);

    thisWeek = data["interactions"][data["interactions"].length -1];
}

function getWeeklyTotal(weekNum) {
    var interactionSum = 0;
    for (var key in data["interactions"][weekNum]) {
        interactionSum += int(data["interactions"][weekNum][key]["int"]);
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
        friendItemInteractions.id = key+"int";
        friendItemInteractions.min = 0;
        friendItemInteractions.value = thisWeek[key]["int"];

        var friendItemNotes = document.createElement("input");
        friendItemNotes.setAttribute("type", "text");
        friendItemNotes.placeholder = "Notes about " + key;
        friendItemNotes.id = key+"notes";
        friendItemNotes.value = thisWeek[key]["notes"];

        friendItem.append(friendItemName, friendItemInteractions,friendItemNotes);
        
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
    friendItemInteractions.id = key+"int";
    friendItemInteractions.min = 0;
    friendItemInteractions.value = thisWeek[key]["int"];

    var friendItemNotes = document.createElement("input");
    friendItemNotes.setAttribute("type", "text");
    friendItemNotes.placeholder = "Notes about " + key;
    friendItemNotes.id = key+"notes";
    friendItemNotes.value = thisWeek[key]["notes"];

    friendItem.append(friendItemName, friendItemInteractions,friendItemNotes);
        
    interactionList.append(friendItem);
}