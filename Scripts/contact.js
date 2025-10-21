class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.successMessage = document.getElementById("successMessage");
    this.init();
  }

  init() {
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
    this.setupRealTimeValidation();
    this.enhanceAccessibility();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      this.showSuccess();
      this.form.reset();
      this.clearAllErrors();
    }
  }

  validateForm() {
    let isValid = true;
    const fields = [
      { id: "name", validator: this.validateName.bind(this) },
      { id: "email", validator: this.validateEmail.bind(this) },
      { id: "subject", validator: this.validateSubject.bind(this) },
      { id: "message", validator: this.validateMessage.bind(this) },
    ];

    fields.forEach(({ id, validator }) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}-error`);
      const { isValid: fieldValid, message } = validator(input.value);

      if (!fieldValid) {
        this.showError(input, error, message);
        isValid = false;
      } else {
        this.clearError(input, error);
      }
    });

    return isValid;
  }

  validateName(value) {
    if (!value.trim()) {
      return { isValid: false, message: "Full name is required" };
    }
    if (value.trim().length < 2) {
      return { isValid: false, message: "Name must be at least 2 characters" };
    }
    return { isValid: true };
  }

  validateEmail(value) {
    if (!value.trim()) {
      return { isValid: false, message: "Email is required" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, message: "Please enter a valid email address" };
    }
    return { isValid: true };
  }

  validateSubject(value) {
    if (!value.trim()) {
      return { isValid: false, message: "Subject is required" };
    }
    if (value.trim().length < 3) {
      return {
        isValid: false,
        message: "Subject must be at least 3 characters",
      };
    }
    return { isValid: true };
  }

  validateMessage(value) {
    if (!value.trim()) {
      return { isValid: false, message: "Message is required" };
    }
    if (value.trim().length < 10) {
      return {
        isValid: false,
        message: "Message must be at least 10 characters",
      };
    }
    return { isValid: true };
  }

  showError(input, errorElement, message) {
    input.classList.add("error");
    errorElement.textContent = message;
    errorElement.setAttribute("aria-live", "assertive");
  }

  clearError(input, errorElement) {
    input.classList.remove("error");
    errorElement.textContent = "";
  }

  clearAllErrors() {
    const errors = document.querySelectorAll(".error-message");
    const inputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    errors.forEach((error) => (error.textContent = ""));
    inputs.forEach((input) => input.classList.remove("error"));
  }

  setupRealTimeValidation() {
    const inputs = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        // Clear error when user starts typing
        if (input.classList.contains("error")) {
          const errorId = input.getAttribute("aria-describedby");
          const errorElement = document.getElementById(errorId);
          this.clearError(input, errorElement);
        }
      });
    });
  }

  validateField(input) {
    const value = input.value;
    const errorElement = document.getElementById(
      input.getAttribute("aria-describedby")
    );
    let result = { isValid: true };

    switch (input.id) {
      case "name":
        result = this.validateName(value);
        break;
      case "email":
        result = this.validateEmail(value);
        break;
      case "subject":
        result = this.validateSubject(value);
        break;
      case "message":
        result = this.validateMessage(value);
        break;
    }

    if (!result.isValid) {
      this.showError(input, errorElement, result.message);
    } else {
      this.clearError(input, errorElement);
    }
  }

  showSuccess() {
    this.successMessage.classList.remove("hidden");

    // Hide success message after 5 seconds
    setTimeout(() => {
      this.successMessage.classList.add("hidden");
    }, 5000);

    // Focus on success message for screen readers
    this.successMessage.focus();
  }

  enhanceAccessibility() {
    // Add required attribute to all inputs
    const requiredInputs = this.form.querySelectorAll('[aria-required="true"]');
    requiredInputs.forEach((input) => {
      input.setAttribute("required", "");
    });

    // Ensure form is keyboard accessible
    this.form.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.clearAllErrors();
      }
    });
  }
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactForm();
});
