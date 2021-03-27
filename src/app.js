
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

const initStorage = () =>{
    localStorage.setItem('currentStep', 'home');
    localStorage.setItem('nextStep', 'setup');
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('datesHistory', JSON.stringify([]));
    localStorage.setItem('currentDate', JSON.stringify([]));
    localStorage.setItem('datesCount', JSON.stringify(0));
    localStorage.setItem('nOfDates', JSON.stringify(4));
    localStorage.setItem('datesTimer', JSON.stringify(20));
    localStorage.setItem('coupleSize', JSON.stringify(2));
};

if (localStorage.length===0) {
    initStorage();
}

loadStep(localStorage.getItem('currentStep'));







