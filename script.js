// ===== Translation System =====
const translations = {
    ar: {
        'welcome-message': 'أهلاً بك في موقع دحمي',
        'welcome-subtitle': 'مرحباً بك في عالم الهاكات والتقنية',
        'enter-site': 'دخول الموقع',
        'site-title': 'موقع دحمي الرسمي',
        'site-description': 'منصتك المتخصصة في عالم الهاكات والتقنية المتقدمة',
        'warning-text': 'إذا في مشكلة في الموقع افتح تكت في سيرفر الديسكورد',
        'join-discord': 'انضم للديسكورد',
        'explore-hacks': 'استكشف الهاكات',
        'home': 'الرئيسية',
        'hacks': 'الهاكات',
        'settings': 'الإعدادات',
        'theme': 'المظهر',
        'language': 'اللغة',
        'dark': 'داكن',
        'light': 'فاتح',
        'hacks-title': 'الهاكات',
        'hacks-subtitle': 'اكتشف أحدث الهاكات والأدوات المتقدمة',
        'android-hacks': 'هاكات الأندرويد',
        'android-description': 'أحدث هاكات الأندرويد المتقدمة والآمنة',
        'new': 'جديد',
        'safe': 'آمن 100%',
        'updated': 'محدث',
        'free': 'مجاني',
        'delta-hack': 'هاك دلتا',
        'latest-version': 'أحدث إصدار',
        'delta-description': 'أحدث إصدار من هاك دلتا للأندرويد مع ميزات متقدمة وأمان عالي',
        'compatibility': 'متوافق مع Android 8+',
        'security': 'آمن ومحدث',
        'file-size': 'حجم الملف: 15 MB',
        'download': 'تحميل',
        'copyright': 'جميع الحقوق محفوظة ل <span class="brand-highlight">دحمي</span>'
    },
    en: {
        'welcome-message': 'Welcome to D7ME Website',
        'welcome-subtitle': 'Welcome to the world of hacks and technology',
        'enter-site': 'Enter Site',
        'site-title': 'D7ME Official Website',
        'site-description': 'Your specialized platform in the world of hacks and advanced technology',
        'warning-text': 'If there is a problem with the site, open a ticket on the Discord server',
        'join-discord': 'Join Discord',
        'explore-hacks': 'Explore Hacks',
        'home': 'Home',
        'hacks': 'Hacks',
        'settings': 'Settings',
        'theme': 'Theme',
        'language': 'Language',
        'dark': 'Dark',
        'light': 'Light',
        'hacks-title': 'Hacks',
        'hacks-subtitle': 'Discover the latest hacks and advanced tools',
        'android-hacks': 'Android Hacks',
        'android-description': 'Latest advanced and secure Android hacks',
        'new': 'New',
        'safe': '100% Safe',
        'updated': 'Updated',
        'free': 'Free',
        'delta-hack': 'Delta Hack',
        'latest-version': 'Latest Version',
        'delta-description': 'Latest version of Delta hack for Android with advanced features and high security',
        'compatibility': 'Compatible with Android 8+',
        'security': 'Safe and Updated',
        'file-size': 'File Size: 15 MB',
        'download': 'Download',
        'copyright': 'All rights reserved to <span class="brand-highlight">D7ME</span>'
    }
};

// ===== Global Variables =====
let currentLanguage = 'ar';
let currentTheme = 'dark';

// ===== DOM Elements =====
const welcomeScreen = document.getElementById('welcome-screen');
const mainSite = document.getElementById('main-site');
const welcomeEnterBtn = document.querySelector('.welcome-enter-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');
const closeSettingsBtn = document.getElementById('close-settings');
const themeOptions = document.querySelectorAll('.theme-option');
const langOptions = document.querySelectorAll('.lang-option');
const navLinks = document.querySelectorAll('.nav-link');
const homeSection = document.getElementById('home');
const hacksSection = document.getElementById('hacks');
const exploreBtn = document.querySelector('.explore-btn');
const hackModal = document.getElementById('hack-modal');
const closeModalBtn = document.querySelector('.close-modal');
const downloadBtn = document.querySelector('.download-btn');

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    initializeAnimations();
});

function initializeApp() {
    // Load saved preferences
    loadSavedPreferences();
    
    // Apply initial theme and language
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
    
    // Show welcome screen
    showWelcomeScreen();
}

function loadSavedPreferences() {
    const savedTheme = localStorage.getItem('d7me-theme');
    const savedLanguage = localStorage.getItem('d7me-language');
    
    if (savedTheme) {
        currentTheme = savedTheme;
    }
    
    if (savedLanguage) {
        currentLanguage = savedLanguage;
    }
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Welcome screen
    if (welcomeEnterBtn) {
        welcomeEnterBtn.addEventListener('click', enterSite);
    }
    
    // Settings
    if (settingsBtn) {
        settingsBtn.addEventListener('click', toggleSettings);
    }
    
    if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', closeSettings);
    }
    
    // Theme switching
    themeOptions.forEach(option => {
        option.addEventListener('click', () => switchTheme(option.dataset.theme));
    });
    
    // Language switching
    langOptions.forEach(option => {
        option.addEventListener('click', () => switchLanguage(option.dataset.lang));
    });
    
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Explore button
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            showSection('hacks');
            updateActiveNavLink('hacks');
        });
    }
    
    // Modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeHackModal);
    }
    
    if (hackModal) {
        hackModal.addEventListener('click', (e) => {
            if (e.target === hackModal) {
                closeHackModal();
            }
        });
    }
    
    // Download button
    if (downloadBtn) {
        downloadBtn.addEventListener('click', handleDownload);
    }
    
    // Close settings when clicking outside
    document.addEventListener('click', (e) => {
        if (settingsPanel && !settingsPanel.contains(e.target) && 
            settingsBtn && !settingsBtn.contains(e.target)) {
            closeSettings();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ===== Welcome Screen Functions =====
function showWelcomeScreen() {
    if (welcomeScreen && mainSite) {
        welcomeScreen.style.display = 'flex';
        mainSite.style.display = 'none';
        
        // Auto-hide after 5 seconds if user doesn't interact
        setTimeout(() => {
            if (!welcomeScreen.classList.contains('hidden')) {
                enterSite();
            }
        }, 5000);
    }
}

function enterSite() {
    if (welcomeScreen && mainSite) {
        welcomeScreen.classList.add('hidden');
        
        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            mainSite.style.display = 'block';
            
            // Trigger entrance animations
            triggerEntranceAnimations();
        }, 500);
    }
}

// ===== Settings Functions =====
function toggleSettings() {
    if (settingsPanel) {
        settingsPanel.classList.toggle('open');
    }
}

function closeSettings() {
    if (settingsPanel) {
        settingsPanel.classList.remove('open');
    }
}

function switchTheme(theme) {
    currentTheme = theme;
    applyTheme(theme);
    updateThemeButtons();
    localStorage.setItem('d7me-theme', theme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme buttons
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === theme);
    });
}

function updateThemeButtons() {
    themeOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.theme === currentTheme);
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    applyLanguage(lang);
    updateLanguageButtons();
    localStorage.setItem('d7me-language', lang);
}

function applyLanguage(lang) {
    // Update document direction
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Update language buttons
    langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === lang);
    });
}

function updateLanguageButtons() {
    langOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.lang === currentLanguage);
    });
}

// ===== Navigation Functions =====
function handleNavigation(e) {
    e.preventDefault();
    const targetSection = e.currentTarget.getAttribute('href').substring(1);
    showSection(targetSection);
    updateActiveNavLink(targetSection);
    
    // Close mobile menu if open
    closeMobileMenu();
}

function showSection(sectionName) {
    // Hide all sections
    if (homeSection) homeSection.style.display = 'none';
    if (hacksSection) hacksSection.style.display = 'none';
    
    // Show target section
    if (sectionName === 'home' && homeSection) {
        homeSection.style.display = 'flex';
    } else if (sectionName === 'hacks' && hacksSection) {
        hacksSection.style.display = 'block';
        // Scroll to top of hacks section
        hacksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateActiveNavLink(activeSection) {
    navLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', href === activeSection);
    });
}

function closeMobileMenu() {
    // Implementation for mobile menu if needed
}

// ===== Hack Modal Functions =====
function showHackDetails() {
    if (hackModal) {
        hackModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeHackModal() {
    if (hackModal) {
        hackModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
}

function handleDownload() {
    // Show download notification
    showNotification('تم بدء التحميل...', 'success');
    
    // Simulate download process
    setTimeout(() => {
        showNotification('تم التحميل بنجاح!', 'success');
    }, 2000);
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 1L13.5 2.5L16.17 5.17L10.58 10.76C10.22 10.54 9.8 10.38 9.35 10.35L8.8 9.8C8.4 9.4 7.8 9.4 7.4 9.8C7 10.2 7 10.8 7.4 11.2L7.95 11.75C7.92 12.2 8.08 12.62 8.3 12.98L2.71 18.57C2.32 18.96 2.32 19.59 2.71 19.98C3.1 20.37 3.73 20.37 4.12 19.98L9.71 14.39C10.07 14.61 10.49 14.77 10.94 14.8L11.49 15.35C11.89 15.75 12.49 15.75 12.89 15.35C13.29 14.95 13.29 14.35 12.89 13.95L12.34 13.4C12.37 12.95 12.21 12.53 11.99 12.17L17.58 6.58L20.25 9.25L21.75 7.75L22 9H21M12.5 11C12.78 11 13 11.22 13 11.5S12.78 12 12.5 12 12 11.78 12 11.5 12.22 11 12.5 11Z"/>
            </svg>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        max-width: 300px;
        color: var(--text-primary);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== Animation Functions =====
function initializeAnimations() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize GSAP animations
    if (typeof gsap !== 'undefined') {
        setupGSAPAnimations();
    }
}

function setupGSAPAnimations() {
    // Hero icon floating animation
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        gsap.to(heroIcon, {
            y: -10,
            duration: 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });
    }
    
    // Welcome logo pulse animation
    const welcomeLogo = document.querySelector('.welcome-logo');
    if (welcomeLogo) {
        gsap.to(welcomeLogo, {
            scale: 1.05,
            duration: 1.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });
    }
}

function triggerEntranceAnimations() {
    if (typeof gsap !== 'undefined') {
        // Animate navigation
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            gsap.from(navbar, {
                y: -100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
        
        // Animate hero content
        const heroContentElements = document.querySelectorAll('.hero-content > *');
        if (heroContentElements.length > 0) {
            gsap.from(heroContentElements, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.3
            });
        }
    }
}

// ===== Keyboard Shortcuts =====
function handleKeyboardShortcuts(e) {
    // Escape key to close modals/panels
    if (e.key === 'Escape') {
        closeHackModal();
        closeSettings();
    }
    
    // Ctrl/Cmd + K to open settings
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleSettings();
    }
    
    // Number keys for navigation
    if (e.key === '1') {
        showSection('home');
        updateActiveNavLink('home');
    } else if (e.key === '2') {
        showSection('hacks');
        updateActiveNavLink('hacks');
    }
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Performance Optimizations =====
// Lazy load images when they come into view
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===== Error Handling =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could send error to analytics service here
});

// ===== Service Worker Registration =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// ===== Export functions for global access =====
window.D7ME = {
    showHackDetails,
    closeHackModal,
    showNotification,
    switchTheme,
    switchLanguage,
    showSection
};

