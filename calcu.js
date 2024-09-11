function add(num1, num2) {
    return "This Is Add Function : " + (num1 + num2)
}

function sub(num1, num2) {
    console.log("This Is Sub Function : " + (num1 - num2));
}


module.exports = {
    add, sub
}
