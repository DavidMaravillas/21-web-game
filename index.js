document.addEventListener("DOMContentLoaded", ()=>{

    const fetchData = async (url) =>{
        try {
            let fetch = await axios.get(url)
            return fetch.data
        } catch (err){
            console.log(err)
        }
    }

    let userCardTotal = 0
    let compCardTotal = 0
    let aceValue
    
    
    const drawCards = async (deck,numCard,ul) =>{
        let total = document.querySelector("#total")
        let url = `https://deckofcardsapi.com/api/deck/${deck}/draw/?count=${numCard}`
        let cardsFetched = await fetchData(url)
         cards = cardsFetched.cards
         cards.forEach(card=>{
            let li = document.createElement("li")
            let img = document.createElement("img")
            img.src = card.image
            console.log(card)
            if(card.value === "JACK" ||card.value === "QUEEN"||card.value === "KING"){
                if(ul.id === "userCards" ){
                    userCardTotal +=10
                } else {
                    compCardTotal +=10
                }
            } else if (card.value === "ACE"){
                
                if( ul.id === "userCards" ){
                    userCardTotal += 1
                } else {
                    compCardTotal += 1
                }
                
            } else {

                if(ul.id === "userCards" ){
                    userCardTotal += Number(card.value)
                } else {
                    compCardTotal += Number(card.value)
                }
            }
    
            li.appendChild(img)
            ul.appendChild(li)
        })
    }
    
    const start = async ()=>{
        let startGame = document.querySelector("#startGame")
        let results = document.querySelector("#results")
        let cards = document.querySelector("#cards")
        startGame.hidden = true
        results.innerHTML = ""
        cards.innerHTML = ""
        
        userCardTotal = 0
        compCardTotal = 0
        let hit = document.createElement("button")
        hit.type = "button"
        hit.id = "hit"
        hit.innerText = "HIT"
        let stay = document.createElement("button")
        stay.type = "button"
        stay.id = "stay"
        stay.innerText = "STAY"
        cards.appendChild(hit)
        cards.appendChild(stay)
        let userCards = document.createElement("ul")
        userCards.id = "userCards"
        let compCards = document.createElement("ul")
        compCards.id = "compCards"
        let deckUrl= "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
        let deck = await fetchData(deckUrl)
        let deckId = deck.deck_id
        let total = document.createElement("p")
        let p = document.createElement("p")
        p.id = "deck"
        p.innerText = deckId
        results.appendChild(total) 
        cards.appendChild(userCards)
        cards.appendChild(compCards)
        
        await drawCards(deckId,"2",userCards)
        total.innerText = `Player Total = ${userCardTotal}`
        hit.addEventListener("click", async ()=>{
            await drawCards(deckId,"1",userCards)
            total.innerText = `Player Total = ${userCardTotal}`
            if(userCardTotal > 21){
                alert("Player has busted")
                playAgain = window.confirm("Wanna Play again")
                if(playAgain === true){
                    start()
                } else{
                    alert("Goodbye, Better luck next time")
                    // start()
                }
            }
        })
        
        stay.addEventListener("click", async ()=>{
            let results = document.querySelector("#results")
            let compTotal = document.createElement("p")
            hit.disabled = true
            stay.disabled = true
            await drawCards(deckId,"3",compCards)
            total.innerText = `Player Total = ${userCardTotal}`
            compTotal.innerText = `Dealer total: ${compCardTotal}`
            results.appendChild(compTotal)
            debugger
            let result = document.createElement("h2")
            if(userCardTotal > 21){
                result.innerText = `Player busted, House wins`
            } else if (compCardTotal > 21 && userCardTotal <= 21 ){
                result.innerText = `Player Wins this round`
            } else if (userCardTotal === compCardTotal){
                result.innerText = `Tied game, no one wins`
            } else if ( userCardTotal === 21  ){
                result.innerText = `Player Wins this round`
            } else if(compCardTotal === 21 ){
                result.innerText = `House Wins this round`
            } else if(compCardTotal > userCardTotal){
                result.innerText = `House Wins this round`
            } else if(compCardTotal < userCardTotal){
                result.innerText = `Player Wins this round`
            }
            results.appendChild(result)
            let playAgain = document.createElement("button")
            playAgain.innerText = "Play again"
            playAgain.id= "playAgain"
            results.appendChild(playAgain)
            playAgain.addEventListener("click", start)
        })

    }
    
    let startButton = document.querySelector("#startGame")
    
    startButton.addEventListener("click",()=>{
        let cards = document.querySelector("#cards")
        if(!cards.innerHTML){
            start()
        } else {
            console.log("err")
        }
    })

})