const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownTitleEl = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements =document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000 ;
const minute = second * 60 ;
const hour = minute * 60;
const day = hour * 24 ;

// Set min date to input with getting today date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);

// Populate Countdown / complete UI
function updateDom(){
     
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue  - now ;
        
        const days = Math.floor( distance / day );
        const hours = Math.floor( (distance  % day) / hour );
        const minutes = Math.floor( (distance % hour) / minute );
        const seconds = Math.floor( (distance % minute) / second );
     

            // Hide input and show Count Down
            inputContainer.hidden = true ;
            
        if(distance < 0) {
            countdownEl.hidden = true ; 
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} Finished on ${countdownDate}`;
            completeEl.hidden = false ;
        }else{
            // Show the countdown in progress
            countdownTitleEl.textContent = `${countdownTitle}`;
            timeElements[0].textContent = days ;
            timeElements[1].textContent = hours ;
            timeElements[2].textContent = minutes ;
            timeElements[3].textContent = seconds ;
            completeEl.hidden = true ; 
            countdownEl.hidden = false ;
        }
    },second);
}

// Take value from form Input
function updateCountDown(event){
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;

    savedCountdown = {
        title : countdownTitle,
        date : countdownDate
    };

    localStorage.setItem('countdown' , JSON.stringify(savedCountdown));

    if(countdownDate === ''){
        alert('Please Enter Date');
    }else{
            // Change the fixed time to miliseconds  
             countdownValue = new Date(countdownDate).getTime();
            updateDom();
    }



}
// Reset everythin
function reset(){
    // Hide count down and Complete
    countdownEl.hidden= true;
    completeEl.hidden = true;
    // show Input time
    inputContainer.hidden = false ;
    // Stop countin
    clearInterval(countdownActive);
    // reset title and time
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// Get Data from Localstorage
function restorePreviouscountdown(){
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true ;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title ;
        countdownDate = savedCountdown.date ; 
        countdownValue = new Date(countdownDate).getTime();
        updateDom();
    }
}

// Event Listener
countdownForm.addEventListener('submit',updateCountDown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

// On Load 
restorePreviouscountdown();