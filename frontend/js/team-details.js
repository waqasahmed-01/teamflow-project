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

  loadTeam();

  const addMemberButton = document.getElementById("addMemberButton");
  const addMemberForm = document.getElementById("addMemberForm");

  if (addMemberButton && addMemberForm) {
    const addMemberModal = new bootstrap.Modal(
      document.getElementById("addMemberModal"),
    );

    addMemberButton.addEventListener("click", () => {
      addMemberModal.show();
    });

    addMemberForm.addEventListener("submit", handleAddMember);
  }
});

async function loadTeam() {
  const params = new URLSearchParams(window.location.search);

  const teamId = params.get("id");

  if (!teamId) {
    showTeamError("Team ID is missing.");
    return;
  }

  const response = await apiRequest(`/teams/${teamId}`);

  if (!response.success || !response.data.success) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");

      window.location.href = "login.html";

      return;
    }

    showTeamError(response.data.message || "Failed to load team.");

    return;
  }

  const team = response.data.data;

  renderTeam(team);

  await loadTeamMembers(teamId);
}

async function loadTeamMembers(teamId) {
  const response = await apiRequest(`/teams/${teamId}/members`);

  if (!response.success || !response.data.success) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");

      window.location.href = "login.html";

      return;
    }

    showMembersError(response.data.message || "Failed to load members.");

    return;
  }

  const members = response.data.data;

  renderTeamMembers(members);
}

async function handleAddMember(event) {
  event.preventDefault();

  const form = event.target;

  const button = document.getElementById("addMemberSubmitButton");

  const userId = document.getElementById("memberUserId").value.trim();

  const params = new URLSearchParams(window.location.search);

  const teamId = params.get("id");

  setButtonLoading(button, "Adding Member...");

  const response = await apiRequest(`/teams/${teamId}/members`, {
    method: "POST",

    body: JSON.stringify({
      userId,
    }),
  });

  if (response.success && response.data.success) {
    resetButton(button);

    form.reset();

    bootstrap.Modal.getInstance(
      document.getElementById("addMemberModal"),
    ).hide();

    await loadTeamMembers(teamId);

    return;
  }

  showMessage(form, response.data.message || "Failed to add member.", "danger");

  resetButton(button);
}

function renderTeamMembers(members) {
  const container = document.getElementById("teamMembersContainer");

  if (!members || members.length === 0) {
    container.innerHTML = `
            <div class="text-center py-4">

                <p class="text-muted mb-0">
                    No members found.
                </p>

            </div>
        `;

    return;
  }

  container.innerHTML = members
    .map(
      (member) => `

                <div
                    class="d-flex justify-content-between align-items-center
                           border-bottom py-3"
                >

                    <div>

                        <h6 class="mb-1 fw-semibold">
                            ${member.user.name}
                        </h6>

                        <small class="text-muted">
                            ${member.user.email}
                        </small>

                    </div>

                    <span class="badge bg-secondary">
                        ${member.role}
                    </span>

                </div>

            `,
    )
    .join("");
}

function renderTeam(team) {
  const container = document.getElementById("teamDetailsContainer");

  container.innerHTML = `
        <div class="card border-0 shadow-sm">

            <div class="card-body p-4">

                <div class="d-flex justify-content-between align-items-start">

                    <div>

                        <h1 class="fw-bold mb-2">
                            ${team.name}
                        </h1>

                        <p class="text-muted mb-0">
                            ${team.description || "No description provided."}
                        </p>

                    </div>

                    <button
                        class="btn btn-outline-primary"
                    >
                        Edit Team
                    </button>

                </div>

            </div>

        </div>
    `;
}

function showTeamError(message) {
  const container = document.getElementById("teamDetailsContainer");

  container.innerHTML = `
        <div class="alert alert-danger">
            ${message}
        </div>
    `;
}

function showMembersError(message) {
  const container = document.getElementById("teamMembersContainer");

  container.innerHTML = `
        <div class="alert alert-danger mb-0">
            ${message}
        </div>
    `;
}

function handleLogout() {
  localStorage.removeItem("accessToken");

  window.location.href = "login.html";
}
