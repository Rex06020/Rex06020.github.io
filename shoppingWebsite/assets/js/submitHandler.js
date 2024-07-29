document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', submit);
})

function submit(event) {
    event.preventDefault(); //hault submit
    const inputObj = document.getElementsByTagName('input')
    console.log(inputObj)

    for (var i = 0; i < inputObj.length; i++) {
        if (inputObj[i].value === "") {
            alert("輸入不能為空")
            return;
        }
    }

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
    .then(signUpData => {
        //document.getElementById('result').textContent = data
        localStorage.setItem('signUpData', JSON.stringify(signUpData));
        redirect();
    })
    console.log('Async request end:', new Date().toLocaleTimeString());
}

function redirect() {
    console.log(document.querySelector('form'));
    //setTimeout(document.querySelector('form').submit(), 1000);
    
    window.location.href = "./product.html"; //not a function
}