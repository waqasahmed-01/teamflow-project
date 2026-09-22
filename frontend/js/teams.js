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

  loadTeams();

  const createTeamButton = document.getElementById("createTeamButton");
  const createTeamForm = document.getElementById("createTeamForm");

  if (createTeamButton && createTeamForm) {
    const createTeamModal = new bootstrap.Modal(
      document.getElementById("createTeamModal"),
    );

    createTeamButton.addEventListener("click", () => {
      createTeamModal.show();
    });

    createTeamForm.addEventListener("submit", handleCreateTeam);
  }
});

async function handleCreateTeam(event) {
  event.preventDefault();

  const form = event.target;

  const button = document.getElementById("createTeamSubmitButton");

  const name = document.getElementById("teamName").value.trim();

  const description = document.getElementById("teamDescription").value.trim();

  setButtonLoading(button, "Creating Team...");

  const response = await apiRequest("/teams", {
    method: "POST",

    body: JSON.stringify({
      name,
      description,
    }),
  });

  if (response.success && response.data.success) {
    resetButton(button);

    form.reset();

    bootstrap.Modal.getInstance(
      document.getElementById("createTeamModal"),
    ).hide();

    await loadTeams();

    return;
  }

  showMessage(
    form,
    response.data.message || "Failed to create team.",
    "danger",
  );

  resetButton(button);
}

async function loadTeams() {
  const response = await apiRequest("/teams");

  if (!response.success || !response.data.success) {
    if (response.status === 401) {
      localStorage.removeItem("accessToken");

      window.location.href = "login.html";

      return;
    }

    showTeamsError(response.data.message || "Failed to load teams.");

    return;
  }

  const teams = response.data.data;

  renderTeams(teams);
}

function renderTeams(teams) {
  const container = document.getElementById("teamsContainer");

  if (!teams || teams.length === 0) {
    container.innerHTML = `
            <div class="col-12">

                <div class="text-center py-5">

                    <h4 class="fw-semibold">
                        No teams yet
                    </h4>

                    <p class="text-muted">
                        Create your first team to get started.
                    </p>

                </div>

            </div>
        `;

    return;
  }

  container.innerHTML = teams
    .map(
      (team) => `

        <div class="col-md-6 col-lg-4">

            <div class="card h-100 border-0 shadow-sm">

                <div class="card-body">

                    <h5 class="card-title fw-semibold">
                        ${team.name}
                    </h5>

                    <p class="card-text text-muted">
                        ${team.description || "No description provided."}
                    </p>

                      <a
                          href="team-details.html?id=${team.id}"
                          class="btn btn-outline-primary btn-sm"
                      >
                          View Team
                      </a>

                </div>

            </div>

        </div>

    `,
    )
    .join("");
}

function showTeamsError(message) {
  const container = document.getElementById("teamsContainer");

  container.innerHTML = `
        <div class="col-12">

            <div class="alert alert-danger">
                ${message}
            </div>

        </div>
    `;
}

function handleLogout() {
  localStorage.removeItem("accessToken");

  window.location.href = "login.html";
}
