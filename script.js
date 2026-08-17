// JavaScript Logic for Forever Yokoso Educational Services Website

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Drawer Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        mobileDrawer.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileDrawer.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // 2. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle current if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Header Shadow & Active Section Tracker on Scroll
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.05)';
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

// Direct Form to WhatsApp Redirect Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const mobileNum = document.getElementById('mobileNum').value.trim();
    const emailAddr = document.getElementById('emailAddr').value.trim();
    const educationLevel = document.getElementById('educationLevel').value;
    const jlptStatus = document.getElementById('jlptStatus').value;
    const userMessage = document.getElementById('userMessage').value.trim();

    if (!fullName || !mobileNum || !educationLevel) {
        alert('Please fill out all required fields (*)');
        return false;
    }

    let messageText = `*Inquiry from Forever Yokoso Website*\n\n`;
    messageText += `*Name:* ${fullName}\n`;
    messageText += `*Mobile:* ${mobileNum}\n`;
    if (emailAddr) messageText += `*Email:* ${emailAddr}\n`;
    messageText += `*Current Education:* ${educationLevel}\n`;
    if (jlptStatus) messageText += `*Japanese Level:* ${jlptStatus}\n`;
    if (userMessage) messageText += `*Message:* ${userMessage}\n`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/9779845370124?text=${encodedText}`;

    // Redirect directly to WhatsApp
    window.open(whatsappUrl, '_blank');
    document.getElementById('consultationForm').reset();
    return false;
}
