const rad = 125;

function setup() {
    var canvas = createCanvas(400,400);
    canvas.parent("canvas-holder");
} 

function draw() {
}

function updateTree() {
    background(255);

    var weekNum = document.getElementById("timeline").value;
    var interactionSum = getWeeklyTotal(weekNum);

    strokeWeight(1);
    stroke(0);
    text("Week: " + weekNum, 10, 20);
    text("Total interactions: " + interactionSum, 10, 40);

    var i = 1;
    for (var key in thisWeek) {
        stroke(random(255), random(255), random(255));

        var x = rad*cos(i*TWO_PI/Object.keys(thisWeek).length);
        var y = rad*sin(i*TWO_PI/Object.keys(thisWeek).length);

        strokeWeight(1);
        circle(width/2 + x, height/2 + y, 10);
        text(key, width/2 + x + 10, height/2 + y + 5)
        let v = createVector(x, y);
        if (typeof data["interactions"][weekNum][key] === 'undefined') {
            v.mult(0);
        } else {
            v.mult(data["interactions"][weekNum][key]/interactionSum);
        }

        strokeWeight(5);
        line(width/2, height/2, width/2 + v.x, height/2 + v.y);

        i++;
    }


}