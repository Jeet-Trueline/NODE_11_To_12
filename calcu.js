
function add(num1, num2) {

    // console.log(typeof num1);

    return "This Is Add Function :" + (Number(num1) + Number(num2));
}

function sub(num1, num2) {
    return "This Is Sub Function : " + (num1 - num2);
}


module.exports = {
    add, sub
}
