function generateWinningNumber(){
    let randomNum=Math.ceil(Math.random(0,100)*100);
    return randomNum;
}

function shuffle(anArr){
    let length = anArr.length;
    let totalLength;
    let randomIndex;
    while (length) {
    randomIndex = Math.floor(Math.random() * length--);
    totalLength = anArr[length];
    anArr[length] = anArr[randomIndex];
    anArr[randomIndex] = totalLength;
  }
  return anArr;
}

function newGame(){
    return new Game();
}

class Game{
    constructor(){
        this.playersGuess=null;
        this.pastGuesses=[];
        this.winningNumber=generateWinningNumber();
    };
    difference(){
        return Math.abs(this.playersGuess-this.winningNumber);
    };
    isLower(){
        return this.playersGuess<this.winningNumber ? true: false;
    };
    playersGuessSubmission(num){
        if(isNaN(num)|| num<=0 || num>100){
            // throw 'That is an invalid guess.';
            return 'That is an invalid guess.';
        }
        else{
            this.playersGuess=num;
            return this.checkGuess(num);
        }
    };
    checkGuess(aNum){
        if(aNum===this.winningNumber){
            return 'You Win!';
        }
        if(this.pastGuesses.includes(aNum)){
            return 'You have already guessed that number.';
        }
        this.pastGuesses.push(this.playersGuess);
        if(this.pastGuesses.length===5){
            return 'You Lose.';
        }
        if(this.difference()<10){
            return `You're burning up!`;
        }
        if(this.difference()<25){
            return `You're lukewarm.`;
        }
        if(this.difference()<50){
            return `You're a bit chilly.`;
        }
        if(this.difference()<100){
            return `You're ice cold!`;
        }
    };
    provideHint(){
        let hint = [this.winningNumber];
        hint.push(generateWinningNumber());
        hint.push(generateWinningNumber());
        return shuffle(hint);
    }
}

//-------------------
let testGame= newGame();

const submitButton=document.getElementById('submit');
const hintButton=document.getElementById('hint');
const resetButton=document.getElementById('retry');
const input=document.querySelector('input');
const returnMsg=document.querySelector('#returnMsg p');
const ul=document.querySelector('ul');
const li=document.querySelectorAll('li');

function submitGuess(){
    li.forEach(x=>x.innerHTML='');
    let value = parseInt(input.value);
    input.value='';
    let returnMessage=testGame.playersGuessSubmission(value);
    returnMsg.innerHTML=returnMessage;
    //----previous guess li---
    for(let i=0;i<testGame.pastGuesses.length;i++){
        let current = testGame.pastGuesses[i];
        li[i].appendChild(document.createTextNode(current));
    }
}

submitButton.addEventListener('click',()=>{
    submitGuess();
});

//enter key for submit button
input.addEventListener('keyup',function(e){
    let key = e.keyCode;
    if (key === 13) {
        submitGuess();
    }
    
});

resetButton.addEventListener('click',()=>{
    testGame= newGame();
    returnMsg.innerHTML='&nbsp;';
    li.forEach(x=>x.innerHTML='');
    // console.log(testGame.winningNumber);
    if(hintButton.style.display==='none'){
        hintButton.style.display='block';
    }
    return testGame;
})

//hint button
hintButton.addEventListener('click',()=>{
    let anArr=testGame.provideHint();
    let aStr= `The winning number is either ${anArr[0]},${anArr[1]} or ${anArr[2]}`;
    returnMsg.innerHTML=aStr;
    hintButton.style.display='none';
})
