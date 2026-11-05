
/* =========================================
   PULSEPOINT CPR TRAINING
   Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    setupMobileNavigation();
    setupFooterYear();
    setupScheduleFilter();
    setupContactForm();
    setupPreferredDate();
});

/* ---------- Mobile Navigation ---------- */

function setupMobileNavigation() {
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".site-nav");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";
        }
    });
}

/* ---------- Dynamic Footer Year ---------- */

function setupFooterYear() {
    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/* ---------- Class Schedule Filtering ---------- */

function setupScheduleFilter() {
    const filter = document.getElementById("class-filter");

    if (!filter) {
        return;
    }

    const cards = document.querySelectorAll(".schedule-card");
    const emptyMessage = document.getElementById("no-classes");

    filter.addEventListener("change", () => {
        const selectedCourse = filter.value;
        let visibleCount = 0;

        cards.forEach((card) => {
            const cardCourse = card.dataset.course;

            const shouldShow =
                selectedCourse === "all" ||
                cardCourse === selectedCourse;

            card.hidden = !shouldShow;

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (emptyMessage) {
            emptyMessage.hidden = visibleCount > 0;
        }
    });
}

/* ---------- Preferred Date ---------- */

function setupPreferredDate() {
    const dateInput = document.getElementById("preferred-date");

    if (!dateInput) {
        return;
    }

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
}

/* ---------- Contact Form ---------- */

function setupContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) {
        return;
    }

    const courseSelect = document.getElementById("course");
    const statusMessage = document.getElementById("form-status");

    /* Automatically select a course from URL parameters. */

    const urlParameters = new URLSearchParams(
        window.location.search
    );

    const requestedCourse = urlParameters.get("course");

    if (requestedCourse && courseSelect) {
        const matchingOption = Array.from(
            courseSelect.options
        ).find((option) => {
            return option.value === requestedCourse;
        });

        if (matchingOption) {
            courseSelect.value = requestedCourse;
        }
    }

    /* Demonstration form submission. */

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        /*
         * IMPORTANT:
         *
         * This website is a static prototype.
         * No data is transmitted, stored, or emailed.
         *
         * A backend or form service will be
         * connected before production launch.
         */

        if (statusMessage) {
            statusMessage.hidden = false;

            statusMessage.textContent =
                "Demo successful! Your form passed validation. " +
                "No information was sent or saved. " +
                "A real backend will be added before launch.";

            statusMessage.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }
    });
}
