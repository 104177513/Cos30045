// Function to change the displayed image and caption
function changeImage(loc, cap, alt) {
    // Get the image and caption elements by their IDs
    var imageElement = document.getElementById("displayedImage");
    var captionElement = document.getElementById("displayedCaption");

    // Update the source and alt attributes of the image
    imageElement.src = loc;
    imageElement.alt = alt;

    // Update the text content of the caption
    captionElement.textContent = cap;
}
