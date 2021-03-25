
const members = [
    {"name" : "Doriane", "id" : 1 },
    {"name" : "Maelle", "id" : 2 },
    {"name" : "David", "id" : 3 },
    {"name" : "Bickel", "id" : 4 },
    {"name" : "Gary", "id" : 5 }, 
    {"name" : "Beni", "id" : 6 }, 
    {"name" : "Chris", "id" : 7 },
    {"name" : "Anicet", "id" : 8 },
    {"name" : "Nael", "id" : 9 }
];

const couplesSize = 3;
const nOfDates = 4;
let datesCount = 0;
let datesHistory = [];

localStorage.clear();
localStorage.setItem('members', JSON.stringify(members));
localStorage.setItem('datesHistory', JSON.stringify(datesHistory));
localStorage.setItem('datesCount', JSON.stringify(datesCount));


// localStorage.setItem('members', JSON.stringify(person));
// let persons2 = JSON.parse(localStorage.getItem('members'));


const launchDating = () => {

    let newDate = generateCouples(members, couplesSize); 

    datesHistory.forEach( oldDate => {

        while(!isValidDate(newDate, oldDate)){
            newDate = generateCouples(members, couplesSize);
        }

    });

    datesHistory.push(newDate);
    localStorage.setItem('datesHistory', JSON.stringify(datesHistory));

    datesCount+=1;
    localStorage.setItem('datesCount', JSON.stringify(datesCount));
}



for (let i = 0; i < nOfDates; i++) {
    launchDating();
}

console.log(localStorage);