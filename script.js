function uploadImage() {
    var fileInput = document.getElementById('imageUpload');
    var file = fileInput.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
        var base64String = reader.result.split(',')[1]; // Extract base64 string
        sendBase64ToServer(base64String);
    };

    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

function sendBase64ToServer(base64String) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/predict', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            displayResult(response.result, response.image);
        }
    };

    xhr.send(JSON.stringify({ base64String: base64String }));
}

function displayResult(result, image) {
    var resultDisplay = document.getElementById('resultDisplay');
    var resultText = document.getElementById('resultText');
    var resultImage = document.getElementById('resultImage');

    resultText.textContent = result;
    resultImage.src = 'data:image/jpeg;base64,' + image;
    resultDisplay.style.display = 'block';
}
