const fetchData = async (url) =>{
    try {
        let fetch = await axios.get(url)
        return fetch.data
    } catch (err){
        console.log(err)
    }
}

let deckID;
let startButton = document.querySelector("#startGame")

const getDeck = async () =>{
    let deckUrl= "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
    let deck = await fetchData(deckUrl)
    return deckID = deck.deck_id
}

const buildDisplay = () =>{
    let display = document.querySelector("#display")
    let hit = document.createElement("button")
    let stay = document.createElement("button")
    let playerHand = document.createElement("div")
    let computerHand = document.createElement("div")
    
    playerHand.id = "playerHand"
    computerHand.id = "computerHand"
    hit.innerText = "HIT"
    hit.id = "hitButton"
    stay.innerText = "STAY"
    stay.id = "stayButton"
    
    display.appendChild(hit)
    display.appendChild(stay)
    display.appendChild(playerHand)
    display.appendChild(computerHand)

}

const drawCards = async (deck,numCard,div) =>{
    let sDiv = document.querySelector(`#${div}`)
    let url = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${numCard}`
    let cardsFetched = await fetchData(url)
    debugger
     cards = cardsFetched.cards
     cards.forEach( card => { 
        let img = document.createElement("img")
        img.src = card.image
        if(card.value === "JACK" ||card.value === "QUEEN"||card.value === "KING"){
                img.alt = 10
        } else if (card.value === "ACE"){
            
                img.alt = 1
            
        } else {

            img.alt = Number(card.value)
        }

        sDiv.appendChild(img)
    })
}

const gamePlay = async() =>{
    getDeck()
    buildDisplay()
    console.log(deckID)
    drawCards(deckID,2,"playerHand")
    let hit = document.querySelector("#hitButton")
    hit.onclick = ()=>{
        debugger
    }

}

startButton.onclick =()=>{
    startButton.hidden = true
    gamePlay()
}