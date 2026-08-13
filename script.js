// --- Theme Toggle Logic (Light / Luxury Dark) ---
(function () {
    const themeKey = 'bayan_site_theme';
    const savedTheme = localStorage.getItem(themeKey);
    // افتراضياً: إذا لم يكن المستخدم اختار الوضع الداكن صراحة، يتم تفعيل الوضع الفاتح
    if (savedTheme !== 'dark') {
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
(function () {
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

if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.contains('open') || navLinks.classList.contains('active');
        if (isOpen) {
            navLinks.classList.remove('open', 'active');
        } else {
            navLinks.classList.add('open', 'active');
        }
        
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if ((navLinks.classList.contains('open') || navLinks.classList.contains('active')) && !navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
            navLinks.classList.remove('open', 'active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    });

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open', 'active');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
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

if (modal && modalImg && closeBtn) {
    document.querySelectorAll('.screen-card img').forEach(img => {
        img.addEventListener("click", function () {
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

// --- نظام التسجيل والتحميل الذكي (Smart Registration System) ---
document.addEventListener("DOMContentLoaded", function () {
    const downloadModal = document.getElementById("downloadModal");
    const closeDownloadBtn = document.querySelector(".close-download-modal");
    const downloadButtons = document.querySelectorAll(".download-btn");

    function showWelcomeToast(userName) {
        let toast = document.getElementById("welcomeToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "welcomeToast";
            toast.style.cssText = `
                position: fixed;
                top: 25px;
                left: 50%;
                transform: translateX(-50%) translateY(-120px);
                background: linear-gradient(145deg, rgba(30, 27, 46, 0.96), rgba(15, 23, 42, 0.98));
                border: 1.5px solid rgba(251, 191, 36, 0.6);
                color: #ffffff;
                padding: 16px 26px;
                border-radius: 20px;
                font-family: 'Cairo', sans-serif;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(251, 191, 36, 0.35);
                z-index: 999999;
                transition: transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease;
                display: flex;
                align-items: center;
                gap: 14px;
                direction: rtl;
                max-width: 90%;
                width: max-content;
                box-sizing: border-box;
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
            `;
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <div style="width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, rgba(16,185,129,0.3), rgba(251,191,36,0.3)); border: 1px solid #fbbf24; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0;">
                👋
            </div>
            <div style="text-align: right; line-height: 1.3;">
                <div style="font-size: 1rem; font-weight: 900; color: #fbbf24;">مرحباً بك مجدداً يا ${userName}!</div>
                <div style="font-size: 0.82rem; color: #cbd5e1; font-weight: 700; margin-top: 2px;">جاري بدء تحميل نسختك المستقرة مباشرة... 💻🚀</div>
            </div>
        `;
        toast.style.opacity = "1";
        requestAnimationFrame(() => {
            toast.style.transform = "translateX(-50%) translateY(0)";
        });
        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(-120px)";
            toast.style.opacity = "0";
        }, 4500);
    }

    if (downloadModal) {
        downloadButtons.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const platform = btn.getAttribute("data-platform");

                if (platform === 'android') {
                    showAndroidUnavailable();
                    return;
                }

                window.currentSelectedPlatform = platform || 'windows';

                // فحص الذكاء التلقائي: هل قام المستخدم بالتسجيل سابقاً على هذا الجهاز؟
                const existingLeads = JSON.parse(localStorage.getItem("bayan_web_leads") || "[]");
                if (existingLeads.length > 0) {
                    const lastLead = existingLeads[existingLeads.length - 1];
                    const userName = lastLead.name ? lastLead.name.split(' ')[0] : 'عزيزي العميل';
                    
                    // إشهار رسالة ترحيبية فورية وبدء التحميل المباشر دون فتح النافذة مجدداً
                    showWelcomeToast(userName);
                    startDownload(e, window.currentSelectedPlatform);
                    return;
                }

                // للمستخدمين الجدد فقط لأول مرة: فتح النافذة المنبثقة الفخمة
                if (document.getElementById("registrationForm")) {
                    document.getElementById("registrationForm").reset();
                }
                downloadModal.style.display = "flex";
            });
        });

        if (closeDownloadBtn) {
            closeDownloadBtn.addEventListener("click", () => {
                downloadModal.style.display = "none";
            });
        }

        window.addEventListener("click", (e) => {
            if (e.target === downloadModal) {
                downloadModal.style.display = "none";
            }
        });
    }
});

// معالجة إرسال النموذج والتحميل لأول مرة
window.handleRegistrationSubmit = function (event) {
    event.preventDefault();

    const submitBtn = document.getElementById("submitDownloadBtn");
    const name = document.getElementById("regName").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const businessType = document.getElementById("regBusinessType").value;

    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(phone)) {
        alert("⚠️ يرجى إدخال رقم هاتف صحيح مكون من 11 رقماً (مثال: 01012345678).");
        return;
    }

    if (!businessType) {
        alert("⚠️ يرجى اختيار نوع النشاط التجاري من القائمة.");
        return;
    }

    const selectedPlat = window.currentSelectedPlatform || 'windows';

    const leadData = {
        name,
        phone,
        businessType,
        platform: selectedPlat === 'android' ? 'نسخة الأندرويد' : 'نسخة الويندوز',
        timestamp: new Date().toISOString()
    };

    console.log("📝 تم تسجيل عميل جديد وسيتذكر النظام دخوله:", leadData);

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>جاري التسجيل والتحميل...</span>`;
    }

    // 1. حفظ البيانات محلياً للذاكرة الذكية
    const existingLeads = JSON.parse(localStorage.getItem("bayan_web_leads") || "[]");
    existingLeads.push(leadData);
    localStorage.setItem("bayan_web_leads", JSON.stringify(existingLeads));

    // 2. إرسال البيانات إلى Google Sheets في الخلفية
    const payload = {
        name: name,
        phone: phone,
        activity: businessType,
        platform: leadData.platform
    };

    fetch("https://script.google.com/macros/s/AKfycbz3BKpeOScHFRH_5r1T7xscjLCtGBiaFORV4ap9xpIecU2MuFUwNBN67DvEFScH1LnScQ/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(payload)
    }).catch(err => console.error("Error sending to Google Sheets:", err))
    .finally(() => {
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-down" style="font-size: 1.2rem;"></i> <span>تأكيد وتحميل البرنامج الآن</span>`;
            }
        }, 2000);
    });

    // 3. إغلاق النافذة وبدء تنزيل الملف فوراً
    const downloadModal = document.getElementById("downloadModal");
    if (downloadModal) {
        downloadModal.style.display = "none";
    }
    startDownload(event, selectedPlat);
};

// بدء التحميل حسب المنصة
window.startDownload = function (event, platform) {
    if (event && event.preventDefault) event.preventDefault();
    const plat = platform || window.currentSelectedPlatform || 'windows';

    if (plat === 'windows') {
        // Google Analytics: تسجيل حدث تحميل الويندوز
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_windows', {
                'event_category': 'Download',
                'event_label': 'Windows EXE v1.0.6'
            });
        }
        
        // استخدام حرف v صغير v1.0.6 المطابق لوسم GitHub المعتمد
        const downloadUrl = "https://github.com/ehabamr062-ux/Bayan-Pos-System/releases/download/v1.0.6/Bayan.POS.Setup.1.0.6.exe";

        // تنزيل الملف المباشر فوراً لمنع أي صفحة 404 جديدة
        window.location.href = downloadUrl;

        if (downloadModal) downloadModal.style.display = "none";
    } else if (plat === 'android') {
        // Google Analytics: تسجيل حدث تحميل الأندرويد
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download_android', {
                'event_category': 'Download',
                'event_label': 'Android Beta Web App'
            });
        }
        if (downloadModal) downloadModal.style.display = "none";
        showAndroidUnavailable();
    }
};

// --- Preloader & Scroll Reveal Animations ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Preloader logic — hide after logo loads, don't wait for all page images
    const preloader = document.getElementById('preloader');
    if (preloader) {
        const logoImg = preloader.querySelector('img');

        const hidePreloader = () => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        };

        if (logoImg) {
            if (logoImg.complete) {
                // Logo already cached — hide immediately after short animation
                setTimeout(hidePreloader, 300);
            } else {
                // Wait only for logo to load, not the whole page
                logoImg.addEventListener('load', () => setTimeout(hidePreloader, 300));
                // Safety fallback: hide after 2.5s max regardless
                setTimeout(hidePreloader, 2500);
            }
        } else {
            setTimeout(hidePreloader, 300);
        }
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

// --- Reviews Section Logic ---
document.addEventListener("DOMContentLoaded", () => {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;

    // الرابط اللي هيجيب منه الآراء (هيتم تغييره برابط Google Apps Script أو السيرفر الخاص بك)
    const REVIEWS_API_URL = "YOUR_SERVER_API_URL_HERE";

    function renderReviews(reviews) {
        reviewsContainer.innerHTML = ''; // تفريغ رسالة التحميل

        if (!reviews || reviews.length === 0) {
            reviewsContainer.innerHTML = `
                <div style="text-align: center; grid-column: 1 / -1; color: var(--text-gray); padding: 40px;">
                    <p>لا توجد آراء مسجلة حالياً. سيتم إضافتها قريباً.</p>
                </div>
            `;
            return;
        }

        reviews.forEach(review => {
            const initial = review.name.charAt(0);
            const stars = Array(5).fill(0).map((_, i) =>
                `<i class="fa-solid fa-star" style="color: ${i < review.rating ? '#fbbf24' : '#475569'}"></i>`
            ).join('');

            const card = document.createElement('div');
            card.className = 'review-card reveal-up';
            card.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-avatar">${initial}</div>
                    <div class="reviewer-info">
                        <h4>${review.name}</h4>
                        <div style="font-size: 0.85rem; color: var(--accent-color); margin-bottom: 5px;">${review.business}</div>
                        <div class="rating">${stars}</div>
                    </div>
                </div>
                <div class="review-text">${review.comment}</div>
            `;
            reviewsContainer.appendChild(card);
        });

        // Trigger intersection observer for new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.review-card').forEach(el => observer.observe(el));
    }

    // محاولة جلب البيانات من السيرفر
    fetch(REVIEWS_API_URL)
        .then(response => {
            if (!response.ok) throw new Error("API not ready");
            return response.json();
        })
        .then(data => {
            renderReviews(data);
        })
        .catch(err => {
            console.log("الرابط غير متصل بعد أو لا يوجد بيانات.", err);
            // إظهار رسالة عدم وجود بيانات في حالة عدم اتصال الرابط
            renderReviews([]);
        });
});

// --- Scroll To Top Logic ---
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// --- Roadmap Timeline Accordion (Collapsible) ---
function toggleTimelineItem(headerEl) {
    const item = headerEl.closest('.collapsible-timeline');
    if (!item) return;
    item.classList.toggle('open');
}

// --- Android Unavailable Modal ---
function showAndroidUnavailable() {
    const modal = document.getElementById('androidUnavailableModal');
    if (modal) modal.style.display = 'flex';
}
document.addEventListener('click', (e) => {
    const modal = document.getElementById('androidUnavailableModal');
    if (modal && e.target === modal) modal.style.display = 'none';
});

