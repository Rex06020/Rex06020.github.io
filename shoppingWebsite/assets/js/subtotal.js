a1 = document.querySelector('#a1')
a2 = document.querySelector('#a2')
a3 = document.querySelector('#a3')

var price = [100, 200, 300]
var amount = [a1, a2, a3]
var total = 0

console.log(amount)

// for(var i = 0; i < 3; i++) {
//     console.log("i" + i)
//     console.log('a' + amount[i])
//     amount[i].addEventListener("change", updateSubTotal(i))
// }

// function updateSubTotal(i) {
//     num = amount[i].option
//     console.log("num" + num)
//     total = total + num * price[i]
//     //console.log(total)
//     subTotal = document.getElementById('#total')
//     console.log("subtotal" + subTotal)
// }

a1.addEventListener("change", function() {
    updateSubTotal()
})
a2.addEventListener("change", function() {
    updateSubTotal()
})
a3.addEventListener("change", function() {
    updateSubTotal()
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', submit);
})

function submit(event) {
    event.preventDefault(); //hault submit
    const inputObj = document.getElementsByTagName('input')
    console.log(inputObj)

    if (!validateForm()) return;

    const form = event.target; //target is destination url
    console.log('form: ' + form);
    const formData = new FormData(form);
    const params = new URLSearchParams(formData).toString();
    const url = `https://httpbin.org/post`;
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
    .then(response => response.text())
    .then(productData => {
        localStorage.setItem('productData', JSON.stringify(productData));
        redirect();
    })
    console.log('Async request end:', new Date().toLocaleTimeString());
}

function redirect() {
    console.log(document.querySelector('form'));
    
    window.location.href = "./cart.html"; //not a function
}

function updateSubTotal() {
    subTotal = document.querySelector('#total')
    console.log("subtotal" + subTotal)
    console.log("a1" + a1.value)
    console.log("a2" + a2.value)
    console.log("a3" + a3.value)
    
    console.log("a1*" + parseInt(a1.value) * price[0])
    console.log("a2*" + parseInt(a2.value) * price[1])
    console.log("a3*" + parseInt(a3.value) * price[2])
    
    subTotal.textContent =  '小計:' + (parseInt(a1.value) * price[0] + parseInt(a2.value) * price[1] + parseInt(a3.value) * price[2])
}

function validateForm() {

    const amt1Val = document.querySelector('#a1').value
    const amt2Val = document.querySelector('#a2').value
    const amt3Val = document.querySelector('#a3').value

    flag = 0
    //null check
    if (amt1Val == 0 && amt2Val == 0 && amt3Val == 0) {
        alert("未選取商品"); 
        return false;
    } 
    else return true;
}