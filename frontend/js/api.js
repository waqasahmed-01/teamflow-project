async function apiRequest(endpoint, options = {}) {
  try {
    const token = localStorage.getItem("accessToken");

    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      success: false,
      status: 0,
      data: {
        success: false,
        message: "Unable to connect to the server.",
      },
    };
  }
}
