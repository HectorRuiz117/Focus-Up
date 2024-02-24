//Injection
const toolbarHTML = `
<div class="toolbar" id="toolbar">
<button id="fontAlterationButton">
<img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/fontAlteration.svg">
</button>
<button id="taskListButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/taskList.svg">
</button>
<button id="progressBarButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/progressBar.svg">
</button>
<button id="timersButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/timers.svg">
</button>
<button id="fidgetButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/fidget.svg">
</button>
<button id="AGEButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/AGE.svg">
</button>
<button id="settingsButton">
    <img src="chrome-extension://ejahjpogbakeolkfmlfaebamkefbcbil/images/settings.svg">
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
