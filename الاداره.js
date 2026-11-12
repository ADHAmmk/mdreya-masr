

(function applyAdminChanges() {
    // Apply text content changes
    document.addEventListener('DOMContentLoaded', () => {
        try {
            const content = JSON.parse(localStorage.getItem('admin_content') || '{}');
            if (content.heroTitle === 'دليل إدارات الدقهلية' || content.heroTitle === 'دليلك التعليمي') {
                content.heroTitle = 'دَلِيلَكَ التَّعْلِيمِيّ';
            }

            // Helper
            const setText = (selector, value, attr) => {
                if (!value) return;
                const el = document.querySelector(selector);
                if (!el) return;
                if (attr) el.setAttribute(attr, value);
                else el.textContent = value;
            };

            const setHtml = (selector, value) => {
                if (!value) return;
                const el = document.querySelector(selector);
                if (el) el.innerHTML = value;
            };

            if (content.noticeText) setText('.notice-text', content.noticeText);
            if (content.noticeBadgeText) {
                const badge = document.querySelector('.notice-badge');
                if (badge) badge.innerHTML = `<i class="fa-solid fa-bullhorn"></i> ${content.noticeBadgeText}`;
            }
            if (content.workHours) {
                const wh = document.querySelector('.top-bar-links a:first-child');
                if (wh) wh.innerHTML = `<i class="fa-solid fa-clock"></i> مواعيد العمل: ${content.workHours}`;
            }
            if (content.locationText) {
                const loc = document.querySelector('.top-bar-links a:last-child');
                if (loc) loc.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${content.locationText}`;
            }
            if (content.heroPill) setText('.hero-pill', content.heroPill);
            if (content.heroTitle || content.heroTitleSpan) {
                const titleEl = document.querySelector('.hero-title');
                if (titleEl) {
                    const t = content.heroTitle || 'جميع مدارس السنبلاوين التعليمية ';
                    const s = content.heroTitleSpan || 'في منصة ذكية واحدة';
                    titleEl.innerHTML = `${t}<span>${s}</span><span class="hero-ministry-note">مع إمكانية التحديث وتطبيقها على مستوى وزارة التربية والتعليم</span>`;
                }
            }
            if (content.heroDesc) setText('.hero-desc', content.heroDesc);
            if (content.heroBtnPrimary) {
                const btn = document.querySelector('.hero-buttons .btn-primary');
                if (btn) btn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${content.heroBtnPrimary}`;
            }
            if (content.heroBtnSecondary) {
                const btn = document.querySelector('.hero-buttons .btn-secondary');
                if (btn) btn.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${content.heroBtnSecondary}`;
            }
            if (content.emblumTitle) {
                const el = document.querySelector('.hero-emblem-card h4');
                if (el) el.textContent = content.emblumTitle;
            }
            if (content.emblumDesc) {
                const el = document.querySelector('.hero-emblem-card p');
                if (el) el.textContent = content.emblumDesc;
            }
            if (content.subMinistry) setText('.sub-ministry', content.subMinistry);
            if (content.mainTitle) setText('.main-title', content.mainTitle);
            if (content.tagline) setText('.tagline', content.tagline);
            if (content.pageTitle) document.title = content.pageTitle;
            if (content.schoolsSectionSub) {
                const els = document.querySelectorAll('.section-subtitle');
                if (els[0]) els[0].innerHTML = `<i class="fa-solid fa-circle-check"></i> ${content.schoolsSectionSub}`;
            }
            if (content.schoolsSectionMain) {
                const els = document.querySelectorAll('.section-main-title');
                if (els[0]) els[0].innerHTML = `<i class="fa-solid fa-building-columns"></i> ${content.schoolsSectionMain}`;
            }
            if (content.filterTitle) {
                const el = document.querySelector('.filter-title');
                if (el) el.innerHTML = `<i class="fa-solid fa-sliders"></i> ${content.filterTitle}`;
            }
            if (content.servicesSectionSub) {
                const els = document.querySelectorAll('.section-subtitle');
                if (els[1]) els[1].innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> ${content.servicesSectionSub}`;
            }
            if (content.servicesSectionMain) {
                const els = document.querySelectorAll('.section-main-title');
                if (els[1]) els[1].innerHTML = `<i class="fa-solid fa-laptop-code"></i> ${content.servicesSectionMain}`;
            }
            if (content.ctaBtnText) {
                const btn = document.querySelector('.btn-header-cta');
                if (btn) btn.innerHTML = `<i class="fa-solid fa-bolt"></i> ${content.ctaBtnText}`;
            }
            if (content.ctaBtnLink) {
                const btn = document.querySelector('.btn-header-cta');
                if (btn) btn.href = content.ctaBtnLink;
            }
            if (content.aboutSub) {
                const el = document.querySelector('.about-section .section-subtitle');
                if (el) el.innerHTML = `<i class="fa-solid fa-landmark"></i> ${content.aboutSub}`;
            }
            if (content.aboutTitle) {
                const el = document.querySelector('.about-section .section-main-title');
                if (el) el.textContent = content.aboutTitle;
            }
            if (content.aboutDesc) {
                const el = document.querySelector('.about-content > p');
                if (el) el.textContent = content.aboutDesc;
            }
            if (content.aboutAddress) {
                const el = document.querySelector('.about-overlay-card p');
                if (el) el.textContent = content.aboutAddress;
            }
            if (content.aboutHQTitle) {
                const el = document.querySelector('.about-overlay-card h5');
                if (el) el.textContent = content.aboutHQTitle;
            }
            if (content.footerBrandDesc) {
                const el = document.querySelector('.footer-brand-info > p');
                if (el) el.textContent = content.footerBrandDesc;
            }
            if (content.footerCopyright) {
                const el = document.querySelector('.footer-bottom');
                if (el) {
                    const credEl = el.querySelector('.footer-bottom-inner > div:last-child');
                    if (credEl) credEl.textContent = content.footerCopyright;
                }
            }

            // About features
            const aboutFeatures = JSON.parse(localStorage.getItem('admin_aboutFeatures') || 'null');
            if (aboutFeatures && Array.isArray(aboutFeatures)) {
                const container = document.querySelector('.about-features');
                if (container) {
                    container.innerHTML = aboutFeatures.map(f => `
                        <div class="about-feat-item">
                            <i class="fa-solid fa-check-circle"></i>
                            <span>${f}</span>
                        </div>
                    `).join('');
                }
            }

            // Stats ribbon
            const adminStats = JSON.parse(localStorage.getItem('admin_stats') || 'null');
            if (adminStats && Array.isArray(adminStats)) {
                const grid = document.querySelector('.stats-grid');
                if (grid) {
                    grid.innerHTML = adminStats.map(stat => `
                        <div class="stat-item">
                            <div class="stat-icon"><i class="fa-solid ${stat.icon}"></i></div>
                            <div>
                                <div class="stat-number">${stat.number}</div>
                                <div class="stat-label">${stat.label}</div>
                            </div>
                        </div>
                    `).join('');
                }
            }

            // Services section
            const adminServices = JSON.parse(localStorage.getItem('admin_services') || 'null');
            if (adminServices && Array.isArray(adminServices)) {
                const grid = document.querySelector('.services-grid');
                if (grid) {
                    grid.innerHTML = adminServices.map(sv => `
                        <div class="service-card">
                            <div class="service-icon-wrap">
                                <i class="fa-solid ${sv.icon}"></i>
                            </div>
                            <h4 class="service-title">${sv.title}</h4>
                            <p class="service-desc">${sv.desc}</p>
                            <a href="${sv.link}" target="_blank" rel="noopener noreferrer" class="service-link">
                                ${sv.linkText} <i class="fa-solid fa-arrow-left"></i>
                            </a>
                        </div>
                    `).join('');
                }
            }

            // Navigation links handled cleanly by static HTML template with responsive drawer

            // Footer quick links
            const footerQL = JSON.parse(localStorage.getItem('admin_footerQuickLinks') || 'null');
            if (footerQL && Array.isArray(footerQL)) {
                const ul = document.querySelector('.footer-links-list');
                if (ul) {
                    ul.innerHTML = footerQL.map(link => `
                        <li><a href="${link.href}" ${link.href.startsWith('http') ? 'target="_blank"' : ''}>
                            <i class="fa-solid fa-chevron-left"></i> ${link.text}
                        </a></li>
                    `).join('');
                }
            }

            // Footer platforms
            const footerPlatforms = JSON.parse(localStorage.getItem('admin_footerPlatforms') || 'null');
            if (footerPlatforms && Array.isArray(footerPlatforms)) {
                const uls = document.querySelectorAll('.footer-links-list');
                if (uls[1]) {
                    uls[1].innerHTML = footerPlatforms.map(link => `
                        <li><a href="${link.href}" target="_blank" rel="noopener">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> ${link.text}
                        </a></li>
                    `).join('');
                }
            }

        } catch(e) {
            console.warn('Admin integration error:', e);
        }
    });
})();

// ============================================================
//  Load schools from admin panel if available
// ============================================================
const defaultSchoolsData = [
    {
        id: 1,
        name: "إدارة شرق المنصورة التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة المنصورة، محافظة الدقهلية",
        area: "المنصورة",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة شرق المنصورة التعليمية",
        image: "unnamed.jpg",
        link: "" + encodeURIComponent("إدارة شرق المنصورة التعليمية، مدينة المنصورة، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة شرق المنصورة التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: المنصورة"]
    },
    {
        id: 2,
        name: "إدارة غرب المنصورة التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة المنصورة، محافظة الدقهلية",
        area: "المنصورة",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة غرب المنصورة التعليمية",
        image: "unnamed (1).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة غرب المنصورة التعليمية، مدينة المنصورة، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة غرب المنصورة التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: المنصورة"]
    },
    {
        id: 3,
        name: "إدارة طلخا التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة طلخا، محافظة الدقهلية",
        area: "طلخا",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة طلخا التعليمية",
        image: "unnamed (2).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة طلخا التعليمية، مدينة طلخا، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة طلخا التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: طلخا"]
    },
    {
        id: 4,
        name: "إدارة السنبلاوين التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة السنبلاوين، محافظة الدقهلية",
        area: "السنبلاوين",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة السنبلاوين التعليمية",
        image: "0ba5ffc0-292e-40b1-9998-2c21a95eeb9b.png",
        link: "https://al-edara-esnblawen.vercel.app/" ,
        hasLiveSite: true,
        description: "إدارة السنبلاوين التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: السنبلاوين"]
    },
    {
        id: 5,
        name: "إدارة أجا التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة أجا، محافظة الدقهلية",
        area: "أجا",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة أجا التعليمية",
        image: "unnamed (3).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة أجا التعليمية، مدينة أجا، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة أجا التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: أجا"]
    },
    {
        id: 6,
        name: "إدارة ميت غمر التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة ميت غمر، محافظة الدقهلية",
        area: "ميت غمر",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة ميت غمر التعليمية",
        image: "df.jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة ميت غمر التعليمية، مدينة ميت غمر، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة ميت غمر التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: ميت غمر"]
    },
    {
        id: 7,
        name: "إدارة بلقاس التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة بلقاس، محافظة الدقهلية",
        area: "بلقاس",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة بلقاس التعليمية",
        image: "ll.png",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة بلقاس التعليمية، مدينة بلقاس، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة بلقاس التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: بلقاس"]
    },
    {
        id: 8,
        name: "إدارة دكرنس التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة دكرنس، محافظة الدقهلية",
        area: "دكرنس",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة دكرنس التعليمية",
        image: "unnamed (4).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة دكرنس التعليمية، مدينة دكرنس، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة دكرنس التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: دكرنس"]
    },
    {
        id: 9,
        name: "إدارة شربين التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة شربين، محافظة الدقهلية",
        area: "شربين",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة شربين التعليمية",
        image: "unnamed (5).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة شربين التعليمية، مدينة شربين، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة شربين التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: شربين"]
    },
    {
        id: 10,
        name: "إدارة نبروه التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة نبروه، محافظة الدقهلية",
        area: "نبروه",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة نبروه التعليمية",
        image: "uiik.png",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة نبروه التعليمية، مدينة نبروه، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة نبروه التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: نبروه"]
    },
    {
        id: 11,
        name: "إدارة منية النصر التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة منية النصر، محافظة الدقهلية",
        area: "منية النصر",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة منية النصر التعليمية",
        image: "unnamed (6).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة منية النصر التعليمية، مدينة منية النصر، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة منية النصر التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: منية النصر"]
    },
    {
        id: 12,
        name: "إدارة بني عبيد التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة بني عبيد، محافظة الدقهلية",
        area: "بني عبيد",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة بني عبيد التعليمية",
        image: "cd69376b-a3d9-46d0-8a2d-57c139e2fab1.png",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة بني عبيد التعليمية، مدينة بني عبيد، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة بني عبيد التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: بني عبيد"]
    },
    {
        id: 13,
        name: "إدارة الجمالية التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة الجمالية، محافظة الدقهلية",
        area: "الجمالية",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة الجمالية التعليمية",
        image: "io,m.jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة الجمالية التعليمية، مدينة الجمالية، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة الجمالية التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: الجمالية"]
    },
    {
        id: 14,
        name: "إدارة المنزلة التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة المنزلة، محافظة الدقهلية",
        area: "المنزلة",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة المنزلة التعليمية",
        image: "okh.jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة المنزلة التعليمية، مدينة المنزلة، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة المنزلة التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: المنزلة"]
    },
    {
        id: 15,
        name: "إدارة المطرية التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة المطرية، محافظة الدقهلية",
        area: "المطرية",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة المطرية التعليمية",
        image: "unnamed (7).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة المطرية التعليمية، مدينة المطرية، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة المطرية التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: المطرية"]
    },
    {
        id: 16,
        name: "إدارة ميت سلسيل التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة ميت سلسيل، محافظة الدقهلية",
        area: "ميت سلسيل",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة ميت سلسيل التعليمية",
        image: "ooooo.jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة ميت سلسيل التعليمية، مدينة ميت سلسيل، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة ميت سلسيل التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: ميت سلسيل"]
    },
    {
        id: 17,
        name: "إدارة تمي الأمديد التعليمية",
        type: "administration",
        typeName: "إدارة تعليمية",
        location: "مدينة تمي الأمديد، محافظة الدقهلية",
        area: "تمي الأمديد",
        code: "غير متاح",
        studentsCount: "إدارة تعليمية",
        principal: "إدارة تمي الأمديد التعليمية",
        image: "unnamed (8).jpg",
        link: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("إدارة تمي الأمديد التعليمية، مدينة تمي الأمديد، محافظة الدقهلية، مصر"),
        hasLiveSite: true,
        description: "إدارة تمي الأمديد التعليمية بمحافظة الدقهلية.",
        features: ["محافظة الدقهلية", "نطاق الإدارة: تمي الأمديد"]
    }
];
let schoolsData = (function() {
    try {
        const cms = JSON.parse(localStorage.getItem('site_cms_v1') || 'null');
        if (cms && Array.isArray(cms.administrations)) return cms.administrations;
        if (cms && Array.isArray(cms.schools) && cms.schools.length > 0) return cms.schools;
        const saved = JSON.parse(localStorage.getItem('admin_schools'));
        if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    } catch(e) {}
    return defaultSchoolsData;
})();
window.dakahliaAdministrationData = schoolsData;
window.defaultDakahliaAdministrationData = defaultSchoolsData;

const filterState = {
    searchQuery: "",
    category: "all",
    region: "all",
    area: "all",
    sort: "default",
    viewMode: "grid" // 'grid' | 'list'
};

function normalizeArabic(text) {
    if (!text) return "";
    return text
        .trim()
        .toLowerCase()
        .replace(/[إأآا]/g, "ا")
        .replace(/ة/g, "ه")
        .replace(/ى/g, "ي")
        .replace(/[ًٌٍَُِّْ]/g, ""); // إزالة التشكيل
}

function getFilteredSchools() {
    let result = [...schoolsData];

    if (filterState.searchQuery) {
        const queryNorm = normalizeArabic(filterState.searchQuery);
        result = result.filter(school => {
            const nameNorm = normalizeArabic(school.name);
            const locNorm = normalizeArabic(school.location);
            const typeNorm = normalizeArabic(school.typeName);
            const descNorm = normalizeArabic(school.description);
            const areaNorm = normalizeArabic(school.area);
            return nameNorm.includes(queryNorm) || 
                   locNorm.includes(queryNorm) || 
                   typeNorm.includes(queryNorm) ||
                   descNorm.includes(queryNorm) ||
                   areaNorm.includes(queryNorm);
        });
    }

    if (filterState.region && filterState.region !== "all") {
        const regionMap = {
            center: ["المنصورة", "طلخا", "نبروه"],
            south: ["السنبلاوين", "أجا", "ميت غمر", "تمي الأمديد"],
            "north-east": ["بلقاس", "شربين", "دكرنس", "بني عبيد"],
            lake: ["منية النصر", "الجمالية", "المنزلة", "المطرية", "ميت سلسيل"]
        };
        const allowedAreas = regionMap[filterState.region];
        if (allowedAreas) {
            result = result.filter(school => allowedAreas.includes(school.area));
        }
    }

    if (filterState.category !== "all") {
        result = result.filter(school => school.type === filterState.category);
    }

    if (filterState.area !== "all") {
        result = result.filter(school => school.area === filterState.area);
    }

    if (filterState.sort === "name-asc") {
        result.sort((a, b) => a.name.localeCompare(b.name, "ar"));
    } else if (filterState.sort === "name-desc") {
        result.sort((a, b) => b.name.localeCompare(a.name, "ar"));
    }

    return result;
}

function escapeCardText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
}

function renderSchoolCard(school) {
    const configuredLink = typeof school.link === "string" ? school.link.trim() : "";
    const hasExternalSite = /^https?:\/\//i.test(configuredLink) && !/google\.com\/maps/i.test(configuredLink);
    const siteUrl = hasExternalSite ? configuredLink : `school.html?id=${encodeURIComponent(school.id)}`;
    const safeSiteUrl = escapeCardText(siteUrl);
    const targetAttr = hasExternalSite ? 'target="_blank" rel="noopener noreferrer"' : "";
    const adminLogo = school.type === "administration" && window.dakahliaAdministrationLogos
        ? window.dakahliaAdministrationLogos[String(school.id)]
        : "";
    const imagePath = typeof school.image === "string" &&
        (/^https?:\/\//i.test(school.image) || /^(?:\.{1,2}\/)?[^:<>\"']+\.(?:png|jpe?g|webp|gif)$/i.test(school.image.trim()))
        ? school.image.trim()
        : "re.jpg";
    const name = escapeCardText(school.name);
    const location = escapeCardText(school.location);
    const area = escapeCardText(school.area);
    const id = escapeCardText(school.id);
    const typeName = escapeCardText(school.typeName || "إدارة تعليمية");

    const mapUrl = (school.link && /^https?:\/\//i.test(school.link) && school.link.includes("google.com/maps"))
        ? escapeCardText(school.link)
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(school.name + "، محافظة الدقهلية، مصر")}`;

    return `
        <article class="school-card" data-id="${id}">
            <div class="card-media">
                <img src="${escapeCardText(imagePath)}" alt="${name}" loading="lazy" onerror="this.onerror=null;this.src='re.jpg'">
                <div class="card-media-overlay"></div>
                ${adminLogo ? `
                    <div class="admin-logo-wrapper" title="شعار ${name}">
                        <img class="admin-logo-badge" src="${escapeCardText(adminLogo)}" alt="شعار ${name}" loading="lazy">
                    </div>
                ` : ""}
                <div class="card-badges-top">
                    <span class="card-type-tag">
                        <i class="fa-solid fa-graduation-cap"></i>
                        ${typeName}
                    </span>
                    <span class="card-status-badge">
                        <span class="status-dot"></span>
                        محافظة الدقهلية
                    </span>
                </div>
            </div>
            
            <div class="card-body">
                <div class="card-header-info">
                    <span class="card-number-badge">إدارة رقم #${id}</span>
                    <h3 class="card-title" title="${name}">
                        <a href="${safeSiteUrl}" ${targetAttr}>${name}</a>
                    </h3>
                </div>
                
                <div class="card-meta-list">
                    <div class="meta-item">
                        <div class="meta-icon"><i class="fa-solid fa-location-dot"></i></div>
                        <div class="meta-text">
                            <span class="meta-label">المقر والمدينة</span>
                            <strong>${location}</strong>
                        </div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-icon"><i class="fa-solid fa-map-pin"></i></div>
                        <div class="meta-text">
                            <span class="meta-label">نطاق الإدارة</span>
                            <strong>مركز ومدينة ${area}</strong>
                        </div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-icon"><i class="fa-solid fa-shield-halved"></i></div>
                        <div class="meta-text">
                            <span class="meta-label">التبعية الإدارية</span>
                            <span>مديرية التربية والتعليم بالدقهلية</span>
                        </div>
                    </div>
                </div>

                <div class="card-actions">
                    <a href="${safeSiteUrl}" ${targetAttr} class="btn-card-visit" title="عرض صفحة وموقع ${name}">
                        <i class="fa-solid ${hasExternalSite ? "fa-arrow-up-right-from-square" : "fa-building-columns"}"></i>
                        <span>${hasExternalSite ? "زيارة البوابة المباشرة" : "تصفح الإدارة والمدارس"}</span>
                    </a>
                    <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-map" title="عرض موقع ${name} على الخريطة">
                        <i class="fa-solid fa-map-location-dot"></i>
                        <span>الخريطة</span>
                    </a>
                </div>
            </div>
        </article>
    `;
}

function renderSchools() {
    const container = document.getElementById("schoolsGrid");
    const countBadge = document.getElementById("schoolsCount");
    if (!container) return;

    const areaSelect = document.getElementById("areaFilter");
    if (areaSelect) {
        const selectedArea = filterState.area;
        const areas = [...new Set(schoolsData.map(school => school.area).filter(Boolean))];
        const existingAreas = Array.from(areaSelect.options).map(option => option.value).filter(Boolean);
        areas.forEach(area => {
            if (!existingAreas.includes(area)) {
                areaSelect.add(new Option(area, area));
            }
        });
        if (areas.includes(selectedArea)) areaSelect.value = selectedArea;
    }

    const filtered = getFilteredSchools();

    if (countBadge) {
        countBadge.textContent = filtered.length;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>لم نتمكن من العثور على إدارات مطابقة للبحث</h3>
                <p>يرجى تجربة كلمات بحث أخرى أو اختيار نطاق جغرافي آخر أو إعادة ضبط عوامل التصفية.</p>
                <button class="btn-reset-filters" onclick="resetAllFilters()">
                    <i class="fa-solid fa-rotate-right"></i>
                    إعادة ضبط خيارات البحث
                </button>
            </div>
        `;
        return;
    }

    container.className = `schools-grid ${filterState.viewMode === "list" ? "list-view" : ""}`;
    container.innerHTML = filtered.map(school => renderSchoolCard(school)).join("");
}

function openSchoolModal(schoolId) {}
function closeSchoolModal() {}

function resetAllFilters() {
    filterState.searchQuery = "";
    filterState.category = "all";
    filterState.region = "all";
    filterState.area = "all";
    filterState.sort = "default";

    const searchInput = document.getElementById("schoolSearch");
    if (searchInput) searchInput.value = "";

    const searchClear = document.getElementById("searchClearBtn");
    if (searchClear) searchClear.style.display = "none";

    const areaSelect = document.getElementById("areaFilter");
    if (areaSelect) areaSelect.value = "all";

    const sortSelect = document.getElementById("sortFilter");
    if (sortSelect) sortSelect.value = "default";

    document.querySelectorAll(".filter-chip").forEach(chip => {
        if (chip.getAttribute("data-region") === "all") {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });

    renderSchools();
}

function initLiveDate() {
    const dateEl = document.getElementById("arabicDate");
    if (dateEl) {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        try {
            dateEl.textContent = now.toLocaleDateString('ar-EG', options);
        } catch (error) {
            dateEl.textContent = "العام الدراسي 2026/2027";
        }
    }

    const clockEl = document.getElementById("liveClock");
    if (!clockEl) return;
    const updateClock = () => {
        const now = new Date();
        clockEl.dateTime = now.toISOString();
        clockEl.textContent = now.toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "Africa/Cairo"
        });
    };
    updateClock();
    window.setInterval(updateClock, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    initLiveDate();
    renderSchools();

    const searchInput = document.getElementById("schoolSearch");
    const searchClear = document.getElementById("searchClearBtn");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            filterState.searchQuery = e.target.value;
            if (searchClear) {
                searchClear.style.display = e.target.value ? "block" : "none";
            }
            renderSchools();
        });
    }

    if (searchClear) {
        searchClear.addEventListener("click", () => {
            if (searchInput) {
                searchInput.value = "";
                filterState.searchQuery = "";
                searchClear.style.display = "none";
                searchInput.focus();
                renderSchools();
            }
        });
    }

    const areaSelect = document.getElementById("areaFilter");
    if (areaSelect) {
        areaSelect.addEventListener("change", (e) => {
            filterState.area = e.target.value;
            renderSchools();
        });
    }

    const sortSelect = document.getElementById("sortFilter");
    if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
            filterState.sort = e.target.value;
            renderSchools();
        });
    }

    // Geographic Filter Chips
    document.querySelectorAll(".filter-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            filterState.region = chip.getAttribute("data-region") || "all";
            renderSchools();
        });
    });

    const viewGridBtn = document.getElementById("viewGridBtn");
    const viewListBtn = document.getElementById("viewListBtn");

    if (viewGridBtn && viewListBtn) {
        viewGridBtn.addEventListener("click", () => {
            filterState.viewMode = "grid";
            viewGridBtn.classList.add("active");
            viewListBtn.classList.remove("active");
            renderSchools();
        });

        viewListBtn.addEventListener("click", () => {
            filterState.viewMode = "list";
            viewListBtn.classList.add("active");
            viewGridBtn.classList.remove("active");
            renderSchools();
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navBackdrop = document.getElementById("navBackdrop");

    function closeMobileMenu() {
        if (navLinks) {
            navLinks.classList.remove("open", "active");
        }
        if (navBackdrop) navBackdrop.classList.remove("show");
        if (menuToggle) {
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        }
        document.body.classList.remove("menu-locked");
    }

    function toggleMobileMenu() {
        if (!navLinks) return;
        const isOpen = navLinks.classList.toggle("open");
        navLinks.classList.toggle("active", isOpen);
        if (navBackdrop) navBackdrop.classList.toggle("show", isOpen);
        if (menuToggle) {
            const icon = menuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars", !isOpen);
                icon.classList.toggle("fa-xmark", isOpen);
            }
        }
        document.body.classList.toggle("menu-locked", isOpen);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", toggleMobileMenu);
    }

    if (navBackdrop) {
        navBackdrop.addEventListener("click", closeMobileMenu);
    }

    const drawerCloseBtn = document.getElementById("drawerCloseBtn");
    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener("click", closeMobileMenu);
    }

    if (navLinks) {
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });
    }

    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 350) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    window.searchSchool = function() {
        const input = document.getElementById("schoolSearch");
        if (input) {
            filterState.searchQuery = input.value;
            renderSchools();
        }
    };
});

// ============================================================
//  Theme Toggle — Day / Night Mode
// ============================================================
(function() {
    'use strict';

    const STORAGE_KEY = 'site_theme_v1';
    const html = document.documentElement;

    // Apply saved theme immediately (before DOM ready to avoid flash)
    const savedTheme = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('dakahlia_theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        localStorage.setItem('dakahlia_theme', theme);
        updateToggleBtn(theme);
        // Also update school.html theme if opened side-by-side via postMessage
        try {
            if (window.opener && window.opener.document) {
                window.opener.document.documentElement.setAttribute('data-theme', theme);
            }
        } catch(e) {}
    }

    function updateToggleBtn(theme) {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;
        btn.setAttribute('aria-label', theme === 'dark' ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الليلي');
        btn.setAttribute('title', theme === 'dark' ? 'وضع النهار' : 'وضع الليل');
    }

    document.addEventListener('DOMContentLoaded', function() {
        const btn = document.getElementById('themeToggleBtn');
        if (!btn) return;

        // Set correct state after DOM loads
        const current = html.getAttribute('data-theme') || 'light';
        updateToggleBtn(current);

        btn.addEventListener('click', function() {
            const current = html.getAttribute('data-theme') || 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            // Animate thumb
            btn.classList.add('toggling');
            setTimeout(() => btn.classList.remove('toggling'), 400);
            applyTheme(next);
        });
    });

    // Listen for preference change from OS
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function(e) {
        // Only auto-switch if user never manually set a preference
        if (!localStorage.getItem(STORAGE_KEY) && !localStorage.getItem('dakahlia_theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();