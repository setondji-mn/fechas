localStorage.clear();
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

localStorage.setItem('datesHistory', JSON.stringify(datesHistory));
localStorage.setItem('datesCount', JSON.stringify(datesCount));


// localStorage.setItem('members', JSON.stringify(person));
// let persons2 = JSON.parse(localStorage.getItem('members'));


/**
 * This function takes an array and shuffles its content
 * It returns a new array with random positions
 */

const shuffleArray = (array) => {
    let done = array.length;
    let shuffled = [];


    while(done>0){
        let random = Math.round(Math.random()*100); //generates random number between 0 and 100
        if (random < array.length && !shuffled.includes(array[random])){ //if the number is in the scope of our list and is not already in the table
            shuffled.push(array[random]); 
            done-=1;
        };
    }
    return shuffled;
}

const generateCouples = (people, size) => {

    let members = shuffleArray(people);
    let couples = [];

    //if there's 1 person left, we reduce the number of couples (that last person will join the last couple) 
    let nOfCouples = (people.length % size) === 1 ? Math.floor(people.length/size) : Math.ceil(people.length/size); 

    let i = 0;
    while(i<nOfCouples){
        couples.push(members.slice(i*size, (i*size)+size));
        i+=1;
    }

    //if there's one person left, we add him to the last couple (so there's no singles)
    if((people.length % size) === 1) 
    couples[i-1].push(members[members.length-1]);

    return couples;
}

const isValidCouple = (newCouple, oldCouple) => {
    let check = 0;
    
    if(newCouple.length < oldCouple.length){

        oldCouple.forEach( partner => {
            if(newCouple.includes(partner))
            check+=1;
        });

    } else {

        newCouple.forEach( partner => {
            if(oldCouple.includes(partner))
            check+=1;
        });
    }

    return check < 2;
}

const isValidDate = (newDate, oldDate) => {
    let check =0;
    newDate.forEach( couple =>{
        oldDate.forEach( olds =>{
            if(!isValidCouple(couple, olds))
            check+=1;
        })
    });
    return !check;
}







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





// for (let i = 0; i < 4; i++) {
//     launchDating();
// }
