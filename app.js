const firebaseConfig = {
  apiKey: "AIzaSyCPERNPjl5SRbbljrwI-yClwNGdPqY4iao",
  authDomain: "truckentrysystem-3f591.firebaseapp.com",
  databaseURL: "https://truckentrysystem-3f591-default-rtdb.firebaseio.com",
  projectId: "truckentrysystem-3f591",
  storageBucket: "truckentrysystem-3f591.firebasestorage.app",
  messagingSenderId: "482221805903",
  appId: "1:482221805903:web:7c5a20b16f2290a7dff53a",
  measurementId: "G-908XW7CLDN"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

function requireAdminLogin() {
  if (localStorage.getItem("truck_admin_logged_in") !== "true") {
    window.location.href = "login.html";
  }
}

function logoutAdmin() {
  localStorage.removeItem("truck_admin_logged_in");
  localStorage.removeItem("truck_admin_user");
  window.location.href = "login.html";
}

function formatDateTime(serverTime) {
  if (!serverTime) return "No time";

  const d = new Date(serverTime);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}

function formatDateOnly(serverTime) {
  if (!serverTime) return "";

  const d = new Date(serverTime);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStatusBadge(status) {
  return status === "approved"
    ? `<span class="badge approved">✔ Approved</span>`
    : `<span class="badge rejected">✖ Rejected</span>`;
}

function loadEntries(callback) {
  db.ref("truck_entries").on("value", snapshot => {
    const data = snapshot.val() || {};
    const entries = Object.entries(data)
      .map(([key, value]) => ({ key, ...value }))
      .sort((a, b) => (b.server_time || 0) - (a.server_time || 0));
    callback(entries);
  });
}

function loadInventory(callback) {
  db.ref("inventory").on("value", snapshot => {
    callback(snapshot.val() || {});
  });
}

function saveInventory(po, data) {
  db.ref("inventory/" + po).set(data);
}

function deleteInventory(po) {
  db.ref("inventory/" + po).remove();
}
