

var attempt = 3;
function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
    
    
    // Retrieve accounts from local storage
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    // Check if the entered credentials match any existing account
    var user = accounts.find(account => account.username === username && account.password === password );
    if ( user){//sername == accounts.username && password == accounts.password){
        alert ("Login successfully");
        document.getElementById("loginErrorMessage").innerHTML = "";
        // Set the username in local storage for use in profile page
        localStorage.setItem("loggedInUsername", username);
        // Redirect to profile page
        window.location.href = "profile.html";
        return false;
    }
    else{
        if(attempt>0){
        attempt --;// Decrementing by one.
        }
        alert("You have  "+attempt+" attempts left");
        // Disabling fields after 3 attempts.
        if( attempt === 0){
        document.getElementById("loginUsername").disabled = true;
        document.getElementById("loginPassword").disabled = true;
        document.getElementById("submit").disabled = true;
        document.getElementById("loginErrorMessage").innerHTML = "Invalid username or password.";
        document.getElementById("loginForm").reset(); // Clear the form
        return false;
    }
}
}