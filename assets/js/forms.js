/* ==========================================================================
   UNO BUN — forms.js
   Static-site form handling (contact + franchise inquiry).
   ---------------------------------------------------------------
   IMPORTANT — READ BEFORE PUBLISHING
   This website is 100% static. There is NO backend, so form data is
   NEVER stored or transmitted by the website itself.

   What this script does:
   1. Validates required fields in the browser.
   2. If CONFIG.inquiryEmail is still a placeholder (example.com), it
      shows an honest "configuration required" message and does NOT
      pretend anything was sent.
   3. Once you set a real email address below, submitting opens the
      visitor's own email application with a prefilled message
      (mailto: fallback). The visitor can review and send it there.

   To receive inquiries by email, set your real address here:
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = {
    /* TODO(owner): replace with the official UNO BUN email address.
       While it contains "example.com" the forms intentionally show a
       "not configured yet" notice instead of opening an email client. */
    inquiryEmail: "info@example.com",

    /* Mail subject prefixes (Arabic / English) */
    subjects: {
      contact:   { ar: "رسالة تواصل — UNO BUN", en: "Contact message — UNO BUN" },
      franchise: { ar: "استفسار فرنشايز — UNO BUN", en: "Franchise inquiry — UNO BUN" }
    },

    isPlaceholder: function () {
      return /example\.com$/i.test(this.inquiryEmail);
    }
  };

  /* --------------------------------------------------------- helpers --- */
  function lang() {
    return document.documentElement.getAttribute("lang") === "en" ? "en" : "ar";
  }

  var MESSAGES = {
    required: {
      ar: "هذا الحقل مطلوب.",
      en: "This field is required."
    },
    email: {
      ar: "يرجى إدخال بريد إلكتروني صحيح.",
      en: "Please enter a valid email address."
    },
    phone: {
      ar: "يرجى إدخال رقم هاتف صحيح.",
      en: "Please enter a valid phone number."
    }
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+()\-.\s\d]{7,20}$/;

  function msg(key) { return MESSAGES[key][lang()]; }

  function setError(input, key) {
    var errorEl = document.getElementById(input.getAttribute("aria-describedby") || "");
    if (key) {
      input.setAttribute("aria-invalid", "true");
      if (errorEl) { errorEl.textContent = msg(key); }
    } else {
      input.removeAttribute("aria-invalid");
      if (errorEl) { errorEl.textContent = ""; }
    }
  }

  function validateField(input) {
    var value = (input.value || "").trim();
    if (input.hasAttribute("required") && !value) {
      setError(input, "required");
      return false;
    }
    if (value && input.getAttribute("type") === "email" && !EMAIL_RE.test(value)) {
      setError(input, "email");
      return false;
    }
    if (value && input.getAttribute("data-validate") === "phone" && !PHONE_RE.test(value)) {
      setError(input, "phone");
      return false;
    }
    setError(input, null);
    return true;
  }

  function clearAllStatuses(form) {
    form.querySelectorAll(".form-status").forEach(function (el) {
      el.hidden = true;
    });
  }

  function showStatus(form, kind) {
    var box = form.querySelector('.form-status[data-status="' + kind + '"]');
    if (box) {
      clearAllStatuses(form);
      box.hidden = false;
      return box;
    }
    return null;
  }

  var FIELD_LABELS = {
    contact: {
      full_name: { ar: "الاسم", en: "Name" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      phone: { ar: "الهاتف", en: "Phone" },
      subject: { ar: "الموضوع", en: "Subject" },
      message: { ar: "الرسالة", en: "Message" }
    },
    franchise: {
      full_name: { ar: "الاسم الكامل", en: "Full name" },
      phone: { ar: "الهاتف", en: "Phone" },
      email: { ar: "البريد الإلكتروني", en: "Email" },
      city: { ar: "المدينة", en: "City" },
      country: { ar: "الدولة", en: "Country" },
      experience: { ar: "الخبرة في الأعمال", en: "Business experience" },
      proposed_location: { ar: "الموقع المقترح", en: "Proposed location" },
      message: { ar: "رسالة إضافية", en: "Message" }
    }
  };

  function buildBody(form, kind) {
    var labels = FIELD_LABELS[kind] || {};
    var lines = [];

    form.querySelectorAll("input[name], select[name], textarea[name]")
      .forEach(function (field) {
        var value = (field.value || "").trim();
        if (!value) { return; }
        var label = labels[field.name];
        var text = label ? label[lang()] : field.name;
        lines.push(text + ": " + value);
      });

    /* Values are URI-encoded by the caller — plain text with line breaks */
    return lines.join("\n");
  }

  /* --------------------------------------------------------- submit ---- */
  function handleSubmit(form) {
    var kind = form.getAttribute("data-form");
    var inputs = form.querySelectorAll("input[name], select[name], textarea[name]");
    var firstInvalid = null;

    inputs.forEach(function (input) {
      if (!validateField(input) && !firstInvalid) { firstInvalid = input; }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    /* Honest static-site behaviour: no data is ever sent by this website. */
    if (CONFIG.isPlaceholder()) {
      showStatus(form, "needs-config");
      return;
    }

    var subject = CONFIG.subjects[kind][lang()];
    var body = buildBody(form, kind);
    var mailto = "mailto:" + CONFIG.inquiryEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    showStatus(form, "mailto-opened");
    /* Open the visitor's email application with the prefilled inquiry */
    window.location.href = mailto;
  }

  /* ---------------------------------------------------------- init ----- */
  function init() {
    var forms = document.querySelectorAll("form[data-form]");

    forms.forEach(function (form) {
      form.setAttribute("novalidate", "novalidate");

      form.querySelectorAll("input[name], select[name], textarea[name]")
        .forEach(function (input) {
          input.addEventListener("blur", function () {
            validateField(input);
          });
          input.addEventListener("input", function () {
            if (input.getAttribute("aria-invalid") === "true") {
              validateField(input);
            }
          });
        });

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        handleSubmit(form);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
