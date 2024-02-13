function login() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;
  

    // Retrieve accounts from local storage
    var accounts = JSON.parse(localStorage.getItem("accounts")) || [];
  
    // Check if the entered credentials match any existing account
    var user = accounts.find(account => account.username === username && account.password === password );
  
    if (user) {
        document.getElementById("loginErrorMessage").innerHTML = "";
        // Set the username in local storage for use in profile page
        localStorage.setItem("loggedInUsername", username);
        // Redirect to profile page
        window.location.href = "/profile.html";
    } else {
        document.getElementById("loginErrorMessage").innerHTML = "Invalid username or password.";
    }
}