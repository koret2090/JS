class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    show_info(){
        console.log("X:", this.x, "Y:", this.y)
    }
}

class Line{
    constructor(point1, point2){
        this.point1 = point1;
        this.point2 = point2;
    }

    show_info(){
        console.log("Point1| X:", this.point1["x"], "Y:", this.point1["y"]);
        console.log("Point2| X:", this.point2["x"], "Y:", this.point2["y"]);
    }

    get_len(){
        return Math.sqrt((this.point1["x"] - this.point2["x"]) * 
        (this.point1["x"] - this.point2["x"]) +
         (this.point1["y"] - this.point2["y"]) *
          (this.point1["y"] - this.point2["y"]));
    }
}

//////////////////////////////////////////////////////////////

let point1 = new Point(0, 0);
let point2 = new Point(1, 1);

point1.show_info();
point2.show_info();

let line = new Line(point1, point2);
line.show_info();
console.log("LENGTH:", line.get_len());


