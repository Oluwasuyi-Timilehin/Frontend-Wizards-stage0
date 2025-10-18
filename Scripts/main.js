// Updating time display with current time in milliseconds
function updateTimeDisplay() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    const currentTime = Date.now();
    timeElement.textContent = currentTime;
    timeElement.setAttribute("aria-live", "polite");
  }
}

// Initializing the profile card
function initProfileCard() {
  // Set initial time
  updateTimeDisplay();

  // update time every second
  const timeUpdateInterval = setInterval(updateTimeDisplay, 1000);

  // Handle avatar upload
  const avatar = document.querySelector('[data-testid="test-user-avatar"]');
  if (avatar) {
    setupAvatarUpload(avatar);
  }

  // Keyboard navigation
  enhanceKeyboardNavigation();
}

// Optional: Avatar upload functionality
function setupAvatarUpload(avatarElement) {
  // Create file input for avatar upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  fileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarElement.src = e.target.result;
        // Update alt text for accessibility
        avatarElement.alt = `Uploaded profile photo of ${
          document.querySelector('[data-testid="test-user-name"]').textContent
        }`;
      };
      reader.readAsDataURL(file);
    }
  });

  // click handler to avatar for upload
  avatarElement.style.cursor = "pointer";
  avatarElement.addEventListener("click", () => {
    fileInput.click();
  });

  avatarElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      fileInput.click();
    }
  });

  // upload hint for screen readers
  const uploadHint = document.createElement("span");
  uploadHint.className = "visually-hidden";
  uploadHint.textContent = "Click to upload new profile picture";
  avatarElement.parentNode.appendChild(uploadHint);

  document.body.appendChild(fileInput);
}

// Enhancing keyboard navigation
function enhanceKeyboardNavigation() {
  // focus management for social links
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link, index) => {
    link.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        const nextLink = socialLinks[index + 1] || socialLinks[0];
        nextLink.focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const prevLink =
          socialLinks[index - 1] || socialLinks[socialLinks.length - 1];
        prevLink.focus();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", initProfileCard);

// Handles page visibility change to optimize performance
document.addEventListener("visibilitychange", function () {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    if (document.hidden) {
      // Page is hidden
      clearInterval(window.timeUpdateInterval);
    } else {
      // Page is visible
      updateTimeDisplay();
    }
  }
});
