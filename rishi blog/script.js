(() => {
  // Sample initial posts data
  let posts = [
    {
      id: 1,
      title: "Getting Started with HTML",
      category: "tutorial",
      date: "2024-06-20",
      content:
        "HTML is the foundation of the web. In this tutorial, you will learn about elements, tags, attributes, and structuring your first webpage in a simple and effective way.",
    },
    {
      id: 2,
      title: "Why JavaScript is Essential",
      category: "tips",
      date: "2024-06-18",
      content:
        "JavaScript adds life and interactivity to your websites. Understanding it will open doors to endless possibilities in web development.",
    },
    {
      id: 3,
      title: "Latest Web Development Trends",
      category: "news",
      date: "2024-06-15",
      content:
        "Web development is evolving rapidly. Stay updated with the latest trends such as Jamstack, serverless, and progressive web apps.",
    },
    {
      id: 4,
      title: "My Journey as a Beginner Coder",
      category: "opinions",
      date: "2024-06-10",
      content:
        "Starting to code can be challenging but rewarding. Here’s my personal experience navigating the learning curve and tips for perseverance.",
    },
    {
      id: 5,
      title: "Introduction to Aircraft Design",
      category: "aircraft",
      date: "2024-06-22",
      content:
        "Aircraft design is a fascinating field blending aerodynamics, materials science, and engineering. In this post, we explore the basics of how aircraft are designed for optimal performance and safety.",
    },
    {
      id: 6,
      title: "The Evolution of Commercial Jets",
      category: "aircraft",
      date: "2024-06-23",
      content:
        "Commercial jets have come a long way since the first models. Discover key milestones in jet design, technology advancements, and how modern aircraft achieve greater fuel efficiency.",
    },
  ];

  const postsContainer = document.getElementById("postsContainer");
  const newPostForm = document.getElementById("newPostForm");
  const categoryList = document.getElementById("categoryList");
  const searchInput = document.getElementById("searchInput");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  let selectedCategory = "all";

  // Likes saved using localStorage
  let likes = JSON.parse(localStorage.getItem("likes")) || {};

  // Load dark mode preference
  const userPrefersDark = localStorage.getItem("darkMode") === "enabled";
  if (userPrefersDark) {
    body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
    darkModeToggle.setAttribute("aria-pressed", "true");
  }

  // Utility: format date nicely
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const d = new Date(inputDate);
    return d.toLocaleDateString(undefined, options);
  }

  // Render posts filtered by category and search
  function renderPosts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    postsContainer.innerHTML = ""; // Clear

    const filteredPosts = posts.filter((p) => {
      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm) ||
        p.content.toLowerCase().includes(searchTerm);
      return matchCategory && matchSearch;
    });

    if (filteredPosts.length === 0) {
      postsContainer.innerHTML =
        '<p style="font-style: italic; color:#64748b;">No posts found matching criteria.</p>';
      return;
    }

    filteredPosts.forEach((post) => {
      const postEl = document.createElement("article");
      postEl.className = "post";
      postEl.tabIndex = 0;
      postEl.setAttribute("aria-label", `Blog post: ${post.title}`);

      const liked = likes[post.id] === true;

      postEl.innerHTML = `
            <h3 tabindex="0">${post.title}</h3>
            <div class="meta">
              <div class="left-meta">Published on ${formatDate(
                post.date
              )} | Category: <strong>${capitalize(post.category)}</strong></div>
              <div class="right-meta">
                <button class="like-btn" aria-label="Like post titled ${
                  post.title
                }" aria-pressed="${liked}">
                  &#9733;
                </button>
              </div>
            </div>
            <p class="content">${truncate(post.content, 200)}</p>
            <button class="read-more" aria-expanded="false" aria-controls="content-${
              post.id
            }">Read more</button>
          `;

      // Add Like button toggle functionality
      const likeBtn = postEl.querySelector("button.like-btn");
      if (liked) {
        likeBtn.classList.add("liked");
      }
      likeBtn.addEventListener("click", () => {
        const isLiked = likeBtn.classList.toggle("liked");
        likeBtn.setAttribute("aria-pressed", isLiked);
        likes[post.id] = isLiked;
        localStorage.setItem("likes", JSON.stringify(likes));
      });

      // Add Read More toggle functionality
      const contentP = postEl.querySelector("p.content");
      contentP.id = `content-${post.id}`;
      const readMoreBtn = postEl.querySelector("button.read-more");

      readMoreBtn.addEventListener("click", () => {
        const expanded = readMoreBtn.getAttribute("aria-expanded") === "true";
        if (expanded) {
          contentP.textContent = truncate(post.content, 200);
          readMoreBtn.textContent = "Read more";
          readMoreBtn.setAttribute("aria-expanded", "false");
          contentP.classList.remove("expanded");
        } else {
          contentP.textContent = post.content;
          readMoreBtn.textContent = "Show less";
          readMoreBtn.setAttribute("aria-expanded", "true");
          contentP.classList.add("expanded");
        }
      });

      postsContainer.appendChild(postEl);
    });
  }

  // Truncate text utility, adding ellipsis if longer than max length
  function truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Category filter logic
  function updateCategoryFilter(newCategory) {
    selectedCategory = newCategory;
    // Update active class and aria-selected in categories list
    Array.from(categoryList.children).forEach((li) => {
      const isActive = li.getAttribute("data-category") === newCategory;
      if (isActive) {
        li.classList.add("active");
        li.setAttribute("aria-selected", "true");
        li.tabIndex = 0;
        li.focus();
      } else {
        li.classList.remove("active");
        li.setAttribute("aria-selected", "false");
        li.tabIndex = -1;
      }
    });
    renderPosts();
  }

  // Setup category list click and keyboard interaction
  categoryList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      const cat = e.target.getAttribute("data-category");
      updateCategoryFilter(cat);
    }
  });

  categoryList.addEventListener("keydown", (e) => {
    const items = Array.from(categoryList.children);
    let currentIndex = items.findIndex(
      (item) => item === document.activeElement
    );

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex].focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex].focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (document.activeElement.tagName === "LI") {
        const cat = document.activeElement.getAttribute("data-category");
        updateCategoryFilter(cat);
      }
    }
  });

  // Handle new post form submission
  newPostForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = newPostForm.postTitle.value.trim();
    const category = newPostForm.postCategory.value;
    const content = newPostForm.postContent.value.trim();

    if (!title || !category || !content) {
      alert("Please fill in all fields.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title,
      category,
      date: new Date().toISOString(),
      content,
    };

    posts.unshift(newPost); // Add new post at top
    renderPosts();
    newPostForm.reset();
    if (selectedCategory !== "all" && selectedCategory !== category) {
      updateCategoryFilter("all"); // Show all to reveal new post if filtered out
    }
    alert("Your post has been published!");
  });

  // Search input live filtering
  searchInput.addEventListener("input", () => {
    renderPosts();
  });

  // Dark mode toggle logic
  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const darkEnabled = body.classList.contains("dark-mode");
    if (darkEnabled) {
      darkModeToggle.textContent = "Light Mode";
      darkModeToggle.setAttribute("aria-pressed", "true");
      localStorage.setItem("darkMode", "enabled");
    } else {
      darkModeToggle.textContent = "Dark Mode";
      darkModeToggle.setAttribute("aria-pressed", "false");
      localStorage.setItem("darkMode", "disabled");
    }
  });

  // Initial render:
  renderPosts();
  updateCategoryFilter("all");

  // Smooth scroll for nav links
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
