document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('form').addEventListener('submit', submit)
})

function validateForm() {

    const amt1Val = document.querySelector('#amount1').value
    const amt2Val = document.querySelector('#amount2').value
    const amt3Val = document.querySelector('#amount3').value
    const getCgVal = document.querySelector('#getCargo').value
    const addsVal = document.querySelector('#address').value

    flag = 0
    //null check
    if (getCgVal === "" || addsVal === "" || typeof addsVal === "undefined") {
        document.querySelector('#output').textContent += "輸入不得為空 ";
        flag = 1
    }
    if (amt1Val == 0 && amt2Val == 0 && amt3Val == 0) {
        document.querySelector('#output').textContent += "未選取商品 "
        flag = 1
    }

    if (flag) return false;
    else return true;
}

function submit(event) { //multi. threads
    event.preventDefault(); // 防止表單提交
    document.querySelector('#output').textContent = "";

    if (!validateForm()) return;
    else {
        const form = event.target; //target is a set of name/keyword
        // console.log('form:' + form)
        const formData = new FormData(form); //a set of key/value
        // console.log('form data:' + formData)
        const params = new URLSearchParams(formData).toString(); //content
        // console.log('param:' + params)
        const url = `https://httpbin.org/post`;
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        })
        .then(response => response.json()) //回傳格式
        .then(cartData => {
            document.querySelector('#output').textContent = JSON.stringify(cartData);
            document.querySelector('#url').textContent = cartData.url;
            localStorage.setItem('cartData', JSON.stringify(cartData));
        })
        .catch(error => {
            console.error('Fatal', error);
        })
    }
}