class Triangle{
    constructor(side1, side2, side3){
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    is_exist(){
        if (this.side1 < (this.side2 + this.side3)
         && this.side2 < (this.side1 + this.side3)
         && this.side3 < (this.side1 + this.side2))
            console.log("Triangle exist");
        else
            console.log("Triangle DOESN'T exist");
    }

    get_perimeter(){
        return this.side1 + this.side2 + this.side3;
    }

    get_square(){
        let = this.get_perimeter / 2;

        return Math.sqrt(p * (p - this.side1) * (p - this.side2)
        * (p - this.side3));
    }

    is_rectangular(){
        if (this.side1 * this.side1 === this.side2 * this.side2 + this.side3 * this.side3
        || this.side2 * this.side2 === this.side1 * this.side1 + this.side3 * this.side3
        || this.side3 * this.side3 === this.side2 * this.side2 + this.side1 * this.side1)
            console.log("Triangle is rectangular");
        else
            console.log("Triangle is NOT rectangular");
    }
}

//////////////////////////////////////////////////////////////

let fake_triangle = new Triangle(100, 1, 1);
fake_triangle.is_exist();

let triangle = new Triangle(3, 4, 5);
triangle.is_exist();
console.log("Perimeter: ", triangle.get_perimeter());
console.log("Square: ", triangle.get_square());
triangle.is_rectangular();
