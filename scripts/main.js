const loggedInUser = fetch("http://localhost:3000/signup");
const authLinks = document.getElementById("auth-links");

if (loggedInUser)
{
    authLinks.innerHTML = `
    <span>${loggedInUser.username}</span>
    <button id="logout-button">Logout</button>
    `;
}
else
{
    authLinks.innerHTML = `
    <a href="auth/pages/login.html">Login</a>
    <a href="auth/pages/signup.html">Sign Up</a>
    `;
}