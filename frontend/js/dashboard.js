document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const logoutButton = document.getElementById("logoutButton");

  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }

  loadUser();
});

async function loadUser() {
  const response = await apiRequest("/auth/me");

  if (!response.success || !response.data.success) {
    localStorage.removeItem("accessToken");

    window.location.href = "login.html";

    return;
  }

  const user = response.data.data;

  const userName = document.getElementById("userName");

  if (userName) {
    userName.textContent = user.name;
  }
}

function handleLogout() {
  localStorage.removeItem("accessToken");

  window.location.href = "login.html";
}
