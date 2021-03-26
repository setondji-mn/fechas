
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


const launchDating = () => {

    let members = JSON.parse(localStorage.getItem('members'));
    let coupleSize = JSON.parse(localStorage.getItem('coupleSize'));

    let datesHistory = JSON.parse(localStorage.getItem('datesHistory'));
    let newDate = generateCouples(members, coupleSize); 

    datesHistory.forEach( oldDate => {

        while(!isValidDate(newDate, oldDate)){
            newDate = generateCouples(members, coupleSize);
        }

    });

    datesHistory.push(newDate);
    localStorage.setItem('datesHistory', JSON.stringify(datesHistory));

    return newDate;
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
        <form id="setup-form">

            <div class="">

            <div class="col">
                <label for="timer" class="form-label">Timer (min) </label>
                <input type="number" class="form-control" id="timer" name="timer" required>
            </div>

            <div class="col">
                <select class="form-select" aria-label="Default select example" name="size">
                    <option value="2" selected>2 members</option>
                    <option value="3" >3 members</option>
                </select>
            </div>
            <button id="next" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</div>`;

let playPage = `<div class="main-content">

    <div class="dates-count">
    <p> You have ${JSON.parse(localStorage.getItem('nOfDates')) - JSON.parse(localStorage.getItem('datesCount'))} dates left</p>
    </div>

    <div class="couples row">
    </div>
    <a id="launch-date" class="btn btn-primary"> Launch Date </a>
    <div></div>

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

            let nextStepButton = document.getElementById('next-step');

            nextStepButton.addEventListener('click', e =>{
                e.preventDefault();
                loadStep(localStorage.getItem('nextStep'));
            });
        break;

        case 'setup':
            pageTitle.textContent = "I'll need to know a few things 😌";
            pageSubTitle.textContent = "Take a moment to set up how you'd like your session to go.";

            pageContent.innerHTML = setUpPage;
            let avatars = document.querySelector('.avatars');
            avatars.innerHTML= getAvatarList(members);
            localStorage.setItem('currentStep', 'setup');
            localStorage.setItem('nextStep', 'play');

            let form = document.getElementById('setup-form');

            form.addEventListener('submit', (e)=>{
                e.preventDefault();
                localStorage.setItem('datesTimer', JSON.stringify(parseInt(form.timer.value)));
                localStorage.setItem('coupleSize', JSON.stringify(parseInt(form.size.value)));
                loadStep(localStorage.getItem('nextStep'));

            });
        break;

        case 'play':
            pageTitle.textContent = "So... you wanna have dates? 😏";
            pageSubTitle.textContent = "Great! Because Fechas can help you with that.";
            pageContent.innerHTML = playPage;
            localStorage.setItem('currentStep', 'play');
            localStorage.setItem('nextStep', 'end');

            let launchButton = document.getElementById('launch-date');
            launchButton.addEventListener('click', e =>{

                let newDate = launchDating();
                console.log(newDate);
                
                // localStorage.setItem('datesCount', JSON.stringify( JSON.parse(localStorage.getItem('datesCount'))+1 ));

                let coupleList = document.querySelector('.couples');
                coupleList.innerHTML = '';
                newDate.forEach(date => {
                    coupleList.innerHTML += `<div class="col-4 single-couple">${getAvatarList(date)}</div>`;
                });
                
                

            });
            
            

        break;
    
        default:
            console.log("Error! Can't find step");
        break;
    }

    

};


// console.log(localStorage);

if (localStorage.length===0) {
    initStorage();
}

loadStep(localStorage.getItem('currentStep'));







