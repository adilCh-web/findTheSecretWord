
import  {secretWords} from "./words.js"


let music = true;
let musicButton = document.getElementById("music")
var word = secretWords[Math.floor(Math.random() * secretWords.length)]
let lettersArray=[]
// console.log(secretWords.length)
for(let i=0;i<word.length;i++)
{
    lettersArray.push(word[i])
}
var nr = 0  // we use this variable for the id when we create the ul once we click the submit button
var tries = 6
var seconds= 210
var interval


const gameTheme = new Audio("./tracks/Thinking-music-full-version.mp3") //3:31 ---211 sec
const gameOverSound = new Audio("./tracks/mixkit-falling-game-over-1942.wav")
const winingSound = new Audio("./tracks/K3RTHA7-game-win-horns.mp3")
const insertSound = new Audio("./tracks/insert.wav")



// changing sound sitting
musicButton.addEventListener("click", ()=>
{
    if(musicButton.textContent === "Sound: ON")
    {
        music = false;
        musicButton.textContent = "Sound: OFF"
        console.log(musicButton.textContent)

    }
    else
    {
        music = true;
        musicButton.textContent = "Sound: ON"
        console.log(musicButton.textContent)
    }
}
)


function submitWord()
{
    let myWord = document.getElementById("myWord").value
    if(music==true)
    {
        insertSound.play()
    }

    // console.log(myWord)
    // console.log(word)
    if(myWord.toLowerCase() !==word.toLowerCase() )
    {

        if (tries !==1)
        {
            document.getElementById("nav").style.display = "block"
            
            nr+=1
            //console.log(myWord)
            let id = "id"+nr
            const ul = document.createElement("ul")
            ul.setAttribute("id", id)
            for(let i = 0;i<myWord.length;i++)
            {
                const li = document.createElement("li")
                li.innerHTML = myWord[i].toUpperCase()
                ul.appendChild(li)
                if(word[i] == myWord[i].toLowerCase())
                {
                    li.style.backgroundColor = "green"
                }
                if(word[i].toLowerCase() !== myWord[i].toLowerCase() && lettersArray.includes(myWord[i].toLowerCase()))
                {
                    li.style.backgroundColor = "red"
                }
            }
            document.getElementById("myTries").appendChild(ul)

        }
        else
        {
            document.getElementById("meanDiv").style.display = "none"
            document.getElementById("myTries").style.display = "none"
            document.getElementById("gameOver").style.display = "block"
            clearInterval(interval)
            const p = document.getElementById("info");
            
            p.innerHTML = "the Secret Word is :" + "<br>" + word;
            if(music == true)
            {
                gameTheme.pause()
                gameOverSound.play()
            }
        }
        tries-=1
        document.getElementById("nrOfTries").innerHTML = "Number Of tries: 0" +tries


        document.getElementById("myWord").value= ""
    }

    else
    {

        document.getElementById("meanDiv").style.display = "none"
        document.getElementById("myTries").style.display = "none"
        document.getElementById("gameOver").setAttribute("src","./img/wellDone.png")
        document.getElementById("gameOver").style.display = "block"
        clearInterval(interval)
        if(music == true)
        {
            gameTheme.pause()
            winingSound.play()
        }
        const p = document.getElementById("info")
        p.innerHTML = "Well done you made it in " + (210 -seconds) + "seconds, with just " + nr + " tries"
    }
    


}

function timing()
{
    if(music == true)
    {
        gameTheme.play()

    }
    musicButton.style.display = "none"
    document.getElementById("ready").style.display = "none"
    document.getElementById("submit").style.display = "block"
    document.getElementById("myWord").style.display = "block"
    document.getElementById("submit").style.margin = "auto"
    document.getElementById("myWord").style.margin = "auto"
   interval = setInterval(()=>
   {
     seconds -= 1 ; // counting down the 310 -- 3:30min
     let min = "0" + parseInt(seconds/60) // getting the nr of min
     let sec =  seconds- min*60 // getting the seconds
     if(sec<10){ sec = "0"+sec} // adding zero to display always the timing like that 00:00
    document.getElementById("timing").innerHTML = "Timing: " + min + ":" + sec;
    if(seconds== 0)
    {
        document.getElementById("meanDiv").style.display = "none"
        document.getElementById("myTries").style.display = "none"
        document.getElementById("gameOver").setAttribute("src","./img/game_over_PNG41.png")
        document.getElementById("gameOver").style.display = "block"
        clearInterval(interval)
        if(music == true)
        {
            gameTheme.pause()
            gameOverSound.play()
        }
    } }
   ,1000) 
   document.getElementById("nrOfTries").innerHTML = "Number Of tries: 0" +tries


}

document.getElementById("submit").addEventListener("click", submitWord)
document.getElementById("ready").addEventListener("click", timing)

