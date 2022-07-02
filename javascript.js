//grab dom elements and store them in variables
let current = document.getElementById('current');
let zero = document.getElementById('zero');
let clear = document.getElementById('clear');
let del = document.getElementById('delete');
let point = document.getElementById('point');
let equal = document.getElementById('equals');

console.log(zero,clear,del,point,equal);

//create empty object that will store user input and result (num1, operand, num2, result)
let object = {};

//math operators
function add(a,b){
    let result = Number(a) + Number(b);
    current.textContent = result; //update display
    object['result'] = result; //update object
    delete object.num1;
    delete object.num2;
    delete object.operand;
}

function subtract(a,b){
    let result = 0;
    result = Number(a) - Number(b);
    current.textContent = result;
    object['result'] = result;
    delete object.num1;
    delete object.num2;
    delete object.operand;

    
}

function multiply(a,b){
    let result = 0;
    result = Number(a) * Number(b);
    current.textContent = result;
    object['result'] = result;
    delete object.num1;
    delete object.num2;
    delete object.operand;
   
}

function divide(a,b){
    let result = 0;
    if(b === 0  || isNaN(b)){ //Nan = not a number
        console.log("Undefined");
        return;
    }
    else{
    result = Number(a) / Number(b);
    current.textContent = result;
    object['result'] = result;
    delete object.num1;
    delete object.num2;
    delete object.operand;
    }
    
}


function operate(a, operator, b){
    if(operator == "+"){
        add(a,b);
    } else if ( operator == "-"){
        subtract(a,b);
    } else if (operator == "*"){
        multiply(a,b);
    } else if (operator == "/" && b == 0){
        current.textContent = "Undefined";
    } else if (operator =="/"){
        divide(a,b);
    }
}

//loop to create event handlers for button numbers 1-9

let buttonPushNumber = document.getElementsByClassName("button-number"); //grab DOM elemebts

for (let i = 0; i < buttonPushNumber.length; i++){
    buttonPushNumber[i].addEventListener("click", (e) =>{
       addNumber(e.target.textContent)
    });
}

let buttonPushOperator = document.getElementsByClassName("button-operator");

for(let i=0; i < buttonPushOperator.length; i++){
    buttonPushOperator[i].addEventListener("click", (e) =>{
        addOperator(e.target.textContent);
    });
}

//takes content from button-number and populates display screen
function addNumber(x){
    //if there is a result in the object and no operand in object, return false
    if(('result' in object) && !('operand' in object)){
        return false;
    }

    else if(!('operand' in object) && !('num1' in object)){
        object["num1"] = [x];
        current.textContent = object.num1;
    }

    else if(!('operand' in object) && (object.num1.length < 12)){
        object["num1"] += [x];
        current.textContent = object.num1;
    }

    else if(('operand' in object) && !('num2' in object)){
        object["num2"] = [x];
        current.textContent = object.num2;
    }

    else if(('operand' in object) && (object.num2.length < 12)){
        object["num2"] += [x];
        current.textContent = object.num2;
    }
}

function addOperator(x){
    if(!('num1' in object) && !('result' in object)){
        return false;
    }
    else if (('result' in object) && ('operand' in object) && ('num2' in object)){
        operate(object.result, object.operand, object.num2);
        current.textContent = object.result + x;
        object['operand'] = x;
    }

    else if (('num1' in object) && ('operand' in object) && ('num2' in object)){
        operate(object.num1, object.operand, object.num2);
        current.textContent = object.result + x;
        object['operand'] = x;
    }

    else{
        if('num1' in object){
            object['operand'] = x;
            current.textContent = object.num1 + x;
        }
        else{
            current.textContent = object.result + x;
            object['operand'] = x;
        }
    }

}

equal.addEventListener("click", equalPushed);

function equalPushed(){
    if(!('num2' in object)){
        return false;
    }
    else if(!('result' in object)) {
        operate(object.num1, object.operand, object.num2);
    }
    else{
        operate(object.result, object.operand, object.num2);
    }
}

//zero button: does not allow for repetition of zero button clicks
zero.addEventListener('click', addZero);

function addZero(){
    if(('result' in object) && !('operand' in object)){
        return false;
    }
    else if(!('operand' in object) && !('num1' in object)){
        object["num1"] = [0];
        current.textContent = object.num1;
    }
    else if(!('operand' in object)){
        if(!(object.num1[0] == 0) && (object.num1.length < 10)){
            object["num1"] += [0];
            current.textContent = object.num1;
        }
    }

    if (!('num2' in object) && ('operand' in object)){
        object["num2"] = [0];
        current.textContent = object.num2;
    }
    else if ('num2' in object){
        if(!(object.num2[0] == 0) && (object.num2.length < 10)){
            object["num2"] += [0];
            current.textContent = object.num2;
        }
    }
}

//button to add decimal point 
point.addEventListener('click', addPoint);

function addPoint(){
    if(!('num1' in object) && !('result' in object)){
        object["num1"] = "0. ";
        current.textContent = object.num1;

    }
    else if(('num1' in object) && !('operand' in object)){
        if(!(object.num1.includes('.'))){
            object["num1"] += ["."];
            current.textContent = object.num1;
        }
    }
    else if(('num1' in object) && ('operand' in object) && (!('num2' in object))){
        object["num2"] = "0. ";
        current.textContent = object.num2;

    }

    else if('num2' in object){
        if(!(object.num2.includes('.'))){
            object["num2"] += ["."];
            current.textContent = object.num2;
        }
    }

    else if (('product' in object) && ('operand' in object) && (!('num2' in object))){
        object["num2"] = "0. ";
        current.textContent = object.num2;
    }
}

//function to delete most recently entered button
del.addEventListener('click', deleteLast);

function deleteLast(){
    if(('num1' in object) && (!('operand' in object))){
        let newString = object.num1.slice(0,-1);
        object.num1 = newString;
        current.textContent = object.num1;
    }

    else if (('num1' in object) && ('operand' in object) && (!('num2' in object))){
        delete object.operand;
        current.textContent = object.num1;
    }

    else if(('operand' in object) && ('num2' in object)){
        let newString = object.num2.slice(0,-1);
        object.num2 = newString;
        current.textContent = object.num2;
    }
}

clear.addEventListener('click', clearOut)

function clearOut(){
    delete object.num1;
    delete object.num2;
    delete object.operand;
    delete object.result;
    current.textContent = "";
}