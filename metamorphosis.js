const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
    cardsAmount: 8
    
};

const game = {
    dragged: null,
};

function initDragAndDrop() {
    initElements();
    shuffleCards();
    initDragEvents();
    
    
    
}

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".card-slot");
    ui.mixedCardsContainer = document.querySelector(".mixed-cards");

    ui.cards.forEach(function (card) {
        card.setAttribute("draggable", true);
    
    });
}

function shuffleCards() {
    const mixedCards = ui.mixedCardsContainer.children;

    for (let i = mixedCards.length; i >= 0; i--) {
        ui.mixedCardsContainer.appendChild(mixedCards[(Math.random() * i) | 0]);
    }
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });
    
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragstart", visualDragStart);

    //draggable.addEventListener("dragstart",)
    draggable.addEventListener("dragend", handleDragEnd);
    draggable.addEventListener("dragend", visualDragEnd)
    }

function initDropzone(dropzone) {

    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
    dropzone.addEventListener("drop", checkCardContainer);
    
}

function handleDragStart(e) {
    game.dragged = e.currentTarget;
    
    console.log("Drag start of", game.dragged);
}

function handleDragEnd() {
    document.querySelectorAll(".card-slot").forEach(function(slot){
        slot.classList.remove("dragging")
            });
    
    console.log("Drag end of", game.dragged);
    game.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();
   
}

function handleDragEnter(e) {
    e.currentTarget.classList.add("cardEntering")
    console.log("Drag enter of", e.currentTarget);
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove("cardEntering")
    console.log("Drag leave of", e.currentTarget);
    
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove("cardEntering")
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);
      
    if (dom.hasClass(dropzone, "card-slot")) {
        if (dom.isEmpty(dropzone)) {
            dropzone.appendChild(game.dragged);
            
            return;
        }
    }
    
}

function getDropzoneInCardContainer(){
        let newSlot = document.createElement("div")
        newSlot.className = "card-slot"
        ui.mixedCardsContainer.appendChild(newSlot)
        initDropzone(newSlot)
}

function checkCardContainer(){
  if (ui.mixedCardsContainer.childElementCount<ui.cardsAmount){
        getDropzoneInCardContainer()}
}

function visualDragStart(){
    document.querySelectorAll(".card-slot").forEach(function(slot){
        slot.classList.add("dragging")
            });
    ui.mixedCardsContainer.querySelectorAll(".card").forEach(function(card){
        card.classList.add("transparent")
    });

}

function visualDragEnd(){
    document.querySelectorAll(".transparent").forEach(function(card){
        card.classList.remove("transparent")
    });

}

initDragAndDrop();
