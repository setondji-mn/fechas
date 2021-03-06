
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

const splitArray = (array, nOfsplits, size) =>{

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

const generateAvatar = (name) => {
    const query = `https://ui-avatars.com/api/?name=${name}&rounded=true&background=5c738a&size=35&color=ffffff&uppercase=false`;
    avatar = `<img src=${query} data-bs-toggle="tooltip" data-bs-placement="top" title=${name}>`;
    return avatar;
}

const getAvatarList = (members) => {
    let avatarList="";
    members.forEach( member =>{
        avatarList+=`<span class="avatar">${generateAvatar(member.name)}</span>`;
    });
    return avatarList;
}

function format(time) {   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}