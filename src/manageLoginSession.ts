function manageLoginSession() {
  let totalTabs: number;

  window.onload = function (e) {
    let accessToken = sessionStorage.getItem("accessToken");
    let refreshToken = sessionStorage.getItem("refreshToken");
    let expiresAt = sessionStorage.getItem("expiresAt");
    if (accessToken !== null && refreshToken !== null && expiresAt !== null) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("expiresAt", expiresAt);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("expiresAt");
    }
    if (localStorage.getItem("count") === null) {
      totalTabs = 0;
    }

    totalTabs++;
    localStorage.setItem("count", "" + totalTabs);
  };

  window.onbeforeunload = function (e) {
    if (localStorage.getItem("count") === null) {
      totalTabs = 1;
    }
    totalTabs--;
    localStorage.setItem("count", "" + totalTabs);
    if (totalTabs < 1) {
      let accessToken = localStorage.getItem("accessToken");
      let refreshToken = localStorage.getItem("refreshToken");
      let expiresAt = localStorage.getItem("expiresAt");
      if (accessToken !== null && refreshToken !== null && expiresAt !== null) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("expiresAt", expiresAt);
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expiresAt");
    }
  };
}
