// Menu mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNavList = document.querySelector('.main-nav__list');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNavList.classList.toggle('active');
    });
}

// Fermer le menu mobile en cliquant sur un élément
document.querySelectorAll('.main-nav__link').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNavList.classList.contains('active')) {
            mainNavList.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Scroll smooth pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au défilement
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .section-title, .hero__content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

// Observer les sections pour les animations
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .section-title, .hero__content').forEach(el => {
        observer.observe(el);
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
}

// Gestion des boutons de démo
const demoButtons = document.querySelectorAll('.demo-button, .demo-request');
demoButtons.forEach(button => {
    button.addEventListener('click', function() {
        openDemoModal();
    });
});

// Modal de démo
function openDemoModal() {
    // Créer la modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <button class="modal__close">&times;</button>
            <h2>Demande de démonstration</h2>
            <form id="demo-form" class="form">
                <div class="form__group">
                    <label for="name">Nom complet</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form__group">
                    <label for="email">Email professionnel</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form__group">
                    <label for="company">Entreprise</label>
                    <input type="text" id="company" name="company" required>
                </div>
                <div class="form__group">
                    <label for="message">Message (optionnel)</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>
                <button type="submit" class="btn btn--primary">Envoyer ma demande</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Empêcher le défilement de la page
    document.body.style.overflow = 'hidden';
    
    // Animation d'entrée
    setTimeout(() => {
        modal.classList.add('modal--active');
    }, 10);
    
    // Fermer la modal
    const closeBtn = modal.querySelector('.modal__close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fermer en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Gérer la soumission du formulaire
    const form = document.getElementById('demo-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simuler l'envoi du formulaire
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            closeModal();
            showNotification('Votre demande a été envoyée avec succès ! Notre équipe vous contactera sous 24h.');
        }, 1500);
    });
    
    function closeModal() {
        modal.classList.remove('modal--active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Bouton contact
document.querySelector('.contact-us').addEventListener('click', function() {
    // Créer une modal de contact ou rediriger vers une page de contact
    showNotification('Redirection vers la page de contact');
});

// Afficher une notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('notification--active');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('notification--active');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Ajouter les styles pour le modal et les notifications
const dynamicStyles = document.createElement('style');
dynamicStyles.innerHTML = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal--active {
        opacity: 1;
    }
    
    .modal__content {
        background-color: var(--dark-bg);
        border-radius: var(--border-radius);
        padding: var(--spacing-md);
        width: 100%;
        max-width: 500px;
        transform: translateY(20px);
        transition: transform 0.3s ease;
        position: relative;
    }
    
    .modal--active .modal__content {
        transform: translateY(0);
    }
    
    .modal__close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--light-text);
        cursor: pointer;
    }
    
    .form {
        margin-top: var(--spacing-md);
    }
    
    .form__group {
        margin-bottom: var(--spacing-md);
    }
    
    .form__group label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-weight: 600;
    }
    
    .form__group input,
    .form__group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: var(--border-radius);
        color: var(--light-text);
        font-family: inherit;
    }
    
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: var(--primary-color);
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .notification--active {
        transform: translateY(0);
        opacity: 1;
    }
    
    /* Animation des éléments */
    .feature-card, .section-title, .hero__content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.visible, .section-title.visible, .hero__content.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(dynamicStyles);

