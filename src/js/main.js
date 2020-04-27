let game = {
    playerName: '',
    difficulty: 10,
    attempts: 0,
};
let CHOOSED_DIFF;
let viewingCard = 0;
let generatedCards = new Set();
let combination = new Set();
let cardRepresentation = [];
let timeInterval;
let menu;
let menuHide = 0;


(function setup(){
    try{
        if(localStorage.getItem('record') !== null){
            records = JSON.parse(localStorage.getItem('record'))
        }
    }
    catch(err){
        console.log(`Microsoft Edge doesn't support localStorage: ${err}`)
    }
    document.querySelector('button').addEventListener('click', chooseDifficulty);
})();

function chooseDifficulty(){
    CHOOSED_DIFF = document.querySelector('select').value;

    //CHANGE DIFFICULTY
    if(CHOOSED_DIFF === 'easy'){
        game.difficulty = 10;
    }
    else if(CHOOSED_DIFF === 'medium'){
        game.difficulty = 20;
    }
    else{
        game.difficulty = 30;
    } 

    document.querySelector('#name').value === '' ? game.playerName = 'Unnamed' : game.playerName = document.querySelector('#name').value;

    return renderBoard();
}

function renderBoard(){
    const container = document.createElement('div');
    const hamburger = document.createElement('div');
    
    container.id = 'container'
    hamburger.id = 'hamburger'

    hamburger.dataset.mode = 'show';
    hamburger.innerHTML = 
        `<div class="line"></div>
         <div class="line"></div>
         <div class="line"></div>`;

    document.body.innerHTML = '';
    document.body.append(container, hamburger);
    
    for(let i = 0; i < game.difficulty; i++){
        container.innerHTML += 
        `<div>
            <img alt="Card" data-id="${i}" class="card" src='../img/back.jpg'>
        </div>`
    }

    createTools();
    setTimer();
    fixImageSize();
    createCardSets(generatedCards, game.difficulty / 2, 30);
    createCardSets(combination, game.difficulty);
    generateCards();

    document.querySelector('#hamburger').addEventListener('click', menuToggle);
    document.querySelectorAll('.card').forEach( card => card.addEventListener('click', viewCard))
}

function createTools(){
    const tools = document.createElement('div');
    const pointsBox = document.createElement('div');
    const timer = document.createElement('div');

    tools.id = 'tools';
    tools.className = 'hide';
    timer.id = 'timer';
    pointsBox.id = 'points';

    pointsBox.innerHTML = 'Clicks: <span id="actualPoints">0</span>';
    document.body.appendChild(tools);
    tools.append(timer, pointsBox);
}


function fixImageSize(){
    if(game.difficulty === 10){
        document.querySelectorAll('.card').forEach( card => card.style.width = '100%')
    }
    else if(game.difficulty === 20){
        document.querySelectorAll('.card').forEach( card => card.style.width = '40%')
    }
    else{
        document.querySelectorAll('.card').forEach( card => card.style.width = '25%')
    }
}

function createCardSets(set, size1, size2){
    if(size2 === undefined){
        size2 = size1;
    }
    //Fill set with random cards id
    while(set.size < size1){
        set.add(Math.floor(Math.random() * size2))
    }
}

function menuToggle(){
    const hamburger = document.querySelector('#hamburger');
    const lines = [
        document.querySelectorAll('#hamburger .line')[0], 
        document.querySelectorAll('#hamburger .line')[1], 
        document.querySelectorAll('#hamburger .line')[2]
    ];
    if(hamburger.dataset.mode === 'show'){
        document.querySelector('#tools').style.left = '0%';
        hamburger.dataset.mode = 'hide';
        lines[2].style = `margin-top:-10px;`;
        setTimeout( () => lines[0].style.transform = `rotate(45deg)`, 200);
        setTimeout( () => {
          lines[1].style.transform += `translateY(-200%) rotate(-45deg)`;
          lines[2].style.opacity = `0`;
        });
    }
    else{
        hamburger.dataset.mode = 'show';
        menuHide = 0;
        hideMenu();
        lines[2].style = `margin-top:5px;`;
        setTimeout( () => {
            lines[1].style.transform = `translateY(0.5px)`;
            lines[0].style.transform = `rotate(0deg)`;
            lines[1].style.transform = `translateY(0%) rotate(0deg)`;
            lines[2].style.opacity = `1`;
        }, 200);
    }
}

function hideMenu(){
    menuHide += 5;
    if(menuHide < 100){
        document.querySelector('#tools').style.left = `-${menuHide}%`;
    }
    else{
        return cancelAnimationFrame(menu)
    }

    menu = requestAnimationFrame(hideMenu);
}

function generateCards(){
    let orginal = Array.from(generatedCards);
    let combo = Array.from(combination);

    //DOUBLE SIZE OF ARRAY BY SAME VALUES
    orginal = orginal.concat(orginal)
    for(let i = 0; i < game.difficulty; i++){
        //CREATE CART REPRESENTATION
        cardRepresentation[i] = {
            [combo[i]]: orginal[i],
            guessed: false,
        } 
    }
}

function viewCard(e){
    ++game.attempts;
    document.querySelector('#actualPoints').textContent = `${game.attempts}`;

    if(e.target.dataset.guessed === 'guessed'){
        //IF CARD IS ALREADY GUESSING STOP FUNCTION
        return;
    }

   animating(e.target);

   cardRepresentation.forEach( cart => {
        if(cart.hasOwnProperty(Number(e.target.dataset.id)) && viewingCard <= 2){
            cart.guessed = true;
            e.target.src = `../img/${cart[e.target.dataset.id]}.jpg`;
            e.target.dataset.src = cart[e.target.dataset.id];
            e.target.dataset.guessed = 'guessed';
            viewingCard++;
        }
        if(viewingCard === 2){
            const overlayer = document.createElement('div');
            overlayer.id = 'overlayer';
            document.body.appendChild(overlayer)
            viewingCard = 0;
            clearAnimation();
            return determineGuess();
        }
   });
}

function determineGuess(){
    let guessingCards = [];
    while(guessingCards.length > 1){
        //EMPTY THE ARRAY
        guessingCards.pop();
    }
    document.querySelectorAll('.card').forEach( card =>{
        if(card.dataset.src !== '' && card.dataset.src !== null && card.dataset.src !== undefined){
            //PUSH CARD TO ARRAY CONTAINING CURRENTLY GUESSING CARDS
            guessingCards.push(card)
        }
    });
    if(guessingCards.length === 0){
        return badGuess();
    }
    else if(guessingCards[0].dataset.src === guessingCards[1].dataset.src){
        //IF BOTH CARD HAS EQUAL SRC IT IS A GUESSED PAIR
        return goodGuess();
    }
    else{
        return badGuess();
    }
}

function goodGuess(){
    document.querySelectorAll('.card').forEach( card => {
        if(card.dataset.guessed === 'guessed'){
            setTimeout(() => {
                const placeholder = document.createElement("span");
                placeholder.className = "placeholder";
                //ROTATE CARD TO BLACK BACKSIDE
                card.src = '../img/backGuessed.jpg';
                card.removeEventListener('click', viewCard);
                card.parentNode.style = `transition:all 0.5s;opacity:0`
                setTimeout( () =>  {
                    if(document.querySelector('#overlayer') !== null){
                        document.querySelector('#overlayer').remove();
                    }
                    card.parentNode.appendChild(placeholder);
                    card.remove();
                    return checkWin();
                }, 500);
            }, 500)
        }
    });
}

function badGuess(){
    setTimeout(() => {
        document.querySelectorAll('.card').forEach( card => {
            if(document.querySelector('#overlayer') !== null){
                document.querySelector('#overlayer').remove();
            }
            //ROTATE CARD TO IT'S BACK AND EMPTY THE DATASETS
            card.src = '../img/back.jpg';
            card.dataset.src = '';
            card.dataset.guessed = '';
        });
    }, 500);
}

function animating(elem){
    let animationCount = 0;
    if(animationCount === 0){
        elem.style =  
            `transform: rotateY(-160deg);
            -webkit-transform: rotateY(-160deg);`;
            animationCount++;
    }
    else if(animationCount === 1){
        elem.style =  
            `transform: rotateY(160deg);
            -webkit-transform: rotateY(160deg);`;
        animationCount = 0;
    }
    return fixImageSize();
}

function clearAnimation(){
    setTimeout( () => {
        document.querySelectorAll('.card').forEach( card => {
            card.style = 
                `transform: rotateY(0deg);
                -webkit-transform: rotateY(0deg);`;
                fixImageSize();
        });
    }, 500);
    
}

function checkWin(){
    const box = document.querySelectorAll('#container div');
    let check = Array.from(box).every(checkIfCardsIsGuessed);
   
    if(check){
        stopTime();
        return createWinScreen();
    }
}

function checkIfCardsIsGuessed(element){
    if(element.children[0] !== undefined){
        return element.children[0].nodeName === "SPAN";
    }
}

function createWinScreen(){
    const box = document.createElement('div');
    box.id = 'winBox';
    box.innerHTML = 
        `<h1>You won!</h1>
         <div id="finishGame">
            <div>
                <img alt="Icon" src='../img/reverseIcon.png'>
            </div>
            <div class="finishBoxElem">Name: <b>${game.playerName}</b></div>
            <div class="finishBoxElem">Time: <b>${document.querySelector('#timer').textContent.replace(/\s/g , '')}</b></div>
            <div class="finishBoxElem">Clicks: <b>${game.attempts}</b></div>
         </div>`;

    document.body.appendChild(box);
    document.querySelector('#hamburger').remove();
    document.querySelector('#container').remove();
}

function stopTime(){
    clearInterval(timeInterval);
}

function setTimer(){
    let hours = 0;
    let minutes = 0;
    let sec = 0;
    
    document.querySelector('#timer').innerHTML = 
        `<span id="h">00</span>
         <span id="m">:00:</span>
         <span id="s">00</span>`;

    timeInterval = setInterval( () => {
             sec++;
             if(sec === 59){
                 minutes++;
                 sec = 0;
             }
             if(minutes === 59){
                hours++;
                minutes = 0;
             }
             sec < 10 ? document.querySelector('#s').textContent =  `0${sec}` : document.querySelector('#s').textContent =  `${sec}`;
    
             minutes < 10 ? document.querySelector('#m').textContent =  `:0${minutes}:` : document.querySelector('#m').textContent = `:${minutes}:`;

             hours < 10 ? document.querySelector('#h').textContent =  `0${hours}` : document.querySelector('#h').textContent = `${hours}`;

    }, 1000)
}