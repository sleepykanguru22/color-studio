   
    
const colorPicker = document.getElementById('color-picker');
const colorForm = document.getElementById('color-form');
const colorPallet = document.getElementById('color-pallet');
const colorPalletHex = document.getElementById('color-pallet-hex');

//toggle dark mode
document.getElementById('toggle-btn').addEventListener("change",()=>{
    document.body.classList.toggle("dark")
})
// Function to make API call with updated color value and color mode
const getColors = (hexColor, colorMode) => {
   
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${colorMode}&count=5`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
             updateColorPallet(data.colors);
        })
};


// Function to update the color pallet with the API result
// I did not like the colors from the API and wanted the option to change them

const updateColorPallet = (colors) => {
    colorPallet.innerHTML = '';
    colorPalletHex.innerHTML = '';

    colors.forEach(color => {
        
        // create the color div
        const colorDiv = document.createElement("div")
        
        // create the input element for the color div and add it to the div
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = color.hex.value;
        colorInput.classList.add('pallet-color'); 
        colorDiv.appendChild(colorInput);
        
        // create the hex code and also add that to the div
        const colorHex = document.createElement("h3");
        colorHex.innerText = color.hex.value;
        colorDiv.appendChild(colorHex)
        
        // append our color with input and hex to our div with all the colors
        colorPallet.appendChild(colorDiv)

    
    });
};



// Event listener for the color form submission
    colorForm.addEventListener('submit', function (e) {
    e.preventDefault(); 

    const hexColor = colorPicker.value.slice(1); 
    const colorMode = document.getElementById('color-scheme').value;
    getColors(hexColor, colorMode); 
});

