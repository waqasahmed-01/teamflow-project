document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
});

async function handleLogin(event) {
  event.preventDefault();

  const form = event.target;

  const button = document.getElementById("loginButton");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  setButtonLoading(button, "Signing In...");

  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.success && response.data.success) {
    const accessToken = response.data.data.token;

    localStorage.setItem("accessToken", accessToken);

    showMessage(form, "Login successful.", "success");

    resetButton(button);

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 500);

    return;
  }

  showMessage(form, response.data.message || "Login failed.", "danger");

  resetButton(button);
}
