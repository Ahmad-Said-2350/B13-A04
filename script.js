const jobs = [
  {
    id: 1,
    companyName: "TechNova",
    position: "Frontend Developer",
    location: "Dhaka",
    type: "Remote",
    salary: "45,000 - 60,000 BDT",
    description: "Build scalable interfaces with vanilla JavaScript and reusable components.",
    status: "all"
  },
  {
    id: 2,
    companyName: "DataPulse",
    position: "Junior JavaScript Engineer",
    location: "Chattogram",
    type: "Onsite",
    salary: "38,000 - 52,000 BDT",
    description: "Maintain dashboard modules, debug issues, and improve performance.",
    status: "all"
  },
  {
    id: 3,
    companyName: "Orbit Labs",
    position: "UI Engineer",
    location: "Sylhet",
    type: "Hybrid",
    salary: "50,000 - 70,000 BDT",
    description: "Design interactive web experiences with accessibility-first patterns.",
    status: "all"
  },
  {
    id: 4,
    companyName: "Nexa Commerce",
    position: "Web Developer",
    location: "Dhaka",
    type: "Onsite",
    salary: "42,000 - 58,000 BDT",
    description: "Develop new storefront features and optimize conversion-related flows.",
    status: "all"
  },
  {
    id: 5,
    companyName: "CloudNook",
    position: "Frontend Intern",
    location: "Rajshahi",
    type: "Remote",
    salary: "20,000 - 28,000 BDT",
    description: "Assist senior developers in implementing responsive user interfaces.",
    status: "all"
  },
  {
    id: 6,
    companyName: "PixelMint",
    position: "React Trainee",
    location: "Khulna",
    type: "Hybrid",
    salary: "30,000 - 40,000 BDT",
    description: "Convert design files into clean component-based web pages.",
    status: "all"
  },
  {
    id: 7,
    companyName: "AppBridge",
    position: "JavaScript Developer",
    location: "Barishal",
    type: "Remote",
    salary: "48,000 - 65,000 BDT",
    description: "Work on product features, API integration, and bug fixing cycles.",
    status: "all"
  },
  {
    id: 8,
    companyName: "BrightStack",
    position: "Frontend Support Engineer",
    location: "Dhaka",
    type: "Onsite",
    salary: "35,000 - 46,000 BDT",
    description: "Support UI releases and handle quality fixes across web modules.",
    status: "all"
  }
];

let activeTab = "all";

const tabs = document.getElementById("tabs");
const jobsContainer = document.getElementById("jobs-container");
const dashboardTotal = document.getElementById("dashboard-total");
const dashboardInterview = document.getElementById("dashboard-interview");
const dashboardRejected = document.getElementById("dashboard-rejected");
const tabAll = document.getElementById("tab-all");
const tabInterview = document.getElementById("tab-interview");
const tabRejected = document.getElementById("tab-rejected");
const activeTabLabel = document.getElementById("active-tab-label");
const activeTabCount = document.getElementById("active-tab-count");

function getCounts() {
  const total = jobs.length;
  const interview = jobs.filter((job) => job.status === "interview").length;
  const rejected = jobs.filter((job) => job.status === "rejected").length;
  return { total, interview, rejected };
}

function getFilteredJobs() {
  if (activeTab === "all") return jobs;
  return jobs.filter((job) => job.status === activeTab);
}

function getTabLabel(tab) {
  if (tab === "all") return "All";
  if (tab === "interview") return "Interview";
  return "Rejected";
}

function renderDashboard() {
  const counts = getCounts();
  dashboardTotal.textContent = counts.total;
  dashboardInterview.textContent = counts.interview;
  dashboardRejected.textContent = counts.rejected;
}

function renderTabsCount() {
  const counts = getCounts();
  tabAll.textContent = `(${counts.total})`;
  tabInterview.textContent = `(${counts.interview})`;
  tabRejected.textContent = `(${counts.rejected})`;
}

function renderActiveTabSummary() {
  const filteredJobs = getFilteredJobs();
  activeTabLabel.textContent = getTabLabel(activeTab);
  activeTabCount.textContent = filteredJobs.length;
}

function renderEmptyState() {
  jobsContainer.innerHTML = `
    <div class="col-span-full border border-dashed border-slate-300 rounded-xl p-10 text-center bg-slate-50">

     

      <div class="img flex justify-center items-center">
    <img src="./images/jobs.png" alt="">
</div>


    
      <h3 class="text-xl font-semibold text-slate-900">No jobs available</h3>
      <p class="text-slate-600 mt-2">Check back soon for new job opportunities</p>
    </div>
  `;
}

function getStatusBadge(status) {
  if (status === "interview") {
    return `<span class="badge badge-success badge-outline">Interview</span>`;
  }
  if (status === "rejected") {
    return `<span class="badge badge-error badge-outline">Rejected</span>`;
  }
  return `<span class="badge badge-ghost">Pending</span>`;
}

function renderJobs() {
  const filteredJobs = getFilteredJobs();

  if (filteredJobs.length === 0) {
    renderEmptyState();
    return;
  }

  jobsContainer.innerHTML = filteredJobs
    .map(
      (job) => `
      <article class="card bg-white border border-slate-200 shadow-sm">
        <div class="card-body ">
          <div class="flex items-start justify-between gap-2">
            <div>
              <h3 class="card-title text-lg text-slate-900">${job.position}</h3>
              <p class="text-slate-600 text-sm mt-1">${job.companyName}</p>
            </div>
            ${getStatusBadge(job.status)}
          </div>

          <p class="text-sm text-slate-700 mt-2"><span class="font-semibold">Location:</span> ${job.location}</p>
          <p class="text-sm text-slate-700"><span class="font-semibold">Type:</span> ${job.type}</p>
          <p class="text-sm text-slate-700"><span class="font-semibold">Salary:</span> ${job.salary}</p>
          <p class="text-sm text-slate-600 mt-2">${job.description}</p>

          <div class="card-actions justify-end mt-4">
            <button class="btn btn-sm btn-outline border-green-500 text-green-500 interview-btn" data-id="${job.id}">Interview</button>
            <button class="btn btn-sm btn-outline border-red-500 text-red-500 rejected-btn" data-id="${job.id}">Rejected</button>
            <button class="btn btn-sm btn-outline delete-btn" data-id="${job.id}">Delete</button>
          </div>
        </div>
      </article>
    `
    )
    .join("");
}

function renderActiveTabStyle() {
  const tabButtons = tabs.querySelectorAll(".tab");
  tabButtons.forEach((button) => {
    if (button.dataset.tab === activeTab) {
      button.classList.add("tab-active");
    } else {
      button.classList.remove("tab-active");
    }
  });
}

function renderAll() {
  renderDashboard();
  renderTabsCount();
  renderActiveTabSummary();
  renderActiveTabStyle();
  renderJobs();
}

tabs.addEventListener("click", (event) => {
  const clickedTab = event.target.closest("[data-tab]");
  if (!clickedTab) return;
  activeTab = clickedTab.dataset.tab;
  renderAll();
});

jobsContainer.addEventListener("click", (event) => {
  const target = event.target;
  const button = target.closest("button[data-id]");
  if (!button) return;

  const jobId = Number(button.dataset.id);
  const job = jobs.find((item) => item.id === jobId);
  if (!job) return;

  if (button.classList.contains("interview-btn")) {
    job.status = job.status === "interview" ? "all" : "interview";
  } else if (button.classList.contains("rejected-btn")) {
    job.status = job.status === "rejected" ? "all" : "rejected";
  } else if (button.classList.contains("delete-btn")) {
    const index = jobs.findIndex((item) => item.id === jobId);
    if (index !== -1) jobs.splice(index, 1);
  }

  renderAll();
});

renderAll();
