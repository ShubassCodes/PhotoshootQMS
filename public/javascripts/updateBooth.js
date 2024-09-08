setCancelBtn();
enableSelectiveCompleteBtn();
boothStatus = {'Booth: TBA': 0, 'Booth: Photobooth 1': 1, 'Booth: Photobooth 2': 2, 'Booth: Makeupbooth 1': 3, 'Booth: Makeupbooth 2': 4, 'Booth: Makeupbooth 3': 5, 'Booth: Makeupbooth 4': 6, 'Booth: Waiting': 7, 'Booth: Finished': 8};


// Enable complete button selectively for user and fully for admin
function enableSelectiveCompleteBtn(){
    // Enable all complete button for admin
    if(document.getElementById("name").innerText === "ADMIN") {
        return;
    }

    // Disable all complete button if not admin
    var elements = document.getElementsByClassName("complete-btn");
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('disabled', 'disabled');
    }

    // Get booth num of user and enable for specific only
    var boothNum = document.getElementById("booth-num").innerText;
    switch(boothNum){
        case "Booth: Photobooth 1":
            document.getElementById("photoboothOneCompleteBtn").removeAttribute('disabled');
            return;
        case "Booth: Photobooth 2":
            document.getElementById("photoboothTwoCompleteBtn").removeAttribute('disabled');
            return;
        case "Booth: Makeupbooth 1":
            document.getElementById("makeupboothOneCompleteBtn").removeAttribute('disabled');
            return;
        case "Booth: Makeupbooth 2":
            document.getElementById("makeupboothTwoCompleteBtn").removeAttribute('disabled');
            return;
        case "Booth: Makeupbooth 3":
            document.getElementById("makeupboothThreeCompleteBtn").removeAttribute('disabled');
            return;
        case "Booth: Makeupbooth 4":
            document.getElementById("makeupboothFourCompleteBtn").removeAttribute('disabled');
            return;
        default:
            return;
    }
} 

// Disable cancel if the person has finished photoshoot
function setCancelBtn() {
    // Get booth num
    var boothnum = document.getElementById("booth-num").innerText;
    if(document.getElementById("name").innerText == "ADMIN") return;
    if(boothnum == "Booth: Finished" || boothnum == "Booth: Waiting") {
        document.getElementById("cancel-btn").setAttribute('disabled', 'disabled');
    }else{
        document.getElementById("cancel-btn").removeAttribute('disabled');
    }
}

// Get either photobooth or makeupbooth
function getBoothType(boothType){
    val = "";
    if(boothType === "Booth: Photobooth 1" || boothType === "Booth: Photobooth 2"){
        val = "Photobooth";
    }else{
        val = "Makeupbooth"
    }
    return val;
}

// var socket = io();

// // Listen for the databaseChanged event
// socket.on('databaseChanged', (data) => {
//     //Update booth number and cancel button if USER == CHANGEDUSER
//     if(document.getElementById("name").innerText === data["name"]) {    // Update upper section
//         // Update booth number
//         var currBoothStatus =  Object.entries(boothStatus).find(pair => pair[1] === data["boothNum"])[0];
//         document.getElementById("booth-num").innerText = currBoothStatus;
//         // Update Queue number if User cancel
//         document.getElementById("queueNumber").innerText = data["queueNumber"];
//         // Update cancel button
//         setCancelBtn();
//         // Update complete button
//         enableSelectiveCompleteBtn();
//     }
//     switch(data["boothNum"]){
//         case 1:
//             document.getElementById("photoboothOneName").innerText = data["name"];
//             document.getElementById("photoboothOneQueueNum").innerText = data["queueNumber"];
//             return;
//         case 2:
//             document.getElementById("photoboothTwoName").innerText = data["name"];
//             document.getElementById("photoboothTwoQueueNum").innerText = data["queueNumber"];
//             return;
//         case 3:
//             document.getElementById("makeupboothOneName").innerText = data["name"];
//             document.getElementById("makeupboothOneQueueNum").innerText = data["queueNumber"];
//             return;
//         case 4:
//             document.getElementById("makeupboothTwoName").innerText = data["name"];
//             document.getElementById("makeupboothTwoQueueNum").innerText = data["queueNumber"];
//             return;
//         case 5:
//             document.getElementById("makeupboothThreeName").innerText = data["name"];
//             document.getElementById("makeupboothThreeQueueNum").innerText = data["queueNumber"];
//             return;
//         case 6:
//             document.getElementById("makeupboothFourName").innerText = data["name"];
//             document.getElementById("makeupboothFourQueueNum").innerText = data["queueNumber"];
//             return;
//         default:
//             return;
//     }
// });

// User OR Admin clicks complete - Photobooth 1
function photoboothOneListener() {
    var username = document.getElementById("photoboothOneName").innerText;
    var queueNum = document.getElementById("photoboothOneQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Photobooth", queueNum: queueNum, boothNum: 1}), 
    }).catch((err) => {
        console.log(err);
    });
};

// User OR Admin clicks complete - Photobooth 2
function photoboothTwoListener() {
    var username = document.getElementById("photoboothTwoName").innerText;
    var queueNum = document.getElementById("photoboothTwoQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Photobooth", queueNum: queueNum, boothNum: 2}), 
    }).catch((err) => {
        console.log(err);
    });
};

// User OR Admin clicks complete - Makeupbooth 1
function makeupboothOneListener() {
    var username = document.getElementById("makeupboothOneName").innerText;
    var queueNum = document.getElementById("makeupboothOneQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Makeupbooth", queueNum: queueNum, boothNum: 3}), 
    }).catch((err) => {
        console.log(err);
    });
};

// User OR Admin clicks complete - Makeupbooth 2
function makeupboothTwoListener() {
    var username = document.getElementById("makeupboothTwoName").innerText;
    var queueNum = document.getElementById("makeupboothTwoQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Makeupbooth", queueNum: queueNum, boothNum: 4}), 
    }).catch((err) => {
        console.log(err);
    });
};

// User OR Admin clicks complete - Makeupbooth 3
function makeupboothThreeListener() {
    var username = document.getElementById("makeupboothThreeName").innerText;
    var queueNum = document.getElementById("makeupboothThreeQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Makeupbooth", queueNum: queueNum, boothNum: 5}), 
    }).catch((err) => {
        console.log(err);
    });
};

// User OR Admin clicks complete - Makeupbooth 4
function makeupboothFourListener() {
    var username = document.getElementById("makeupboothFourName").innerText;
    var queueNum = document.getElementById("makeupboothFourQueueNum").innerText;
    // Photobooth - mark complete
    // Call API Server side
    fetch('/updateQueueComplete', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: "Makeupbooth", queueNum: queueNum, boothNum: 6}), 
    }).catch((err) => {
        console.log(err);
    });
};

// Admin clicks reset
function resetListener() {
    // Reset whole queue
    fetch('/resetQueue', {
        method: 'PATCH', 
    }).catch((err) => {
        console.log(err);
    });
};

function cancelListener() {
    // Get the details of user
    var username = document.getElementById("name").innerText;
    var currBoothNum = document.getElementById("booth-num").innerText;
    var boothType = getBoothType(currBoothNum);
    var queueNum = document.getElementById("queueNumber").innerText;
    var boothNum = boothStatus[currBoothNum];
    fetch('/cancelQueue', {
        method: 'PATCH', 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username, boothType: boothType, queueNum: queueNum, boothNum: boothNum}), 

    }).catch((err) => {
        console.log(err);
    });
}

// Booth - confirm
function boothConfirm(message, callback) {
    document.getElementById('confirmationMessage').textContent = message;
    var confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();

    document.getElementById('submitForm').onclick = callback;
}

// Pooling
function fetchData() {
    var username = document.getElementById("name").innerText;
    fetch('/getDataInterval', {
        method: 'POST',
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({name: username}), 
    }).then(response => response.json()).then((data) => {
        // Update all booths
        // Update photobooth one
        if(document.getElementById("photoboothOneQueueNum").innerText != data.boothOneQueueNumber){
            document.getElementById("photoboothOneName").innerText = data.boothOneName;
            document.getElementById("photoboothOneQueueNum").innerText = data.boothOneQueueNumber;
        }
        // Update photobooth two
        if(document.getElementById("photoboothTwoQueueNum").innerText != data.boothTwoQueueNumber){
            document.getElementById("photoboothTwoName").innerText = data.boothTwoName;
            document.getElementById("photoboothTwoQueueNum").innerText = data.boothTwoQueueNumber;
        }
        // Update makeupbooth one
        if(document.getElementById("makeupboothOneQueueNum").innerText != data.boothThreeQueueNumber){
            document.getElementById("makeupboothOneName").innerText = data.boothThreeName;
            document.getElementById("makeupboothOneQueueNum").innerText = data.boothThreeQueueNumber;
        }
        // Update makeupbooth two
        if(document.getElementById("makeupboothTwoQueueNum").innerText != data.boothFourQueueNumber){
            document.getElementById("makeupboothTwoName").innerText = data.boothFourName;
            document.getElementById("makeupboothTwoQueueNum").innerText = data.boothFourQueueNumber;
        }
        // Update makeupbooth three
        if(document.getElementById("makeupboothThreeQueueNum").innerText != data.boothFiveQueueNumber){
            document.getElementById("makeupboothThreeName").innerText = data.boothFiveName;
            document.getElementById("makeupboothThreeQueueNum").innerText = data.boothFiveQueueNumber;
        }
        // Update makeupbooth four
        if(document.getElementById("makeupboothFourQueueNum").innerText != data.boothSixQueueNumber){
            document.getElementById("makeupboothFourName").innerText = data.boothSixName;
            document.getElementById("makeupboothFourQueueNum").innerText = data.boothSixQueueNumber;
        }


        if(data.currName != "ADMIN"){
            // Ignore updating user details
            // Update queue number if he clicks cancel
            if(document.getElementById("queueNumber").innerText != data.currQueueNumber) {
                document.getElementById("queueNumber").innerText = data.currQueueNumber;
            }
            // Update booth num, complete and cancel button
            if(document.getElementById("booth-num").innerText != `Booth: ${data.currBoothNum}`){
                document.getElementById("booth-num").innerText = `Booth: ${data.currBoothNum}`;
                setCancelBtn();
                enableSelectiveCompleteBtn();
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}

// Poll every 5 seconds
const interval = setInterval(fetchData, 3000);

// Cleanup when the page is unloaded
window.addEventListener('beforeunload', () => {
    clearInterval(interval);
});