// --- Theme Toggle Logic (Light / Luxury Dark) ---
(function() {
    const themeKey = 'bayan_site_theme';
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeKey = 'bayan_site_theme';
    
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        const updateIcon = () => {
            if (document.body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        };

        updateIcon();

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem(themeKey, 'light');
            } else {
                localStorage.setItem(themeKey, 'dark');
            }
            updateIcon();
        });
    }
});

// --- Cache Busting / Auto Update Version Check ---
(function() {
    const versionKey = 'bayan_site_version';
    const checkVersion = async () => {
        try {
            const response = await fetch(`version.json?t=${Date.now()}`);
            if (response.ok) {
                const data = await response.json();
                const latestVersion = data.version;
                const currentVersion = localStorage.getItem(versionKey);

                if (latestVersion && latestVersion !== currentVersion) {
                    localStorage.setItem(versionKey, latestVersion);
                    window.location.reload(true);
                }
            }
        } catch (error) {
            console.error('Error checking site version:', error);
        }
    };
    if (document.readyState === 'complete') {
        checkVersion();
    } else {
        window.addEventListener('load', checkVersion);
    }
})();

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if(mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });
}

// Scroll to top on page load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Toggle the clicked FAQ
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Navbar background blur on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Image Modal (Lightbox)
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("expandedImg");
const closeBtn = document.getElementsByClassName("close-modal")[0];

if(modal && modalImg && closeBtn) {
    document.querySelectorAll('.screen-card img').forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

// --- نظام التسجيل قبل التحميل (Registration Modal Logic) ---
const downloadModal = document.getElementById("downloadModal");
const closeDownloadBtn = document.querySelector(".close-download-modal");
const downloadButtons = document.querySelectorAll(".download-btn");
const registrationForm = document.getElementById("registrationForm");
let targetDownloadUrl = "";

if (downloadModal && closeDownloadBtn) {
    // اعتراض ضغطة زر التحميل لعرض النموذج أولاً
    downloadButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault(); // منع التحميل المباشر المؤقت
            targetDownloadUrl = btn.getAttribute("href");
            downloadModal.style.display = "flex"; // عرض النافذة
        });
    });

    // إغلاق النافذة
    closeDownloadBtn.addEventListener("click", () => {
        downloadModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === downloadModal) {
            downloadModal.style.display = "none";
        }
    });
}

// معالجة إرسال النموذج والتحميل
window.handleRegistrationSubmit = function(event) {
    event.preventDefault();
    
    const name = document.getElementById("regName").value;
    const phone = document.getElementById("regPhone").value;
    const businessType = document.getElementById("regBusinessType").value;

    const leadData = {
        name,
        phone,
        businessType,
        timestamp: new Date().toISOString()
    };

    console.log("📝 تم تسجيل عميل جديد:", leadData);

    // 1. حفظ البيانات محلياً في المتصفح كنسخة احتياطية آمنة
    const existingLeads = JSON.parse(localStorage.getItem("bayan_web_leads") || "[]");
    existingLeads.push(leadData);
    localStorage.setItem("bayan_web_leads", JSON.stringify(existingLeads));

    // 2. إغلاق نافذة التسجيل وإعادة تهيئة النموذج
    downloadModal.style.display = "none";
    registrationForm.reset();

    // 3. فتح رابط التحميل المباشر في علامة تبويب جديدة لبدء التنزيل فوراً
    if (targetDownloadUrl) {
        window.open(targetDownloadUrl, "_blank");
    }

    // 4. عرض رسالة شكر وتوجيه للمستخدم
    alert("✅ شكراً لك! تم تسجيل بياناتك بنجاح، وسيبدأ تحميل برنامج بيان الآن تلقائياً... 🚀");
};

// --- Preloader & Scroll Reveal Animations ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }, 600); // Slight delay for smooth logo pulse effect
        });
    }

    // 2. Add 'reveal-up' class to all main sections dynamically
    const elementsToReveal = document.querySelectorAll('.feature-card, .price-card, .screen-card, .faq-item, .section-title, .timeline-item, .hero-content, .cta-content');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-up');
    });

    // 3. IntersectionObserver logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => {
        revealObserver.observe(el);
    });
});
