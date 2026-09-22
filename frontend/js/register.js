document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
});

async function handleRegister(event) {
  event.preventDefault();

  const form = event.target;

  const button = document.getElementById("registerButton");

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  setButtonLoading(button, "Creating Account...");

  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (response.success && response.data.success) {
    showMessage(
      form,
      "Account created successfully. You can now login.",
      "success",
    );

    form.reset();

    resetButton(button);

    return;
  }

  showMessage(form, response.data.message || "Registration failed.", "danger");

  resetButton(button);
}
