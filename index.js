const fieldSetContainer = document.querySelector('.fieldSetContainer')
const resultContainer = document.querySelector('.result')
const countButton = document.querySelector('#countButton')
const moreButton = document.querySelector('#addMore')
const removeFieldSetButton = document.querySelector('.removeFieldset')
let result = []
let arrayValues = []

moreButton.addEventListener('click', ()=> {
    fieldSetContainer.insertAdjacentHTML('beforeend', `
    <fieldset class="countItem">
            <label class="countItemLabel">
                name of ingredient
                <input name="name" type="text"/>
            </label>
            <label  class="countItemLabel">
                in package
                <input name="inPackage" type="number"/>
            </label>
            <label class="countItemLabel">
                cost of package
                <input name="costOfPackage" type="number"/>
            </label>
            <label class="countItemLabel">
                in receipt
                <input name="inReceipt" type="number"/>
            </label>
            <button class="removeFieldset">x</button>
        </fieldset>`)
})
removeFieldSetButton.addEventListener('click', (evt) => {
    evt.target.parentElement.remove()
})
countButton.addEventListener('click', () => {
    resultContainer.replaceChildren()
    arrayValues = []
    result = [];
    [...fieldSetContainer.children].forEach((item) => {
        arrayValues.push({
            name: (item.children.item(0).children.item(0)).value,
            inPackage: (item.children.item(1).children.item(0)).value,
            costOfPackage: (item.children.item(2).children.item(0)).value,
            inReceipt: (item.children.item(3).children.item(0)).value,
        })
    })
    arrayValues.forEach((item)=> {
        result.push({name:item.name, result: (Number(item.inReceipt) / Number(item.inPackage) * Number(item.costOfPackage)).toFixed(2) })
    })
    result.forEach((html)=> {
        resultContainer.insertAdjacentHTML('beforeend',`
        <div>
                <p>${html.name}</p>
                <p>${html.result}</p>
        </div>
        `)
    })
})
