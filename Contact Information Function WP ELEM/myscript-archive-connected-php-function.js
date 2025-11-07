document.addEventListener("DOMContentLoaded", function () {
  // BTN Type .btncall
  const botones = document.querySelectorAll(".btncall a.elementor-button-link");
  botones.forEach(function (boton) {
    if (contactData.phoneHref) {
      boton.setAttribute("href", contactData.phoneHref);
    }
  });

  // Changed all <a> inside of .hcallus
  const headerPhone = document.querySelector('.hcallus');
  if (headerPhone) {
    const phoneLinks = headerPhone.querySelectorAll('a');
    phoneLinks.forEach(function (link) {
      link.setAttribute('href', contactData.phoneHref);
    });

    const desc = headerPhone.querySelector('.elementor-icon-box-description');
    if (desc) {
      desc.innerHTML = `<a href="${contactData.phoneHref}" style="color: #fff" target="_blank" rel="noopener noreferrer">${contactData.phone}</a>`;
    }
  }

  // Changed all <a> inside of .hmail
  const headerEmail = document.querySelector('.hmail');
  if (headerEmail) {
    const emailLinks = headerEmail.querySelectorAll('a');
    emailLinks.forEach(function (link) {
      link.setAttribute('href', contactData.emailHref);
    });

    const desc = headerEmail.querySelector('.elementor-icon-box-description');
    if (desc) {
      desc.innerHTML = `<a href="${contactData.emailHref}" style="color: #fff" target="_blank" rel="noopener noreferrer">${contactData.email}</a>`;
    }
  }

  // Footer phone widgets (.foonum): insert <a> inside of .elementor-icon-box-content
  const footerPhones = document.querySelectorAll('.foonum');
  footerPhones.forEach(function (widget) {
    const content = widget.querySelector('.elementor-icon-box-content');
    if (content) {
      content.innerHTML = `<a href="${contactData.phoneHref}" class="textcolor fooinfotex" target="_blank" rel="noopener noreferrer">${contactData.phone}</a>`;
    }

    const iconLink = widget.querySelector('a.elementor-icon');
    if (iconLink) {
      iconLink.setAttribute('href', contactData.phoneHref);
    }
  });

  // Footer email widgets (.foomail): insert <a> inside of .elementor-icon-box-content
  const footerEmails = document.querySelectorAll('.foomail');
  footerEmails.forEach(function (widget) {
    const content = widget.querySelector('.elementor-icon-box-content');
    if (content) {
      content.innerHTML = `<a href="${contactData.emailHref}" class="textcolor fooinfotex" target="_blank" rel="noopener noreferrer">${contactData.email}</a>`;
    }

    const iconLink = widget.querySelector('a.elementor-icon');
    if (iconLink) {
      iconLink.setAttribute('href', contactData.emailHref);
    }
  });
});

// Contact page widget (.cntemail)
const contactEmails = document.querySelectorAll('.cntemail');
contactEmails.forEach(function (widget) {
  // Add Link in icon
  const iconLink = widget.querySelector('.elementor-icon-box-icon a.elementor-icon');
  if (iconLink) {
    iconLink.setAttribute('href', contactData.emailHref);
  }

  //Add link in title
  contactEmails.forEach(function (widget) {
  const titleLink = widget.querySelector('.elementor-icon-box-title a');
  if (titleLink) {
    titleLink.setAttribute('href', contactData.emailHref);
  }
});

  // Update Link and text in description data from the widget
  const description = widget.querySelector('.elementor-icon-box-description');
  if (description) {
    const existingClasses = description.querySelector('a')?.className || '';
    description.innerHTML = `<a href="${contactData.emailHref}" class="${existingClasses}" target="_blank" rel="noopener noreferrer">${contactData.email}</a>`;
  }
});

// Contact page widget (.cntnum)
const contactPhones = document.querySelectorAll('.cntnum');
contactPhones.forEach(function (widget) {

  // Add Link in icon
  const iconLink = widget.querySelector('.elementor-icon-box-icon a.elementor-icon');
  if (iconLink) {
    iconLink.setAttribute('href', contactData.phoneHref);
  }

  //Add link in title
  contactPhones.forEach(function (widget) {
  const titleLink = widget.querySelector('.elementor-icon-box-title a');
  if (titleLink) {
    titleLink.setAttribute('href', contactData.phoneHref);
  }
});

  // Update Link and text in description data from the widget
  const description = widget.querySelector('.elementor-icon-box-description');
  if (description) {
    const existingClasses = description.querySelector('a')?.className || '';
    description.innerHTML = `<a href="${contactData.phoneHref}" class="${existingClasses}" target="_blank" rel="noopener noreferrer">${contactData.phone}</a>`;
  }
});