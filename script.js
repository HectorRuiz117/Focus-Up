//Injection
const toolbarHTML = `
<div class="toolbar" id="toolbar">
<button id="fontAlterationButton">
    <img src="${chrome.runtime.getURL("images/fontAlteration.svg")}">
</button>
<button id="taskListButton">
    <img src="${chrome.runtime.getURL("images/taskList.svg")}">
</button>
<button id="progressBarButton">
    <img src="${chrome.runtime.getURL("images/progressBar.svg")}">
</button>
<button id="timersButton">
    <img src="${chrome.runtime.getURL("images/timers.svg")}">
</button>
<button id="fidgetButton">
    <img src="${chrome.runtime.getURL("images/fidget.svg")}">
</button>
<button id="AGEButton">
    <img src="${chrome.runtime.getURL("images/AGE.svg")}">
</button>
<button id="settingsButton">
    <img src="${chrome.runtime.getURL("images/settings.svg")}">
</button>
</div>
<div class="menu" id="fontAlterationMenu">
<!-- Menu content here -->
<ul>
    <li>Option 1</li>
    <li>Option 2</li>
    <li>Option 3</li>
</ul>
</div>

<div class = "toolbar" id = "progressMenu">
<button id="backButton">
    <img src="${chrome.runtime.getURL("images/back.svg")}">
</button>
<button id="dragFlag">
    <img id = "flag" src="${chrome.runtime.getURL("images/progressBar.svg")}" draggable="true">
</button>

<!-- PB BAR -->
<div class = "progressBarContainer" id = "PBC"></div>  

<button id = "trashIcon">
    <img src="${chrome.runtime.getURL("images/trashIcon.svg")}">
</button>
</div>
`;
document.body.insertAdjacentHTML('afterbegin', toolbarHTML);
//End of Injection


//Toolbar
const toolbar = document.getElementById('toolbar');
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
fontAlterationButton.addEventListener('click', () => {
    // Get the position of the toolbar
    const toolbarRect = toolbar.getBoundingClientRect();
    const toolbarLeft = toolbarRect.left;
    const toolbarTop = toolbarRect.top;

    // Position the menu to the right of the toolbar with an offset of 10px
    fontAlterationMenu.style.left = (toolbarLeft + toolbar.offsetWidth + 10) + "px";

    // Position the menu vertically aligned with the toolbar
    fontAlterationMenu.style.top = toolbarTop + "px";

    fontAlterationMenu.classList.toggle('show');
});
//End of Font Alteration

document.getElementById("taskListButton").addEventListener("click", function() {

});

document.getElementById("progressBarButton").addEventListener("click", function() {

});

document.getElementById("timersButton").addEventListener("click", function() {

});

document.getElementById("fidgetButton").addEventListener("click", function() {

});

document.getElementById("AGEButton").addEventListener("click", function() {

});

document.getElementById("settingsButton").addEventListener("click", function() {

});

const progressBar = document.getElementById("progress-bar");
const flag = document.getElementById("flag");

let progress = 0;

flag.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("flag", event.target.id);
});

flag.addEventListener("dragend", () => {
  const flagPosition = flag.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const distance = Math.abs(centerX - flagPosition.left);
  const maxDistance = window.innerWidth / 2;
  progress = (distance / maxDistance) * 100;
  progressBar.style.width = `${progress}%`;
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
