//Injection
const MainHTML = `
<div class="toolbar" id="toolbarMain">
<button class="mainButtons" id="fontAlterationButton">
    <img src="${chrome.runtime.getURL("images/fontAlteration.svg")}">
</button>
<button class="mainButtons" id="taskListButton">
    <img src="${chrome.runtime.getURL("images/taskList.svg")}">
</button>
<button class="mainButtons" id="progressBarButton">
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
</div>
<div class="menu" id="fontAlterationMenu">
    <button id="increaseFont">
        A+
    </button>
    <button id="decreaseFont">
        A-
    </button>
    <button id="originalSize">
        Original Size
    </button>
    <p style="size:15; margin-top:10px; color:white">Change Font Color</p>
    <input type="color" id="fontColor" name="fontColor" value="#ff0000">
    <button id="originalColor">
        Original Color
    </button>
    <p style="size:15; margin-top:10px; color:white">Change Highlight Color</p>
    <input type="color" id="highColor" name="highColor" value="#ff0000">
    <button id="originalColor">
        Original Color
    </button>
    <p style="size:15; margin-top:10px; color:white">Change Typeface</p>
    <select id="typeface">
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Open Sans">Open Sans</option>
    </select>
</div>
`;
document.body.insertAdjacentHTML('afterbegin', MainHTML);
//End of Injection


//Toolbar
const toolbar = document.getElementById('toolbarMain');
const fontAlterationButton = document.getElementById('fontAlterationButton');
const fontAlterationMenu = document.getElementById('fontAlterationMenu');
let isDragging = false;
let offsetX, offsetY;

toolbar.addEventListener('mousedown', (e) => {
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
        
        toolbar.style.left = newX + 'px';
        toolbar.style.top = newY + 'px';
        
        const toolbarRect = toolbar.getBoundingClientRect();
        const toolbarLeft = toolbarRect.left;
        const toolbarTop = toolbarRect.top;
        
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
    }  

    for (let button of MainButtons) {
        button.classList.toggle('hide');
    }  
   
    const backButton = document.getElementById('backButtonFA');
    const fontConversionButton = document.getElementById('fontConversionButton');
    const bionicModeButton = document.getElementById('bionicButton');
    const toDefaultButton = document.getElementById('toDefaultButton');

    backButton.addEventListener('click', () => {
        for (let button of fontAlterationButtons) {
            button.classList.toggle('show');
        }
        
        for (let button of MainButtons) {
            button.classList.toggle('hide');
        }
    });

    fontConversionButton.addEventListener('click', () => {
        fontAlterationMenu.classList.toggle('show');
    
        const fontSelector = document.getElementById('typeface');
    
        fontSelector.addEventListener('change', function() {
            const selectedFont = fontSelector.value;
            document.body.style.fontFamily = selectedFont; 
        });
    });

    bionicModeButton.addEventListener('click', () => {
        console.log('Bionic Mode Button Clicked');
    });

    toDefaultButton.addEventListener('click', () => {
        console.log('To Default Button Clicked');
    });
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
