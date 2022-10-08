const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

const copyButton = document.getElementById("copyBTN").onclick = function() {copyText()};

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

function increment(thisBlock,i){
  a = thisBlock.parentElement.querySelector('.diamonds').innerHTML;
  a = parseInt(a) + i;
  thisBlock.parentElement.querySelector('.diamonds').innerHTML = a;
}

function decrement(thisBlock,i){
  a = thisBlock.parentElement.querySelector('.diamonds').innerHTML;
  if(a>0){
    a = parseInt(a) - i;
  }
  if(a<0){
    a=0;
  }
  thisBlock.parentElement.querySelector('.diamonds').innerHTML = a;
}


function copyText(){
  //copy the text from each draggable
  let finalText = ""
  draggables.forEach(draggable =>{
    if(draggable.querySelector('.gameMaster').innerHTML != 'Game_Master'){
      let gameMaster = "Room".concat(draggable.querySelector('.cardNumber').innerHTML,": ",draggable.querySelector('.gameMaster').innerHTML);
      let captianName ="Capt: ".concat(draggable.querySelector('.captianName').innerHTML);
      let teamName = "Team Name: ".concat(draggable.querySelector('.teamName').innerHTML);
      let diamonds = "Diamonds: ".concat(draggable.querySelector('.diamonds').innerHTML);
      let saperator = "-----";
      let newL = '\n';
      finalText = finalText.concat(gameMaster,newL,captianName,newL,teamName,newL,diamonds,newL,saperator,newL);
    }
  })

  console.log(finalText);
  
  //copy the final text to the cipboard
  navigator.clipboard.writeText(finalText).then(
    () => {
      document.getElementById('copyBTN').innerHTML='copied!';
      setTimeout(()=>{document.getElementById('copyBTN').innerHTML='copy';},500);
    },
    () => {
      console.log('notCopied!');
    }
  );
  
}


function copySortedText(){
  //copy the text from each draggable
  let finalText = ""

  draggables1 = draggables.sort((a,b)=>{
    if(parseInt(a.querySelector('.diamonds').innerHTML)>parseInt(b.querySelector('.diamonds').innerHTML)){
      return -1;
    }
  }
  );

  draggables1.forEach(draggable =>{
    if(draggable.querySelector('.gameMaster').innerHTML != 'Game Master'){
      let gameMaster = "Room".concat(draggable.querySelector('.cardNumber').innerHTML,": ",draggable.querySelector('.gameMaster').innerHTML);
      let captianName ="Capt: ".concat(draggable.querySelector('.captianName').innerHTML);
      let teamName = "Team Name: ".concat(draggable.querySelector('.teamName').innerHTML);
      let diamonds = "Diamonds: ".concat(draggable.querySelector('.diamonds').innerHTML);
      let saperator = "-----";
      let newL = '\n';
      finalText = finalText.concat(gameMaster,newL,captianName,newL,teamName,newL,diamonds,newL,saperator,newL);
    }
  })

  console.log(finalText);
  
  //copy the final text to the cipboard
  navigator.clipboard.writeText(finalText).then(
    () => {
      document.getElementById('copyBTN').innerHTML='copied!';
      setTimeout(()=>{document.getElementById('copyBTN').innerHTML='Copy Scores';},500);
    },
    () => {
      console.log('notCopied!');
    }
  );
  
}