const fieldSetContainer = document.querySelector('.fieldSetContainer')
const resultContainer = document.querySelector('.result')
const countButton = document.querySelector('#countButton')
const moreButton = document.querySelector('#addMore')
const nameInput = document.querySelector('#nameOfProduct')

let total;
let result = []
let arrayValues = []

moreButton.addEventListener('click', ()=> {
    fieldSetContainer.insertAdjacentHTML('beforeend', `
    <fieldset>
            <label>
                ingredient title
                <input name="name" type="text" required/>
            </label>
            <label>
                in package
                <input name="inPackage" type="number" required min="1" step="any"/>
            </label>
            <label>
                cost of package
                <input name="costOfPackage" type="number" required min="1" step="any"/>
            </label>
            <label>
                in receipt
                <input name="inReceipt" type="number" required min="1" step="any"/>
            </label>
            <button class="removeFieldset" type="button">x</button>
        </fieldset>`)
})
fieldSetContainer.addEventListener('click', (evt) => {
    if(evt.target.type === 'button') { evt.target.parentNode.remove() }})

countButton.addEventListener('click', (evt) => { evt.preventDefault();
    if(document.querySelector("form").reportValidity() === true) {
        arrayValues = []
        result = [];
        [...fieldSetContainer.children].forEach((item) => {
            arrayValues.push({
                name: (item.children.item(0).children.item(0)).value,
                inPackage: (item.children.item(1).children.item(0)).value,
                costOfPackage: (item.children.item(2).children.item(0)).value,
                inReceipt: (item.children.item(3).children.item(0)).value,
            })})
        arrayValues.forEach((item)=> {
            result.push({name:item.name, result: (Number(item.inReceipt) / Number(item.inPackage) * Number(item.costOfPackage)) })
        })
        total = result.reduce((prev, obj)=> prev + obj.result, 0);
        while (resultContainer.hasChildNodes()) {
            resultContainer.removeChild(resultContainer.lastChild);
        }
        result.forEach((html)=> {
            resultContainer.insertAdjacentHTML('beforeend',
                `<p>${html.name}:  ${html.result.toFixed(2)}</p>`)
        })
        resultContainer.insertAdjacentHTML('afterbegin', `<h3>${nameInput.value}</h3>`)
        resultContainer.insertAdjacentHTML('beforeend', `
        <label class="total-count">
            <b>total: </b> ${total.toFixed(2)}
            <input id="totalNumber" type="number" min="1" step="any"/>
            <button id="knowPart" type="button">/</button>
        </label>`)
        const knowPart = document.querySelector('#knowPart')
        const totalNumber = document.querySelector('#totalNumber')
        knowPart.addEventListener('click',()=> resultContainer.insertAdjacentHTML(
            'beforeend', `<p>portion price: ${total / totalNumber.value}</p>`)
        )
    }
})
