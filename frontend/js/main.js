function setButtonLoading(button, loadingText = "Please wait...") {
  if (!button || button.disabled) {
    return;
  }

  button.dataset.originalText = button.innerHTML;

  button.disabled = true;

  button.innerHTML = `
        <span
            class="spinner-border spinner-border-sm me-2"
            role="status"
            aria-hidden="true"
        ></span>
        ${loadingText}
    `;
}

function resetButton(button) {
  if (!button) {
    return;
  }

  button.disabled = false;

  if (button.dataset.originalText) {
    button.innerHTML = button.dataset.originalText;
  }
}

function showMessage(form, message, type) {
  const existingMessage = form.querySelector(".form-message");

  if (existingMessage) {
    existingMessage.remove();
  }

  const messageElement = document.createElement("div");

  messageElement.className = `alert alert-${type} form-message mt-3`;

  messageElement.textContent = message;

  form.appendChild(messageElement);
}
