const div = document.createElement('div')
document.body.appendChild(div)

// const carMake = document.createElement('input')
// carMake.placeholder = 'make'
// carMake.className = 'input-make'
// div.appendChild(carMake)

// const carModel = document.createElement('input')
// carModel.placeholder = 'model'
// carModel.className = 'model'
// div.appendChild(carModel)

// const carYear = document.createElement('input')
// carYear.placeholder = 'year'
// carYear.className = 'year'
// div.appendChild(carYear)

function createInput(placeholder, className) {
    const input = document.createElement('input')
    input.placeholder = placeholder
    input.className = className
    div.appendChild(input)
    return input
}
const carMake = createInput('make', 'input-make')
const carModel = createInput('model', 'model')
const carYear = createInput('year', 'year')

const btn = document.createElement('button')
document.body.appendChild(btn)
btn.innerText = 'OK'
btn.setAttribute('disabled', '')

let btnWasClicked = false

let car 

function handleWithReturn() {
    // if (carMake.value === '' || carModel.value == '' || carYear.value === '') {
    //     return
    // }
    if (carMake.value === '' || carModel.value == '' || carYear.value === '') {
        errorMsg.innerText = 'Укажите марку, модель и год выпуска автомля'
        return
    } else {
        errorMsg.innerText = ''
    }
    handleClick()
}

function handleWithAttribute() {
    // if (carMake.value.length || carModel.value.length || carYear.value.length) {
    //     btn.removeAttribute('disabled')
    // }
    handleClick()
}

function handleClick() {
    if (btnWasClicked)
        return
     car = {
        make: carMake.value,
        model: carModel.value,
        year: carYear.value,
    }
    btnWasClicked = true
    console.log(car)
    carMake.value = carModel.value = carYear.value = ''
    btn.setAttribute('disabled', '')
}

// btn.onclick = handleWithReturn
btn.onclick = handleWithAttribute

const errorMsg = document.createElement('div')
errorMsg.className = 'error-msg'
document.body.appendChild(errorMsg)

div.addEventListener('input', validateInput)
// function validateInput(e) {
//     if (carMake.value.length && carModel.value.length && carYear.value.length) {
//         btn.removeAttribute('disabled')
//     } else {
//         btn.setAttribute('disabled', '')
//     }
// }

function validateInput(e) {
    console.log(e)
    let empty = false
    const elem = e.target
    if (elem.value.length == 0) {
        empty = true
    } else if (elem.nextElementSibling) {
        if (elem.nextElementSibling.value.length == 0) {
            empty = true
        } else {
            if (elem.nextElementSibling.nextElementSibling) {
                if (elem.nextElementSibling.nextElementSibling.value.length == 0) {
                    empty = true
                }
            } else {
                if (elem.previousElementSibling.value.length == 0) {
                    empty = true
                }
            }
        }
    } else {
        if (elem.previousElementSibling.value.length == 0) {
            empty = true
        } else {
            if (elem.previousElementSibling.previousElementSibling.value.length == 0) {
                empty = true
            }
        }
    }
    // empty ? e.target.parentElement.nextElementSibling.setAttribute('disabled', '') : e.target.parentElement.nextElementSibling.removeAttribute('disabled')
    empty ? btn.setAttribute('disabled', '') : btn.removeAttribute('disabled')
}

/*
Состояние:		Make и year заполнены, model пустой
Изменение:		заполняем model

Состояние:		Make, model и year пустые
Изменение:		заполняем make

Сценарий № 1
Состояние:		Make и year заполнены, model пустой
Действие:		Заполняем model
Результат:		Make, model и year заполнены

Сценарий № 2
Состояние:		Make, model и year пустые
Действие:		Заполняем make
Результат:		Make заполнен, model и year пустые
*/