// ServiceCore Bootstrap Export (static)

const state = {
  view: "login",
  tickets: [
    {
      id: "INC-2024-001",
      subject: "Unable to access VPN from remote location",
      status: "Open",
      priority: "High",
      requester: "Michael Scott",
      assigned: "Alex Morgan",
      updated: "Today, 10:12 AM",
      type: "Incident",
    },
    {
      id: "SR-2024-045",
      subject: "New Laptop Request for Marketing Intern",
      status: "Pending",
      priority: "Medium",
      requester: "Emily Blunt",
      assigned: "Sarah Chen",
      updated: "Yesterday, 3:40 PM",
      type: "Service Request",
    },
    {
      id: "INC-2024-003",
      subject: "Printer on 3rd floor jamming repeatedly",
      status: "In Progress",
      priority: "Low",
      requester: "Michael Scott",
      assigned: "Sarah Chen",
      updated: "Today, 7:05 AM",
      type: "Incident",
    },
    {
      id: "PRB-2024-001",
      subject: "Intermittent email delivery delays",
      status: "Open",
      priority: "Critical",
      requester: "Alex Morgan",
      assigned: "—",
      updated: "Today, 8:20 AM",
      type: "Problem",
    },
    {
      id: "INC-2024-004",
      subject: "Adobe license expired warning",
      status: "Resolved",
      priority: "Medium",
      requester: "Emily Blunt",
      assigned: "Alex Morgan",
      updated: "Jan 23, 1:15 PM",
      type: "Incident",
    },
  ],
  users: [
    { name: "Alex Morgan", email: "alex.morgan@company.com", role: "Admin", dept: "IT Ops", status: "active" },
    { name: "Sarah Chen", email: "sarah.chen@company.com", role: "Manager", dept: "Engineering", status: "active" },
    { name: "Michael Scott", email: "m.scott@company.com", role: "Member", dept: "Sales", status: "busy" },
    { name: "Emily Blunt", email: "emily.b@company.com", role: "Member", dept: "Design", status: "offline" },
    { name: "David Kim", email: "d.kim@company.com", role: "Member", dept: "Engineering", status: "active" },
  ],
  projects: [
    { id: "PROJ-001", name: "Website Redesign", status: "Active", progress: 35, due: "Mar 15, 2026", team: ["Sarah", "Emily", "David"], desc: "Overhaul corporate website + CMS." },
    { id: "PROJ-002", name: "Cloud Migration", status: "Planning", progress: 0, due: "Jun 10, 2026", team: ["Alex", "Sarah"], desc: "Move on-prem infrastructure to AWS." },
    { id: "PROJ-003", name: "Q3 Marketing Campaign", status: "Active", progress: 15, due: "Feb 24, 2026", team: ["Michael", "Emily"], desc: "Digital and print launch campaign." },
  ],
  assets: [
    { id: "AST-001", name: "MacBook Pro 16", status: "In Use", model: "M3 Max", serial: "FVFX23K9J1", warranty: "Active" },
    { id: "AST-002", name: "Dell UltraSharp 27", status: "In Stock", model: "U2723QE", serial: "CN-0V4K9J", warranty: "Active" },
    { id: "AST-003", name: "Adobe Creative Cloud", status: "In Use", model: "All Apps", serial: "N/A", warranty: "Active" },
    { id: "AST-004", name: "Herman Miller Aeron", status: "In Use", model: "Remastered B", serial: "HM-99283", warranty: "Expired" },
    { id: "AST-005", name: "Lenovo ThinkPad X1", status: "Maintenance", model: "Carbon Gen 11", serial: "PF-2X9L9J", warranty: "Active" },
  ],
  tasks: [
    { id: "TASK-101", title: "Finalize Homepage Mockups", status: "Done", priority: "High", assignee: "Emily", due: "Jan 27" },
    { id: "TASK-102", title: "Implement Hero Section", status: "In Progress", priority: "Medium", assignee: "Sarah", due: "Jan 31" },
    { id: "TASK-103", title: "Content Strategy Meeting", status: "Todo", priority: "Medium", assignee: "Michael", due: "Feb 03" },
    { id: "TASK-201", title: "AWS Cost Estimation", status: "Review", priority: "High", assignee: "Alex", due: "Jan 30" },
    { id: "TASK-202", title: "Security Audit", status: "Todo", priority: "Critical", assignee: "Alex", due: "Feb 15" },
  ],
  kb: [
    { title: "How to create a ticket", body: "Use the New Ticket button, add details, and submit. Include screenshots when possible." },
    { title: "SLA & priority best practices", body: "Use Critical only for outages. High for blockers. Medium for normal issues." },
    { title: "Managing projects and milestones", body: "Create a project, define dates, assign owners, and manage tasks via Kanban." },
  ],
  chat: [
    { from: "agent", text: "Hi! I’m ServiceCore Support. How can I help today?", time: nowTime() },
  ],
};

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function toast(message, variant = "primary") {
  const host = $("#toastHost");
  const id = `t_${Math.random().toString(16).slice(2)}`;
  const el = document.createElement("div");
  el.className = `toast align-items-center text-bg-${variant} border-0`;
  el.id = id;
  el.role = "alert";
  el.ariaLive = "assertive";
  el.ariaAtomic = "true";
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${escapeHtml(message)}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;
  host.appendChild(el);
  const t = new bootstrap.Toast(el, { delay: 2200 });
  t.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setView(view) {
  state.view = view;
  $all(".view").forEach((sec) => {
    sec.hidden = sec.getAttribute("data-view") !== view;
  });
  $all(".nav-item[data-view]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-view") === view);
  });

  // When logged out, hide shell bits
  const isLogin = view === "login";
  $(".sidebar").style.display = isLogin ? "none" : "flex";
  $(".topbar").style.display = isLogin ? "none" : "flex";
  $(".app-shell").style.gridTemplateColumns = isLogin ? "1fr" : "280px 1fr";
}

function renderActivity() {
  const list = $("#activityList");
  if (!list) return;
  const items = [
    { dot: "danger", title: "INC-2024-001", text: "VPN issue opened", time: "2h ago" },
    { dot: "warning", title: "SR-2024-045", text: "Laptop request pending", time: "1d ago" },
    { dot: "success", title: "INC-2024-004", text: "Adobe license resolved", time: "2d ago" },
  ];
  list.innerHTML = items
    .map(
      (i) => `
      <div class="list-group-item px-0">
        <div class="d-flex justify-content-between">
          <div>
            <div class="fw-semibold small">${i.title}</div>
            <div class="text-muted small">${i.text}</div>
          </div>
          <div class="text-muted small">${i.time}</div>
        </div>
      </div>
    `,
    )
    .join("");
}

function badgeForStatus(status) {
  const map = {
    "Open": "primary",
    "In Progress": "info",
    "Pending": "warning",
    "Resolved": "success",
    "Closed": "secondary",
    "Planning": "secondary",
    "Active": "success",
    "On Hold": "warning",
    "Completed": "primary",
    "In Use": "primary",
    "In Stock": "success",
    "Maintenance": "warning",
    "Retired": "secondary",
  };
  return map[status] || "secondary";
}

function badgeForPriority(priority) {
  const map = {
    "Low": "secondary",
    "Medium": "primary",
    "High": "warning",
    "Critical": "danger",
  };
  return map[priority] || "secondary";
}

function renderTickets() {
  const tbody = $("#ticketsTbody");
  if (!tbody) return;

  const q = ($("#ticketSearch")?.value || "").trim().toLowerCase();
  const filtered = state.tickets.filter((t) =>
    [t.id, t.subject, t.status, t.priority, t.requester, t.assigned, t.type]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );

  tbody.innerHTML = filtered
    .map(
      (t) => `
      <tr data-testid="row-ticket-${t.id}">
        <td class="font-monospace small">${t.id}</td>
        <td>
          <div class="fw-semibold">${escapeHtml(t.subject)}</div>
          <div class="text-muted small">${t.type}</div>
        </td>
        <td><span class="badge text-bg-${badgeForStatus(t.status)}">${t.status}</span></td>
        <td><span class="badge text-bg-${badgeForPriority(t.priority)}">${t.priority}</span></td>
        <td class="text-muted">${t.requester}</td>
        <td class="text-muted">${t.assigned}</td>
        <td class="text-end text-muted small">${t.updated}</td>
      </tr>
    `,
    )
    .join("");

  $("#ticketsMeta").textContent = `Showing 1-${Math.min(filtered.length, 10)} of ${filtered.length} tickets`;
}

function renderProjects() {
  const grid = $("#projectsGrid");
  if (!grid) return;

  grid.innerHTML = state.projects
    .map((p) => {
      const color = badgeForStatus(p.status);
      return `
      <div class="col-12 col-md-6 col-xl-4" data-testid="card-project-${p.id}">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge text-bg-${color}">${p.status}</span>
              <span class="badge text-bg-light">${p.id}</span>
            </div>
            <div class="h5 fw-bold">${escapeHtml(p.name)}</div>
            <div class="text-muted small mb-3">${escapeHtml(p.desc)}</div>

            <div class="d-flex justify-content-between small text-muted mb-1">
              <span>Progress</span>
              <span>${p.progress}%</span>
            </div>
            <div class="progress" role="progressbar" aria-valuenow="${p.progress}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar" style="width: ${p.progress}%"></div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
              <div class="text-muted small">Due: ${p.due}</div>
              <button class="btn btn-sm btn-outline-secondary" data-action="open-project" data-project="${p.id}" data-testid="button-open-project-${p.id}">Open</button>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");
}

function renderAssets() {
  const grid = $("#assetsGrid");
  if (!grid) return;

  grid.innerHTML = state.assets
    .map((a) => {
      return `
      <div class="col-12 col-md-6 col-xl-4" data-testid="card-asset-${a.id}">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge text-bg-${badgeForStatus(a.status)}">${a.status}</span>
              <span class="badge text-bg-light">${a.id}</span>
            </div>
            <div class="fw-bold">${escapeHtml(a.name)}</div>
            <div class="text-muted small">${escapeHtml(a.model)} • ${escapeHtml(a.serial)}</div>
            <div class="mt-3 d-flex justify-content-between small">
              <span class="text-muted">Warranty</span>
              <span class="fw-semibold ${a.warranty === "Expired" ? "text-danger" : "text-success"}">${a.warranty}</span>
            </div>
          </div>
        </div>
      </div>
      `;
    })
    .join("");
}

function renderUsers() {
  const tbody = $("#usersTbody");
  if (!tbody) return;
  const q = ($("#userSearch")?.value || "").trim().toLowerCase();
  const filtered = state.users.filter((u) =>
    [u.name, u.email, u.role, u.dept, u.status].join(" ").toLowerCase().includes(q),
  );

  tbody.innerHTML = filtered
    .map((u, idx) => {
      const s = u.status;
      const dot = s === "active" ? "success" : s === "busy" ? "danger" : "secondary";
      return `
      <tr data-testid="row-user-${idx}">
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="avatar" style="width:28px;height:28px;font-size:11px">${u.name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}</div>
            <div>
              <div class="fw-semibold">${escapeHtml(u.name)}</div>
              <div class="text-muted small">${escapeHtml(u.email)}</div>
            </div>
          </div>
        </td>
        <td><span class="badge text-bg-light border" style="border-color: rgba(15,23,42,.12)!important">${u.role}</span></td>
        <td class="text-muted">${u.dept}</td>
        <td>
          <span class="badge text-bg-${dot}">${u.status}</span>
        </td>
      </tr>
      `;
    })
    .join("");
}

function renderKanban() {
  const by = (status) => state.tasks.filter((t) => t.status === status);
  const cols = {
    "Todo": $("#kanbanTodo"),
    "In Progress": $("#kanbanProgress"),
    "Review": $("#kanbanReview"),
    "Done": $("#kanbanDone"),
  };

  Object.entries(cols).forEach(([status, el]) => {
    if (!el) return;
    el.innerHTML = by(status)
      .map(
        (t) => `
        <div class="task-card" draggable="true" data-task="${t.id}" data-testid="card-task-${t.id}">
          <div class="d-flex justify-content-between align-items-start">
            <span class="task-pill">${t.priority}</span>
            <span class="text-muted small">${t.due}</span>
          </div>
          <div class="fw-semibold mt-2">${escapeHtml(t.title)}</div>
          <div class="text-muted small mt-1">${escapeHtml(t.assignee)}</div>
        </div>
      `,
      )
      .join("");
  });

  $("[data-testid=badge-todo-count]").textContent = by("Todo").length;
  $("[data-testid=badge-progress-count]").textContent = by("In Progress").length;
  $("[data-testid=badge-review-count]").textContent = by("Review").length;
  $("[data-testid=badge-done-count]").textContent = by("Done").length;

  wireDnd();
}

function wireDnd() {
  // Basic HTML5 drag/drop between columns
  const cards = $all(".task-card");
  const cols = $all(".kanban-col__body");

  cards.forEach((c) => {
    c.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", c.getAttribute("data-task"));
      setTimeout(() => c.classList.add("opacity-50"), 0);
    });
    c.addEventListener("dragend", () => c.classList.remove("opacity-50"));
  });

  cols.forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.style.outline = "2px dashed rgba(37,99,235,.35)";
      col.style.outlineOffset = "6px";
    });
    col.addEventListener("dragleave", () => {
      col.style.outline = "";
      col.style.outlineOffset = "";
    });
    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.style.outline = "";
      col.style.outlineOffset = "";
      const id = e.dataTransfer.getData("text/plain");
      const parent = col.closest(".kanban-col");
      const newStatus = parent?.getAttribute("data-col");
      const task = state.tasks.find((t) => t.id === id);
      if (task && newStatus) {
        task.status = newStatus;
        renderKanban();
        toast(`Moved ${id} → ${newStatus}`, "primary");
      }
    });
  });
}

function renderKB() {
  const list = $("#kbList");
  if (!list) return;
  list.innerHTML = state.kb
    .map(
      (a, i) => `
    <button class="list-group-item list-group-item-action" data-action="kb-open" data-idx="${i}" data-testid="kb-item-${i}">
      <div class="fw-semibold">${escapeHtml(a.title)}</div>
      <div class="text-muted small">${escapeHtml(a.body.slice(0, 68))}…</div>
    </button>
  `,
    )
    .join("");
}

function renderChat() {
  const thread = $("#chatThread");
  if (!thread) return;
  thread.innerHTML = state.chat
    .map((m, idx) => {
      const me = m.from === "me";
      const name = me ? "You" : "Support";
      return `
      <div class="chat-msg ${me ? "me" : ""}" data-testid="chat-msg-${idx}">
        <div class="chat-msg__meta">
          <span>${name}</span>
          <span>${m.time}</span>
        </div>
        <div class="chat-bubble">${escapeHtml(m.text)}</div>
      </div>
    `;
    })
    .join("");
  thread.scrollTop = thread.scrollHeight;
}

function openModal(id) {
  const el = $(id);
  const modal = new bootstrap.Modal(el);
  modal.show();
  return modal;
}

function initModals() {
  // Populate project lead + team
  const leadSel = $("#newProjectLead");
  const team = $("#newProjectTeam");
  if (leadSel) {
    leadSel.innerHTML = state.users
      .filter((u) => u.role === "Admin" || u.role === "Manager")
      .map((u) => `<option value="${escapeHtml(u.email)}">${escapeHtml(u.name)} (${u.role})</option>`)
      .join("");
  }
  if (team) {
    team.innerHTML = state.users
      .map((u) => `<span class="team-pill" data-email="${escapeHtml(u.email)}" data-testid="pill-team-${escapeHtml(u.email)}">${escapeHtml(u.name)}</span>`)
      .join("");

    team.addEventListener("click", (e) => {
      const pill = e.target.closest(".team-pill");
      if (!pill) return;
      pill.classList.toggle("active");
    });
  }
}

function wireActions() {
  // Sidebar nav
  $all(".nav-item[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.getAttribute("data-view")));
  });

  // Top buttons
  $all("[data-action=new-ticket]").forEach((b) => b.addEventListener("click", () => openModal("#modalNewTicket")));
  $all("[data-action=new-project]").forEach((b) => b.addEventListener("click", () => openModal("#modalNewProject")));
  $all("[data-action=invite-user]").forEach((b) => b.addEventListener("click", () => openModal("#modalInviteUser")));

  // Login
  $("#form-login")?.addEventListener("submit", (e) => {
    e.preventDefault();
    toast("Signed in successfully", "success");
    setView("dashboard");
  });

  $("[data-action=logout]")?.addEventListener("click", () => {
    toast("Logged out", "secondary");
    setView("login");
  });

  // Tickets search
  $("#ticketSearch")?.addEventListener("input", renderTickets);

  // Users search
  $("#userSearch")?.addEventListener("input", renderUsers);

  // New ticket submit
  $("#formNewTicket")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = $("#newTicketSubject").value.trim();
    const type = $("#newTicketType").value;
    const priority = $("#newTicketPriority").value;
    const desc = $("#newTicketDescription").value.trim();
    if (!subject || !desc) return;

    const id = `INC-${new Date().getFullYear()}-${String(state.tickets.length + 1).padStart(3, "0")}`;
    state.tickets.unshift({
      id,
      subject,
      status: "Open",
      priority,
      requester: "Alex Morgan",
      assigned: "—",
      updated: `Today, ${nowTime()}`,
      type,
    });

    bootstrap.Modal.getInstance($("#modalNewTicket")).hide();
    toast(`Ticket created: ${id}`, "success");
    setView("tickets");
    renderTickets();
    e.target.reset();
  });

  // New project submit
  $("#formNewProject")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#newProjectName").value.trim();
    const desc = $("#newProjectDescription").value.trim();
    const status = $("#newProjectStatus").value;
    const start = $("#newProjectStart").value;
    const end = $("#newProjectEnd").value;

    const pills = $all("#newProjectTeam .team-pill.active");
    const team = pills.map((p) => p.textContent.split(" ")[0]);

    if (!name) return;

    const id = `PROJ-${String(state.projects.length + 1).padStart(3, "0")}`;
    state.projects.unshift({
      id,
      name,
      status,
      progress: status === "Completed" ? 100 : 0,
      due: end ? new Date(end).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" }) : "TBD",
      team,
      desc: desc || "—",
    });

    bootstrap.Modal.getInstance($("#modalNewProject")).hide();
    toast(`Project created: ${id}`, "success");
    setView("projects");
    renderProjects();
    e.target.reset();
    $all("#newProjectTeam .team-pill").forEach((p) => p.classList.remove("active"));
  });

  // Invite user
  $("#formInviteUser")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = $("#inviteEmail").value.trim();
    if (!email) return;
    const role = $("#inviteRole").value;
    const dept = $("#inviteDept").value.trim() || "—";

    const link = `https://servicecore.app/join/inv_${Math.random().toString(16).slice(2)}`;
    $("#inviteLink").value = link;
    $("#inviteResult").hidden = false;

    toast(`Invite created for ${email}`, "success");

    // Add to mock users list (as pending)
    state.users.unshift({ name: email.split("@")[0], email, role, dept, status: "offline" });
    renderUsers();
  });

  $("#inviteCopy")?.addEventListener("click", async () => {
    const link = $("#inviteLink").value;
    try {
      await navigator.clipboard.writeText(link);
      toast("Invite link copied", "primary");
    } catch {
      toast("Could not copy (browser blocked)", "warning");
    }
  });

  // Chat
  $("#chatForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    state.chat.push({ from: "me", text, time: nowTime() });
    input.value = "";
    renderChat();

    // Mock agent reply
    setTimeout(() => {
      const reply = mockReply(text);
      state.chat.push({ from: "agent", text: reply, time: nowTime() });
      renderChat();
    }, 700);
  });

  $("#openChatBtn")?.addEventListener("click", () => {
    setView("help");
    $("#chatInput")?.focus();
  });

  // Knowledge base
  $("#kbList")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action=kb-open]");
    if (!btn) return;
    const idx = Number(btn.getAttribute("data-idx"));
    const a = state.kb[idx];
    toast(a.title, "primary");
  });

  // Kanban add task
  $("#addTaskBtn")?.addEventListener("click", () => {
    const id = `TASK-${Math.floor(Math.random() * 900 + 100)}`;
    state.tasks.unshift({ id, title: "New task", status: "Todo", priority: "Medium", assignee: "Alex", due: "TBD" });
    renderKanban();
    toast(`Task created: ${id}`, "success");
  });

  // Projects open
  $("#projectsGrid")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action=open-project]");
    if (!btn) return;
    const id = btn.getAttribute("data-project");
    toast(`Opened ${id} (mock)`, "primary");
  });
}

function mockReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes("vpn")) return "Try disconnecting any other VPN client and re-authenticate. If it persists, share your network provider.";
  if (t.includes("password")) return "If you can’t sign in, confirm your email and reset your password. Admins can also re-send an invite.";
  if (t.includes("ticket")) return "I can help with that. What’s the ticket ID and current status?";
  return "Got it. Can you share any screenshots or error messages?";
}

function init() {
  setView("login");
  renderActivity();
  renderTickets();
  renderProjects();
  renderAssets();
  renderUsers();
  renderKanban();
  renderKB();
  renderChat();
  initModals();
  wireActions();

  toast("Bootstrap export ready", "success");
}

document.addEventListener("DOMContentLoaded", init);
