'use strict';
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const sort = document.getElementById('sort');
const main = document.getElementById('main');

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});


let dataList = [];

const getUserData = async function () {
    const data = await fetch('https://randomuser.me/api');
    const response = await data.json();

    const { name } = response.results[0];

    let userInfo = {
        name: `${name.first} ${name.last}`,
        money: ((Math.random() * 1000000))
    }

    addData(userInfo)
}

getUserData()


const doubleMoney = function () {
    dataList = dataList.map(data => {
        return { ...data, money: data.money * 2 }
    })

    updateData()
}


const showOnlyMillionaires = function () {
    dataList = dataList.filter(data => data.money >= 1000000)
    updateData()
}


const calculateWealth = function () {
    let sum = 0;
    dataList.forEach(data => {
        sum += data.money
    })

    const div = document.createElement('div');
    div.classList.add('totalPrice')
    div.innerHTML = `<h3><span>Total Wealth:</span><strong>${formatter.format(sum)}</strong></h3>`
    main.appendChild(div)


}

const sortRichest = function () {
    dataList.sort((a, b) => b.money - a.money)
    updateData()
}

const addData = function (userInfo) {
    dataList.push(userInfo)
    updateData()
}

function updateData() {
    main.innerHTML = `<h2><strong>Person</strong> <span>Wealth</span></h2>`
    dataList.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> <span>${formatter.format(item.money)}</span>`;
        main.appendChild(element);
    })
}




addUserBtn.addEventListener('click', getUserData)
doubleMoneyBtn.addEventListener('click', doubleMoney)
showMillionairesBtn.addEventListener('click', showOnlyMillionaires)
sort.addEventListener('click', sortRichest)
calculateWealthBtn.addEventListener('click', calculateWealth)