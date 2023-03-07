const monsterContainer = document.querySelector('#monster-container');

let pageNumber = 1;
const backButton = document.querySelector('#back');
const forwardButton = document.querySelector('#forward');

//Build create monster header
const createMonster = document.querySelector('#create-monster');
const newMonsterForm = document.createElement('form');
const nameMonsterForm = document.createElement('input');
const ageMonsterForm = document.createElement('input');
const descriptionMonsterForm = document.createElement('input');
const submitButton = document.createElement('input');

nameMonsterForm.setAttribute('type', 'text');
ageMonsterForm.setAttribute('type', 'text');
descriptionMonsterForm.setAttribute('type', 'text');
submitButton.setAttribute('type', 'submit');

nameMonsterForm.setAttribute('placeholder', 'Name New Monster');
ageMonsterForm.setAttribute('placeholder', 'New Monster Age');
descriptionMonsterForm.setAttribute('placeholder', 'New Monster Description');

createMonster.appendChild(newMonsterForm);
newMonsterForm.appendChild(nameMonsterForm);
newMonsterForm.appendChild(ageMonsterForm);
newMonsterForm.appendChild(descriptionMonsterForm);
newMonsterForm.appendChild(submitButton);

//Add event listener for submit button
newMonsterForm.addEventListener('submit', () => {
    event.preventDefault();
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'name': nameMonsterForm.value, 'age': ageMonsterForm.value, 'description': descriptionMonsterForm.value})
    })
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data)));
    nameMonsterForm.value = '';
    ageMonsterForm.value = '';
    descriptionMonsterForm.value = '';
})

fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
    .then(res => res.json())
    .then(data => {
        for(const monster in data){
            const monsterNameDisplay = document.createElement('h1');
            const monsterAgeDisplay = document.createElement('h3');
            const monsterDescriptionDisplay = document.createElement('p');
            
            monsterNameDisplay.innerText = data[monster].name;
            monsterAgeDisplay.innerText = data[monster].age;
            monsterDescriptionDisplay.innerText = data[monster].description;

            monsterContainer.appendChild(monsterNameDisplay);
            monsterContainer.appendChild(monsterAgeDisplay);
            monsterContainer.appendChild(monsterDescriptionDisplay);
        }
    })

backButton.addEventListener('click', () => {
    if(pageNumber > 1){
        pageNumber--;        
        monsterContainer.innerHTML = '';
        fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
            .then(res => res.json())
            .then(data => {
                for(const monster in data){
                    const monsterNameDisplay = document.createElement('h1');
                    const monsterAgeDisplay = document.createElement('h3');
                    const monsterDescriptionDisplay = document.createElement('p');
                    
                    monsterNameDisplay.innerText = data[monster].name;
                    monsterAgeDisplay.innerText = data[monster].age;
                    monsterDescriptionDisplay.innerText = data[monster].description;

                    monsterContainer.appendChild(monsterNameDisplay);
                    monsterContainer.appendChild(monsterAgeDisplay);
                    monsterContainer.appendChild(monsterDescriptionDisplay);
                }
            })
        }
    })

forwardButton.addEventListener('click', () => {
    pageNumber++;
    monsterContainer.innerHTML = '';
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
        .then(res => res.json())
        .then(data => {
            for(const monster in data){
                const monsterNameDisplay = document.createElement('h1');
                const monsterAgeDisplay = document.createElement('h3');
                const monsterDescriptionDisplay = document.createElement('p');
                
                monsterNameDisplay.innerText = data[monster].name;
                monsterAgeDisplay.innerText = data[monster].age;
                monsterDescriptionDisplay.innerText = data[monster].description;

                monsterContainer.appendChild(monsterNameDisplay);
                monsterContainer.appendChild(monsterAgeDisplay);
                monsterContainer.appendChild(monsterDescriptionDisplay);
            }
        })
    })