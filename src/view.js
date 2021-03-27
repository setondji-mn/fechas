
/*******
* HTML content
*******/

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
            <form id="setup-form"> <div class="">
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
        <div>
        <p class="dates-count"> You have ${JSON.parse(localStorage.getItem('nOfDates')) - JSON.parse(localStorage.getItem('datesCount'))} dates left</p>
        </div>
        <div class="couples row"></div>
        <div class="timer-view"></div>
        <div class="action-buttons"> 
            <a id="launch-date" class="btn btn-primary"> Launch Date </a> 
            <a id="set-timer" class="d-none"> Set Timer </a> 
        </div>
    </div>`;

let endPage = `<div class="help-text">
    <a id="reset" class="btn btn-light"> Start over</a>
    </div>`;


/*******
* View functions
*******/


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
            pageTitle.textContent = "Hum, time for the good stuff. 😉";
            pageSubTitle.textContent = "Good luck!";
            
            localStorage.setItem('currentStep', 'play');
            localStorage.setItem('nextStep', 'end');

            /*****
             * Things that happen when the page is reloaded
             *****/

            //if we still have dates left, show the play page.  Else, load the end page
            if (JSON.parse(localStorage.getItem('datesCount'))<JSON.parse(localStorage.getItem('nOfDates'))) {
                pageContent.innerHTML = playPage;
            } 
            else{
                console.log('end');
                loadStep(localStorage.getItem('nextStep'));
            }

            //get couples for the current date and display the avatars
            let currentDate = JSON.parse(localStorage.getItem('currentDate'));
            let coupleList = document.querySelector('.couples');
            coupleList.innerHTML = '';
            currentDate.forEach(date => {
                coupleList.innerHTML += `<div class="col-4 single-couple">${getAvatarList(date)}</div>`;
            });


            /*****
             * Things that happen when the user has clicked on the launch button
            *****/
            let launchButton = document.getElementById('launch-date');
            launchButton.addEventListener('click', e =>{
                
                //check if we still have dates and load the End page if so. 
                //This control is necessary for when a user gets here by clicking on the launch button rather than loading the page.
                if (JSON.parse(localStorage.getItem('datesCount'))>=JSON.parse(localStorage.getItem('nOfDates'))) {
                    loadStep(localStorage.getItem('nextStep'));
                }
                else{

                    //clean timer if there is any
                    // if (timerCountdown) {
                    // clearInterval(timerCountdown);
                    // }

                    //generate couples for a new date and display the avatars. Also, store as current date
                    let newDate = launchDating();
                    let coupleList = document.querySelector('.couples');
                    coupleList.innerHTML = '';
                    newDate.forEach(date => {
                        coupleList.innerHTML += `<div class="col-4 single-couple">${getAvatarList(date)}</div>`;
                    });
                    localStorage.setItem('currentDate',JSON.stringify(newDate));
                    
                    //update the number of dates
                    localStorage.setItem('datesCount', JSON.stringify( JSON.parse(localStorage.getItem('datesCount'))+1 ));

                    //update the number of dates left text
                    let nDatesText = document.querySelector('.dates-count');
                    nDatesText.innerHTML = `You have ${JSON.parse(localStorage.getItem('nOfDates')) - JSON.parse(localStorage.getItem('datesCount'))} dates left`
                    
                    /*
                    //display the timer button
                    let timerButton = document.getElementById('set-timer');
                    timerButton.classList = 'btn btn-outline-dark';
                    
                    //display timer and handle countdown
                    let timerView = document.querySelector('.timer-view');
                    let setTimer = document.getElementById('set-timer');
                    let count = JSON.parse(localStorage.getItem('datesTimer'))*60;
                    setTimer.addEventListener('click', e=>{
                        setTimer.setAttribute('disabled','');
                        const timerCountdown = setInterval(()=>{
                            timerView.innerHTML = format(count);
                            count--;
                            if (count===0) {
                                clearInterval(timerCountdown);
                            }
                        }, 1000);
                    });*/
                }
            });
        break;

        case 'end':
            pageTitle.textContent = "Hey, how was it? 😇";
            pageSubTitle.textContent = "Hope you had a great time dating.";
            pageContent.innerHTML = endPage;
            localStorage.setItem('currentStep', 'end');

            let resetButton = document.getElementById('reset');

            resetButton.addEventListener('click', e =>{
                e.preventDefault();
                localStorage.clear();
                location.reload();
            });
        break;
    
        default:
            console.log("Error! Can't find step");
        break;
    }

    

};

