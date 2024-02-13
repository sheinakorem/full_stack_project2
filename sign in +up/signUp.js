function signup() {
  var username = document.getElementById("signUpUsername").value;
  var password = document.getElementById("signUpPassword").value;
  var email = document.getElementById("signUpEmail").value;


  // Retrieve accounts from local storage
  var accounts = JSON.parse(localStorage.getItem("accounts")) || [];

  // Check if the username already exists
  var existingAccount = accounts.find(account => account.username === username);

  if (existingAccount) {
    document.getElementById("signupErrorMessage").innerHTML = "Account already exists with this username.";
  } else {
    // Add the new account to the array
    var newAccount = { username: username, password: password ,email:email ,score:0};
    accounts.push(newAccount);

    // Save the updated accounts array back to local storage
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }
}
