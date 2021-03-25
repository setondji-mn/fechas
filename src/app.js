
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

// const coupleSize = 3;
// let datesCount = 0;
// let datesHistory = [];


// localStorage.clear();

const initStorage = () =>{
    localStorage.setItem('currentStep', 'home');
    localStorage.setItem('nextStep', 'setup');
    localStorage.setItem('members', JSON.stringify(members));
    localStorage.setItem('datesHistory', JSON.stringify([]));
    localStorage.setItem('datesCount', JSON.stringify(0));
    localStorage.setItem('nOfDates', JSON.stringify(4));
    localStorage.setItem('datesTimer', JSON.stringify(20));
    localStorage.setItem('coupleSize', JSON.stringify(2));
};

// let persons2 = JSON.parse(localStorage.getItem('members'));


const launchDating = (members, coupleSize, datesCount) => {

    let datesHistory = JSON.parse(localStorage.getItem('dateHistory'));
    let newDate = generateCouples(members, coupleSize); 

    datesHistory.forEach( oldDate => {

        while(!isValidDate(newDate, oldDate)){
            newDate = generateCouples(members, coupleSize);
        }

    });

    datesHistory.push(newDate);
    localStorage.setItem('datesHistory', JSON.stringify(datesHistory));

    datesCount+=1;
    localStorage.setItem('datesCount', JSON.stringify(datesCount));
}

let homePage = `<div class="help-text">
    <h4>How does it work?</h4>
    <p>Tell us the number of people you would want to have per couple and we'll help you generate random matches for each dating round.
    You'll also get (eventually) a timer for tracking each session. Just tell us how long you want them to be and we'll handle everything.</p>
    <p> How does that sound? </p> <a id="next-step" class="btn btn-primary"> Yeah, let's go!</a>
    </div>`;

let setUpPage = `<div class="main-content">
    <div class="">
        <h5 class="members">Members</h5>
        <div class="avatars"></div>
    </div>
    <div>
        <form>
            <div class="mb-3">
            <label for="timer" class="form-label">Timer (min) </label>
            <input type="number" class="form-control" id="timer">
            </div>
            
            <button id="next-step" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>`;

const loadStep = (step) =>{

    let pageTitle = document.querySelector('#header .title');
    let pageSubTitle = document.querySelector('#header .sub-title');
    let pageContent = document.getElementById('content');


    switch (step) {
        case 'home':
            pageTitle.textContent = "So... you wanna have dates? 😏";
            pageSubTitle.textContent = "Great! Because Fechas can help you with that.";
            pageContent.innerHTML = homePage;
            localStorage.setItem('currentStep', 'home');
            localStorage.setItem('nextStep', 'setup');
        break;

        case 'setup':
            pageTitle.textContent = "I'll need to know a few things 😌";
            pageSubTitle.textContent = "Take a moment to set up how you'd like your session to go.";

            pageContent.innerHTML = setUpPage;
            let avatars = document.querySelector('.avatars');
            avatars.innerHTML= getAvatarList(members);
            localStorage.setItem('currentStep', 'setup');
            localStorage.setItem('nextStep', 'home');
        break;

        case 'b':
        break;
    
        default:
            console.log("Error! Can't find step");
        break;
    }

    let nextStepButton = document.getElementById('next-step');

    nextStepButton.addEventListener('click', (e)=>{
        e.preventDefault();
        loadStep(localStorage.getItem('nextStep'));
    });

};


console.log(localStorage);

if (localStorage.length===0) {
    initStorage();
}

loadStep(localStorage.getItem('currentStep'));
// switchStep();



