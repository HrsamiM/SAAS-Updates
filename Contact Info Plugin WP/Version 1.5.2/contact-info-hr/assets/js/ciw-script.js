document.addEventListener("DOMContentLoaded", function () {

  // Function to format phone numbers for display
  function formatPhoneDisplay(phone) {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, ''); // remove all non-numeric characters
    if (cleaned.length === 10) {
      // Format (XXX) XXX-XXXX
      return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 8) {
      // Format XXXX-XXXX
      return `${cleaned.slice(0,4)}-${cleaned.slice(4)}`;
    }
    return phone; // other cases, display as-is
  }

  // Function for icon-box widgets
  function updateWidgets(selector, href, text, isPhone = false) {
    const widgets = document.querySelectorAll(selector);
    widgets.forEach(function(widget) {
      const displayText = isPhone ? formatPhoneDisplay(text) : text;

      // Icon
      const icon = widget.querySelector('.elementor-icon-box-icon a.elementor-icon');
      if(icon && href) icon.setAttribute('href', href);

      // Title
      const title = widget.querySelector('.elementor-icon-box-title a');
      if(title && href) title.setAttribute('href', href);

      // Description
      const desc = widget.querySelector('.elementor-icon-box-description');
      if(desc) {
        // Clear previous content
        desc.textContent = '';

        if(href && displayText) {
          const a = document.createElement('a');
          a.setAttribute('href', href);
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');

          // Keep existing classes if they exist <a>
          const existingClass = desc.querySelector('a')?.className;
          if(existingClass) a.className = existingClass;

          a.textContent = displayText;
          desc.appendChild(a);
        }
      }
    });
  }

  // Function for icon-list type lists (<li><a><span>...</span></a></li>)
  function updateListLinks(selector, href, text, isPhone = false) {
    const displayText = isPhone ? formatPhoneDisplay(text) : text;
    const links = document.querySelectorAll(selector);
    links.forEach(function(link) {
      if(href) link.setAttribute('href', href);

      const spanText = link.querySelector('.elementor-icon-list-text');
      if(spanText && displayText) spanText.textContent = displayText;
    });
  }

  // ----------------------------
  // Implement changes
  // ----------------------------

  // Header and icon box
  updateWidgets('.hcallus', contactData.phoneHref, contactData.phone, true);
  updateWidgets('.hmail', contactData.emailHref, contactData.email);
  updateWidgets('.cntnum', contactData.phoneHref, contactData.phone, true);
  updateWidgets('.cntemail', contactData.emailHref, contactData.email);

  // Footer icon-list type lists
  updateListLinks('a.foonum', contactData.phoneHref, contactData.phone, true);
  updateListLinks('a.foomail', contactData.emailHref, contactData.email);

  // Buttons type .btncall
  const botones = document.querySelectorAll(".btncall a.elementor-button-link");
  botones.forEach(function(btn) {
    if(contactData.phoneHref) btn.setAttribute("href", contactData.phoneHref);
  });

});
