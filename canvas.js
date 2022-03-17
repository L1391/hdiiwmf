//maximum radius of spoke
const rad = 125;

// radius of name circles
const circleSize = 10;

// positions for each name
var namePos = {};

function setup() {
    frameRate(4);
    var canvas = createCanvas(400,400);
    canvas.parent("canvas-holder");
} 

// display notes when a name circle is clicked
function mouseClicked() {
    for(var key in thisWeek) {
        var circleX = namePos[key]["x"];
        var circleY = namePos[key]["y"];

        
        if (dist(mouseX,mouseY,circleX,circleY) <= circleSize/2 ) {
                console.log("DISPLAY" + key);
                stroke(255);
                rect(0,height-20,width,20);
                stroke(0);
                strokeWeight(1);
                text(thisWeek[key]["notes"], 0, height - 10);

            return;
        }
    }

}

function updateTree() {
    background(255);

    var weekNum = document.getElementById("timeline").value;
    var interactionSum = getWeeklyTotal(weekNum);

    //descriptive text
    strokeWeight(1);
    stroke(0);
    text("Week: " + weekNum, 10, 20);
    text("Total interactions: " + interactionSum, 10, 40);

    var i = 1;
    for (var key in thisWeek) {
        stroke(random(255), random(255), random(255));

        //evenly space names around circle
        var x = rad*cos(i*TWO_PI/Object.keys(thisWeek).length);
        var y = rad*sin(i*TWO_PI/Object.keys(thisWeek).length);

        strokeWeight(1);
        circle(width/2 + x, height/2 + y, circleSize);
        text(key, width/2 + x + 10, height/2 + y + 5)

        // add position to name positions
        namePos[key] = {"x": width/2 + x, "y": height/2+y};

        //make length proportional to specific interactions over total interactions
        let v = createVector(x, y);
        if (typeof data["interactions"][weekNum][key] === 'undefined' || typeof data["interactions"][weekNum][key]["int"] === 'undefined') {
            v.mult(0);
        } else {
            v.mult(data["interactions"][weekNum][key]["int"]/interactionSum);
        }

        strokeWeight(5);
        line(width/2, height/2, width/2 + v.x, height/2 + v.y);

        i++;
    }
}