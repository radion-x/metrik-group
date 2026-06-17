/**
 * Contact Modal Component — Inbuilt Atelier
 * Premium enquiry form for bespoke joinery & wardrobes
 */
class ContactModal {
    constructor() {
        this.modal = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    createModal() {
        const modalHTML = `
            <div id="contactModal" class="contact-modal" style="display: none;">
                <div class="contact-modal-backdrop"></div>
                <div class="contact-modal-container">
                    <div class="contact-modal-content">
                        <!-- Close Button -->
                        <button class="contact-modal-close" aria-label="Close modal">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <!-- Modal Header -->
                        <div class="contact-modal-header">
                            <span class="contact-modal-eyebrow">Inbuilt Atelier</span>
                            <h2>Begin Your Project</h2>
                            <p>Share your vision and we'll arrange a complimentary design consultation at our Double Bay studio.</p>
                        </div>

                        <!-- Scrollable Form Area -->
                        <div class="contact-modal-body">
                            <form id="modalContactForm" class="contact-modal-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="modal-name">Full Name <span class="required">*</span></label>
                                        <input type="text" id="modal-name" name="name" required placeholder="Your full name">
                                    </div>
                                    <div class="form-group">
                                        <label for="modal-phone">Phone <span class="required">*</span></label>
                                        <input type="tel" id="modal-phone" name="phone" required placeholder="0412 345 678">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="modal-email">Email <span class="required">*</span></label>
                                    <input type="email" id="modal-email" name="email" required placeholder="your@email.com.au">
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="modal-service-interest">Service Interest <span class="required">*</span></label>
                                        <select id="modal-service-interest" name="service-interest" required>
                                            <option value="">Select a service…</option>
                                            <option value="built-in-wardrobes">Built-In Wardrobes</option>
                                            <option value="walk-in-wardrobes">Walk-In Wardrobes</option>
                                            <option value="joinery-cabinetry">Joinery &amp; Cabinetry</option>
                                            <option value="vanities">Vanities &amp; Bathroom</option>
                                            <option value="home-office">Home Office</option>
                                            <option value="tv-units-media">TV Units &amp; Media</option>
                                            <option value="other">Other / Not Sure</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="modal-budget">Budget Range</label>
                                        <select id="modal-budget" name="budget">
                                            <option value="">Approximate budget…</option>
                                            <option value="10k-25k">$10,000 – $25,000</option>
                                            <option value="25k-50k">$25,000 – $50,000</option>
                                            <option value="50k-100k">$50,000 – $100,000</option>
                                            <option value="100k-plus">$100,000+</option>
                                            <option value="unsure">Not sure yet</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="modal-suburb">Suburb</label>
                                    <input type="text" id="modal-suburb" name="suburb" placeholder="e.g. Double Bay, Mosman, Vaucluse">
                                </div>

                                <div class="form-group">
                                    <label for="modal-message">Project Details <span class="required">*</span></label>
                                    <textarea id="modal-message" name="message" required rows="3" placeholder="Tell us about the space, your style preferences, and any specific requirements…"></textarea>
                                </div>

                                <button type="submit" class="contact-modal-submit">
                                    <span>Request Consultation</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>

                                <p class="contact-modal-privacy">By submitting, you agree to our <a href="/privacy-policy/">privacy policy</a>. We'll respond within one business day.</p>

                                <div id="modalFormMessage" class="form-status" style="display: none;"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('contactModal');
    }

    attachEventListeners() {
        const closeBtn = this.modal.querySelector('.contact-modal-close');
        closeBtn.addEventListener('click', () => this.close());

        const backdrop = this.modal.querySelector('.contact-modal-backdrop');
        backdrop.addEventListener('click', () => this.close());

        const modalContent = this.modal.querySelector('.contact-modal-content');
        modalContent.addEventListener('click', (e) => e.stopPropagation());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });

        const form = document.getElementById('modalContactForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupValidation();
    }

    setupValidation() {
        const form = document.getElementById('modalContactForm');
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) this.validateField(input);
            });
        });
    }

    validateField(field) {
        let isValid = true;
        if (field.hasAttribute('required') && !field.value.trim()) isValid = false;
        if (field.type === 'email' && field.value) {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        }
        if (field.type === 'tel' && field.value) {
            isValid = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/.test(field.value.replace(/\s/g, ''));
        }
        field.classList.toggle('error', !isValid);
        return isValid;
    }

    validateForm() {
        const form = document.getElementById('modalContactForm');
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!this.validateField(field)) isValid = false;
        });
        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();
        if (!this.validateForm()) {
            this.showStatus('error', 'Please complete all required fields.');
            return;
        }

        const form = document.getElementById('modalContactForm');
        const data = Object.fromEntries(new FormData(form).entries());

        const submitBtn = form.querySelector('.contact-modal-submit');
        const btnSpan = submitBtn.querySelector('span');
        const originalText = btnSpan.textContent;
        btnSpan.textContent = 'Sending…';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (response.ok) {
                this.showStatus('success', result.message || 'Thank you — we\'ll be in touch within one business day to arrange your consultation.');
                form.reset();
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', { event_category: 'contact', event_label: 'contact_modal' });
                }
                setTimeout(() => this.close(), 3500);
            } else {
                this.showStatus('error', result.error || 'Something went wrong. Please try again or call us on (02) 9100 0728.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('error', 'Network error. Please check your connection and try again.');
        } finally {
            btnSpan.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showStatus(type, message) {
        const statusDiv = document.getElementById('modalFormMessage');
        statusDiv.style.display = 'block';
        statusDiv.className = `form-status ${type}`;
        statusDiv.textContent = message;
        if (type === 'error') {
            setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
        }
    }

    open() {
        this.isOpen = true;
        this.modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        // Reset scroll position of modal body
        const body = this.modal.querySelector('.contact-modal-body');
        if (body) body.scrollTop = 0;
        setTimeout(() => this.modal.classList.add('active'), 10);
    }

    close() {
        this.isOpen = false;
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
            const form = document.getElementById('modalContactForm');
            if (form) form.reset();
            const msg = document.getElementById('modalFormMessage');
            if (msg) msg.style.display = 'none';
        }, 300);
    }
}

// Initialise modal on DOM ready
let contactModalInstance;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { contactModalInstance = new ContactModal(); });
} else {
    contactModalInstance = new ContactModal();
}

// Global function — called by CTA buttons across all pages
function openContactModal() {
    if (contactModalInstance) contactModalInstance.open();
}
