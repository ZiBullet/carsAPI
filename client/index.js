let url = 'http://localhost:3001'
function getAxios(direction, func) {
    axios.get(`${url}/${direction}`)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                let data = res.data
                func(data)
            }
        })
}
const newCarsContainer = document.querySelector('.container__content-new__cars')
const oldCarsContainer = document.querySelector('.container__content-old__cars')
const otherCarsContainer = document.querySelector('.container__content-other__cars')
let slicers = {
    newCarsSlicer: true,
    oldCarsSlicer: true,
    otherCarsSlicer: true
}
let containers = document.querySelectorAll('.content-style')
function reload(cars) {
    let newSlicedCars = []
    let oldSlicedCars = []
    let otherSlicedCars = []
    let currentYear = new Date().getFullYear()
    containers.forEach(cont => {
        cont.innerHTML = ''
        cont.nextElementSibling.onclick = () => {
            let att = cont.nextElementSibling.getAttribute('data-open')
            switch (att) {
                case 'new':
                    if (slicers.newCarsSlicer) {
                        slicers.newCarsSlicer = false
                    } else {
                        slicers.newCarsSlicer = true
                    }
                    break;
                case 'old':
                    if (slicers.oldCarsSlicer) {
                        slicers.oldCarsSlicer = false
                    } else {
                        slicers.oldCarsSlicer = true
                    }
                    break;
                case 'other':
                    if (slicers.otherCarsSlicer) {
                        slicers.otherCarsSlicer = false
                    } else {
                        slicers.otherCarsSlicer = true
                    }
                    break;
                default:
                    break;
            }
            getAxios('cars', reload)
        }
    });
    for (let car of cars) {
        // ___________________________Creating part____________________________________________
        let carsCard = document.createElement('div')
        let carName = document.createElement('h4')
        let carModel = document.createElement('b')
        let carInfo = document.createElement('div')
        let carKey = document.createElement('span')
        let carRelease = document.createElement('span')
        let btnMore = document.createElement('button')
        // ____________________________Decorating part____________________________________________
        carsCard.classList.add('cars-card')
        carName.innerHTML = car.manufacturer
        carModel.innerHTML = ` ${car.model}`
        carInfo.classList.add('cars__card-info')
        carKey.innerHTML = `VIN: ${car.vin}`
        carRelease.innerHTML = `Year: ${car.year}`
        btnMore.innerHTML = 'Подробнее'
        // ___________________________________________Appending part_______________________________________
        carsCard.append(carName, carInfo, btnMore)
        carName.append(carModel)
        carInfo.append(carKey, carRelease)
        let carAge = currentYear - car.year
        // ______________________________________Reload events____________________________________________
        if (carAge <= 15) {
            newSlicedCars.push(carsCard)
            arrSlicer(newSlicedCars, newCarsContainer, slicers.newCarsSlicer)
        } else if (carAge <= 25) {
            oldSlicedCars.push(carsCard)
            arrSlicer(oldSlicedCars, oldCarsContainer, slicers.oldCarsSlicer)
        } else {
            otherSlicedCars.push(carsCard)
            arrSlicer(otherSlicedCars, otherCarsContainer, slicers.otherCarsSlicer)
        }
    }
    function arrSlicer(arr, cont, swither) {
        let slicer = arr.slice(0, 4)
        if (swither) {
            reloadMiniArr(slicer, cont)
        } else {
            reloadMiniArr(arr, cont)
        }
        function reloadMiniArr (arr, cont) {
            for (let item of arr) {
                cont.append(item)
            }
        }   
    }
}
getAxios('cars', reload)