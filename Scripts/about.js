class AboutPage {
  constructor() {
    this.init();
  }

  init() {
    this.enhanceAccessibility();
    this.setupSmoothScrolling();
    this.addPrintStyles();
  }

  enhanceAccessibility() {
    // Add skip to content link
    this.addSkipLink();

    // Enhance focus management for sections
    this.enhanceSectionFocus();
  }

  addSkipLink() {
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "skip-link visually-hidden";
    skipLink.textContent = "Skip to main content";
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      const mainContent = document.querySelector(
        '[data-testid="test-about-page"]'
      );
      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
      }
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  enhanceSectionFocus() {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.setAttribute("tabindex", "-1");
    });
  }

  setupSmoothScrolling() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  addPrintStyles() {
    // Add print styles dynamically
    const printStyles = `
            @media print {
                .page-navigation,
                .nav-link {
                    display: none !important;
                }
                
                .about-page section {
                    break-inside: avoid;
                    border: 1px solid #ccc !important;
                }
            }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
  }
}

// Initialize about page when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AboutPage();
});
