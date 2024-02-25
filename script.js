//Injection
const toolbarHTML = `
<div class="toolbar" id="toolbarMain">
<button class="mainButtons" id="fontAlterationButton">
    <img src="${chrome.runtime.getURL("images/fontAlteration.svg")}">
</button>
<button class="mainButtons" id="taskListButton">
    <img src="${chrome.runtime.getURL("images/taskList.svg")}">
</button>
<button class="mainButtons" id="PBButton">
    <img src="${chrome.runtime.getURL("images/progressBar.svg")}">
</button>
<button class="mainButtons" id="timersButton">
    <img src="${chrome.runtime.getURL("images/timers.svg")}">
</button>
<button class="mainButtons" id="fidgetButton">
    <img src="${chrome.runtime.getURL("images/fidget.svg")}">
</button>
<button class="mainButtons" id="AGEButton">
    <img src="${chrome.runtime.getURL("images/AGE.svg")}">
</button>
<button class="mainButtons" id="settingsButton">
    <img src="${chrome.runtime.getURL("images/settings.svg")}">
</button>
<button class="backButtons fontAlterationButtons" id="backButtonFA">
    <img src="${chrome.runtime.getURL("images/back.svg")}">
</button>
<button class="fontAlterationButtons" id="fontConversionButton">
    <img src="${chrome.runtime.getURL("images/convert.svg")}">
</button>
<button class="fontAlterationButtons" id="bionicButton">
    <img src="${chrome.runtime.getURL("images/bionic.svg")}">
</button>
<button class="fontAlterationButtons" id="toDefaultButton">
    <img src="${chrome.runtime.getURL("images/defaultConvert.svg")}">
</button>
<button class="backButtons PBButtons" id="backButtonPB">
    <img src="${chrome.runtime.getURL("images/back.svg")}">
</button>
<button class = "PBButtons" id = "PBDragFlag">
    <img id = "flag" src="${chrome.runtime.getURL("images/progressBar.svg")}" draggable = "true">
</button>

<div class = "PBLive" id = "PBLive">
    <div class = "progressBar">
        <div class = "progress" id = "PBLiveProgress"></dive>
        <div class = "progressText" id = "PBLiveProgressText"></dive>
    </div>
</div>
<button class = "PBButtons" id = "PBDelete">
    <img src="${chrome.runtime.getURL("images/trashIcon.svg")}">
</button>
</div>
<div class="menu" id="fontAlterationMenu">
<ul>
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
</ul>
</div>
`;
document.body.insertAdjacentHTML('afterbegin', toolbarHTML);
//End of Injection


//Toolbar
const toolbar = document.getElementById('toolbarMain');
const fontAlterationButton = document.getElementById('fontAlterationButton');
const fontAlterationMenu = document.getElementById('fontAlterationMenu');
let isDragging = false;
let offsetX, offsetY;

toolbar.addEventListener('mousedown', (e) => {
    // Check if the mouse press is over an empty space within the toolbar
    if (!e.target.closest('button')) {
        isDragging = true;
        offsetX = e.clientX - toolbar.getBoundingClientRect().left;
        offsetY = e.clientY - toolbar.getBoundingClientRect().top;
        toolbar.style.cursor = 'grabbing';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;
        
        // Update the position of the toolbar
        toolbar.style.left = newX + 'px';
        toolbar.style.top = newY + 'px';
        
        // Get the position of the toolbar relative to the viewport
        const toolbarRect = toolbar.getBoundingClientRect();
        const toolbarLeft = toolbarRect.left;
        const toolbarTop = toolbarRect.top;
        
        // Get the width of the fontAlterationMenu
        const menuWidth = fontAlterationMenu.offsetWidth;
        
        // Update the position of the fontAlterationMenu relative to the toolbar
        fontAlterationMenu.style.left = toolbarLeft + toolbar.offsetWidth + 10 + 'px';
        fontAlterationMenu.style.top = toolbarTop + 'px';
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    toolbar.style.cursor = 'grab';
});
//End of Toolbar
 
//Font Alteration
const MainButtons = document.getElementsByClassName('mainButtons');
const fontAlterationButtons = document.getElementsByClassName('fontAlterationButtons');

fontAlterationButton.addEventListener('click', () => {
    for (let button of fontAlterationButtons) {
        button.classList.toggle('show');
    }    // Replace the content of toolbar with new buttons

    for (let button of MainButtons) {
        button.classList.toggle('hide');
    }    // Replace the content of toolbar with new buttons
   
    // Add event listeners for the new buttons
    const backButton = document.getElementById('backButtonFA');
    const fontAlterationMenuButton = document.getElementById('fontConversionButton');
    const bionicModeButton = document.getElementById('bionicButton');
    const toDefaultButton = document.getElementById('toDefaultButton');

    function backButtonClickHandler() {
        for (let button of fontAlterationButtons) {
            button.classList.toggle('show');
        }
        
        for (let button of MainButtons) {
            button.classList.toggle('hide');
        }

        backButton.removeEventListener('click', backButtonClickHandler);
    }
    backButton.addEventListener('click', backButtonClickHandler);

    fontAlterationMenuButton.addEventListener('click', () => {
        const toolbarRect = toolbar.getBoundingClientRect();
        const toolbarLeft = toolbarRect.left;
        const toolbarTop = toolbarRect.top;

        // Position the menu to the right of the toolbar with an offset of 10px
        fontAlterationMenu.style.left = (toolbarLeft + toolbar.offsetWidth + 10) + "px";

        // Position the menu vertically aligned with the toolbar
        fontAlterationMenu.style.top = toolbarTop + "px";

        fontAlterationMenu.classList.toggle('show');
    });

    bionicModeButton.addEventListener('click', () => {
        console.log('Bionic Mode Button Clicked');
    });

    toDefaultButton.addEventListener('click', () => {
        console.log('To Default Button Clicked');
    });
});
//End of Font Alteration


//PB -------------------------------------------------------------------------------------------
const PBButtons = document.getElementsByClassName('PBButtons');
const PBButton = document.getElementById('PBButton');
const PBMenu = document.getElementById('PBMenu');
const PBBar = document.getElementById('PBLiveProgress')

const addPBEventListeners = () => {
  const backButton = document.getElementById('backButtonPB');
  const PBDragFlag = document.getElementById('PBDragFlag');
  const PBDelete = document.getElementById('PBDelete');


PBBar.classList.toggle('show');
  function backButtonClickHandler() {
    for (let button of PBButtons) {
      button.classList.toggle('show');
    }

    for (let button of MainButtons) {
      button.classList.toggle('hide');
    }

    backButton.removeEventListener('click', backButtonClickHandler);
  }
  backButton.addEventListener('click', backButtonClickHandler);

  const flag = document.getElementById("flag");
  let progress = 0;

  flag.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("flag", event.target.id);
  });
  
  flag.addEventListener("dragend", () => {
    const flagPosition = flag.getBoundingClientRect();
    const centerY = window.innerHeight / 2;
    const distance = Math.abs(centerY - flagPosition.top);
    const maxDistance = window.innerHeight / 2;
    progress = (distance / maxDistance) * 100;
    const progressElement = document.getElementById("PBLiveProgress");
    progressElement.style.width = `${progress}%`;
    progressElement.style.display = "block";
  });

  document.body.addEventListener("dragover", (event) => {
    event.preventDefault();
  });
  
  document.body.addEventListener("drop", (event) => {
    event.preventDefault();
    const flagId = event.dataTransfer.getData("flag");
    const flagElement = document.getElementById(flagId);
    const dropZone = event.target;
    dropZone.appendChild(flagElement);
  });

  PBDelete.addEventListener('click', () => {
    console.log('Delete Clicked');
  });
};

PBButton.addEventListener('click', () => {
  for (let button of PBButtons) {
    button.classList.toggle('show');
  }

  for (let button of MainButtons) {
    button.classList.toggle('hide');
  }

  addPBEventListeners();
});
