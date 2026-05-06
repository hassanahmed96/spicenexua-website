// ========================================================================
// SPICE NEXUS - INTERACTIVE FUNCTIONALITY
// ========================================================================

// ========================================================================
// VERSION MANAGEMENT & MODAL
// ========================================================================
const versionModal = document.getElementById('versionModal');
const versionBtn = document.getElementById('versionBtn');
const closeVersionBtn = document.getElementById('closeVersionBtn');
const appVersionElement = document.getElementById('appVersion');
const manualVersionElement = document.getElementById('manualVersion');

// Version configuration - UPDATE THESE VALUES AS NEEDED
const versionConfig = {
    appVersion: '0.1.0',
    manualVersion: '1.0.0',
    lastUpdated: 'May 4, 2026'
};

/**
 * Initialize version information
 */
function initializeVersionInfo() {
    appVersionElement.textContent = versionConfig.appVersion;
    manualVersionElement.textContent = versionConfig.manualVersion;
    document.getElementById('lastUpdated').textContent = versionConfig.lastUpdated;
    versionBtn.textContent = `v${versionConfig.appVersion}`;
}

/**
 * Update version configuration dynamically
 * @param {Object} newConfig - New version configuration
 */
function updateVersionConfig(newConfig) {
    Object.assign(versionConfig, newConfig);
    initializeVersionInfo();
}

/**
 * Open version modal
 */
function openVersionModal() {
    versionModal.style.display = 'block';
}

/**
 * Close version modal
 */
function closeVersionModal() {
    versionModal.style.display = 'none';
}

// Modal event listeners
versionBtn.addEventListener('click', openVersionModal);
closeVersionBtn.addEventListener('click', closeVersionModal);

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === versionModal) {
        closeVersionModal();
    }
});

// ========================================================================
// DOWNLOAD FUNCTIONALITY
// ========================================================================

/**
 * Handle download action for different platforms
 * @param {string} platform - Platform identifier (windows, macos, linux)
 */
function downloadApp(platform) {
    const downloads = {
        windows: {
            name: 'SpiceNexus-0.1.0-Windows.exe',
            url: '#download-windows',
            description: 'Windows Installer'
        },
        macos: {
            name: 'SpiceNexus-0.1.0-macOS.dmg',
            url: '#download-macos',
            description: 'macOS Disk Image'
        },
        linux: {
            name: 'SpiceNexus-0.1.0-Linux.tar.gz',
            url: '#download-linux',
            description: 'Linux Archive'
        }
    };

    const download = downloads[platform];
    
    if (download) {
        // Simulate download trigger
        const link = document.createElement('a');
        link.href = download.url;
        link.download = download.name;
        
        // Show success notification
        showNotification(
            `Preparing download: ${download.description}`,
            'success'
        );
        
        // Log for debugging
        console.log(`Download initiated: ${download.name}`);
        
        // In production, replace the URL with actual download link
        // window.location.href = download.url;
    }
}

// ========================================================================
// BUTTON EVENT HANDLERS
// ========================================================================

const downloadBtn = document.getElementById('downloadBtn');
const docsBtn = document.getElementById('docsBtn');
const docsBtnFooter = document.getElementById('docsBtnFooter');

/**
 * Download button click handler
 */
downloadBtn.addEventListener('click', () => {
    // Scroll to downloads section
    const downloadsSection = document.querySelector('.downloads');
    if (downloadsSection) {
        downloadsSection.scrollIntoView({ behavior: 'smooth' });
    }
});

/**
 * Documentation button click handlers
 */
function handleDocumentationClick() {
    showNotification('Opening PDF manual...', 'info');
    
    // Replace with actual PDF URL
    // Example: window.open('path/to/SpiceNexus-Manual.pdf', '_blank');
    
    console.log('Documentation link clicked');
}

docsBtn.addEventListener('click', handleDocumentationClick);
docsBtnFooter.addEventListener('click', handleDocumentationClick);

// ========================================================================
// NOTIFICATION SYSTEM
// ========================================================================

/**
 * Display a notification message
 * @param {string} message - Notification message
 * @param {string} type - Notification type (info, success, error, warning)
 * @param {number} duration - Duration in milliseconds (default: 3000)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Define notification colors
    const colors = {
        'success': {
            bg: 'rgba(57, 255, 20, 0.2)',
            border: 'rgb(57, 255, 20)',
            icon: '✓'
        },
        'error': {
            bg: 'rgba(255, 67, 54, 0.2)',
            border: 'rgb(255, 67, 54)',
            icon: '✕'
        },
        'warning': {
            bg: 'rgba(251, 188, 5, 0.2)',
            border: 'rgb(251, 188, 5)',
            icon: '⚠'
        },
        'info': {
            bg: 'rgba(57, 150, 255, 0.2)',
            border: 'rgb(57, 150, 255)',
            icon: 'ⓘ'
        }
    };

    const style = colors[type] || colors['info'];

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.setAttribute('role', 'alert');
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${style.bg};
        border: 2px solid ${style.border};
        color: #fff;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 0 20px ${style.border}33;
        font-weight: 500;
        max-width: 400px;
        word-wrap: break-word;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    
    notification.innerHTML = `
        <span style="margin-right: 10px; font-weight: bold;">${style.icon}</span>
        ${message}
    `;
    
    document.body.appendChild(notification);

    // Auto-remove after specified duration
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// ========================================================================
// PAGE INTERACTIONS & POLISH
// ========================================================================

/**
 * Initialize smooth scroll for anchor links
 */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for modal triggers
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add stagger animation to cards on scroll
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards and download cards
    document.querySelectorAll('.feature-card, .download-card').forEach(card => {
        observer.observe(card);
    });
}

/**
 * Initialize keyboard shortcuts
 */
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close modal
        if (e.key === 'Escape' && versionModal.style.display === 'block') {
            closeVersionModal();
        }
        
        // Ctrl/Cmd + D to show downloads
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const downloadsSection = document.querySelector('.downloads');
            if (downloadsSection) {
                downloadsSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ========================================================================
// ANIMATION STYLES - INJECTED INTO DOM
// ========================================================================

/**
 * Inject animation styles into the document
 */
function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================================================
// PERFORMANCE MONITORING (Optional)
// ========================================================================

/**
 * Log page performance metrics
 */
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const navigation = window.performance.navigation;
        
        // Calculate load times
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;
        const renderTime = timing.domComplete - timing.domLoading;
        
        console.group('📊 SpiceNexus Performance Metrics');
        console.log(`Page Load Time: ${pageLoadTime}ms`);
        console.log(`Connect Time: ${connectTime}ms`);
        console.log(`Render Time: ${renderTime}ms`);
        console.log(`Navigation Type: ${navigation.type}`);
        console.groupEnd();
    }
}

// ========================================================================
// INITIALIZATION
// ========================================================================

/**
 * Initialize all page functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🟢 SpiceNexus Initialized', 'color: #39FF14; font-size: 20px; font-weight: bold;');
    console.log('%cThe Modern IDE for Analog & Mixed-Signal IC Design', 'color: #39FF14; font-size: 14px;');
    
    // Initialize all systems
    initializeVersionInfo();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeKeyboardShortcuts();
    injectAnimationStyles();
    
    // Log performance metrics (optional)
    if (window.location.search.includes('debug')) {
        logPerformanceMetrics();
    }
});

// ========================================================================
// WINDOW LOAD EVENT - Final polish
// ========================================================================

window.addEventListener('load', () => {
    // Add fade-in animation to body after all resources loaded
    document.body.style.opacity = '1';
});

// ========================================================================
// EXPORT FOR EXTERNAL USE (Optional)
// ========================================================================

// Make functions available globally if needed
window.SpiceNexus = {
    downloadApp,
    showNotification,
    updateVersionConfig,
    openVersionModal,
    closeVersionModal
};
