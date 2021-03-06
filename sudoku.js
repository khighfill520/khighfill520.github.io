var nums = [];
    
function sudoku() {
    
    //declare variables
    var diffs = ["Easy", "Medium", "Hard"];
    var div = document.getElementById('buttons');
    var input = document.createElement('input');
    var puzzle = document.createElement('div');
    var table = document.createElement('table');
    var g;
    var h;
    var i;
    var j;
    var k;
    var m = 1;
    var tr;
    var td;
        
    //change buttons
    div.innerHTML = "";
    for (i = 0; i < 3; i++) {
        div.innerHTML += '<input type="submit" value="' + diffs[i] + '" onClick="play(this.value);" />';
    }
        
    
    
    //generate and classify rows
    for (j = 1; j < 10; j++) {
        tr = table.insertRow();
        if ((j % 3) == 0) {
            tr.setAttribute('class', 'heavy_bottom');
        }
        //generate cells
        for (k = 1; k < 10; k++) {
        var heavy = "";
            td = tr.insertCell();
            td.setAttribute('id', m);
            if ((k % 3) == 0) {
                heavy = "heavy_right ";
            }
            td.className = heavy;
            m++;
        }
    }
    puzzle.setAttribute('id', 'puzzle');
    document.body.appendChild(puzzle);
    puzzle.appendChild(table);
}

function play(value) {
    
    //declare variables
    var array;
    var diff = value;
    var buttons = document.getElementById('buttons');
    var easy = [1, 2, 3, 5, 7, 8, 9, 10, 12, 14, 16, 18, 19, 20, 21, 24, 25, 26, 27, 30, 31, 32, 33, 37, 38, 40, 41, 42, 44, 45, 49, 50, 51, 52, 55, 56, 57, 58, 61, 62, 63, 64, 66, 68, 70, 72, 73, 74, 75, 77, 79, 80, 81];
    var med = [4, 5, 6, 7, 8, 10, 13, 15, 19, 23, 24, 28, 29, 30, 32, 35, 36, 37, 39, 40, 41, 42, 43, 45, 46, 47, 50, 52, 53, 54, 58, 59, 63, 67, 69, 72, 74, 75, 76, 77, 78];
    var hard = [2, 6, 11, 12, 15, 17, 18, 21, 24, 25, 26, 28, 29, 30, 52, 53, 54, 56, 57, 58, 61, 64, 65, 67, 70, 71, 76, 80];
    var i;
    var j;
    var k;
    var m;
    var n;
    
    //set which pattern to use
    if (diff = 'Easy') {
        array = easy;
    } else if (diff = 'Medium') {
        array = med;
    } else {
        array = hard;
    }    
    
    //classify cells
    for (i = 1; i < 82; i++) {
        j = document.getElementById(i);
        k = (i / 9);
        //TURN INTO FOR LOOP
        if ((k <= 3) && ((i % 9) <= 3) && ((i % 9) !== 0)) {
            j.className += 'boxA';
        } else if ((k <= 3) && ((i % 9) <= 6) && ((i % 9) !== 0)) {
            j.className += 'boxB';
        } else if ((k <= 3) && (((i % 9) > 6) || ((i % 9) == 0))) {
            j.className += 'boxC';
        } else if ((k <= 6) && ((i % 9) <= 3) && ((i % 9) !== 0)) {
            j.className += 'boxD';
        } else if ((k <= 6) && ((i % 9) <= 6) && ((i % 9) !== 0)) {
            j.className += 'boxE';
        } else if ((k <= 6) && (((i % 9) > 6) || ((i % 9) == 0))) {
            j.className += 'boxF';
        } else if ((k <= 9) && ((i % 9) <= 3) && ((i % 9) !== 0)) {
            j.className += 'boxG';
        } else if ((k <= 9) && ((i % 9) <= 6) && ((i % 9) !== 0)) {
            j.className += 'boxH';
        } else {
            j.className += 'boxI';
        }
    }
    
    //generate finished puzzle
    for (m = 1; m < 82; m++) {
        n = document.getElementById(m);
        nums[m] = Math.floor(Math.random()*9+1);        
        n.innerHTML = nums[m];
        while (check() === false) {
            nums[m] = Math.floor(Math.random()*9+1);       
            n.innerHTML = nums[m];
        }
        //insert text boxes
        if (array.includes(m) === false) {            
            n.innerHTML = '<input type="text" />';
        }
    }
    document.body.removeChild(buttons);
}

function check() {
    
    //declare variables
    var i;
    var j;
    var k;
    var m;
    var n;
    var p;
    var q;
    var r;
    var t;
    var u;
    var box;
    var varj;
    var varp;
    var cell;
    var clss;
    
    //get first number to compare
    for (i = 1; i < 82; i++) {
        j = 1;
        //check row for duplicates
        while (j < 9) {
            console.log(j);
            k = i + j;
            console.log(k);
            console.log(nums[i]);
            console.log(nums[k]);
            if (nums[i] === nums[k]) {
                return false;
            }
            j++;
         }
         //check column for duplicates
         /*while (p <=9)
             p = 1;
             varp = nums[i];
         while ((varp / 9) < 9) {
             varp = nums[(i + p)];
             p++;
         }
         q = 9 - p;
         for (r = 1; r <= q; r++) {
             comp2 = nums[(i - (r * 9))];
             if (!comp2) {
                 continue;
             } else if (comp1 == comp2) {
                 return false;
             }
         }
         for (t = 1; t < p; t++) {
             comp2 = nums[(i + (t * 9))];
             if (!comp2) {
                 continue;
             } else if (comp1 == comp2) {
                 return false;
             }
         }
         //check box for duplicates
         cell = document.getElementById(i);
         if (cell.classList.length == 2) {
             clss = cell.classList.item(1);
         } else {
             clss = cell.className;
         }
         box = document.getElementsByClassName(clss);
         for (u = 0; u < box.length; u++) {
             comp2 = box[u];
             if ((comp1.id == comp2.id) || (!comp2)) {
                 continue;
             } else if (comp1 == comp2){
                 return false;
             }
         }*/              
     }
}
