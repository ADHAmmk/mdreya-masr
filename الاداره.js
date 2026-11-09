

(function applyAdminChanges() {
    // Apply text content changes
    document.addEventListener('DOMContentLoaded', () => {
        try {
            const content = JSON.parse(localStorage.getItem('admin_content') || '{}');

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
                    titleEl.innerHTML = `${t}<span>${s}</span>`;
                }
            }
            if (content.heroDesc) setText('.hero-desc', content.heroDesc);
            if (content.heroBtnPrimary) {
                const btn = document.querySelector('.hero-buttons .btn-primary');
                if (btn) btn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> ${content.heroBtnPrimary}`;
            }
            if (content.heroBtnSecondary) {
                const btn = document.querySelector('.hero-buttons .btn-secondary');
                if (btn) btn.innerHTML = `<i class="fa-solid fa-grid-2"></i> ${content.heroBtnSecondary}`;
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
                if (els[1]) els[1].innerHTML = `<i class="fa-solid fa-sparkles"></i> ${content.servicesSectionSub}`;
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

            // Navigation links
            const adminNav = JSON.parse(localStorage.getItem('admin_navLinks') || 'null');
            if (adminNav && Array.isArray(adminNav)) {
                const navUl = document.querySelector('.nav-links');
                if (navUl) {
                    // Keep mobile header and mobile CTA, replace middle items
                    const mobileHeader = navUl.querySelector('.mobile-drawer-header');
                    const mobileCTA = navUl.querySelector('.mobile-drawer-cta');
                    const homeLink = adminNav.find(link => link.href === '#hero');
                    const homeNavItem = homeLink ? `
                        <li><a href="${homeLink.href}" class="active">
                            <i class="fa-solid ${homeLink.icon || 'fa-house'}"></i> ${homeLink.text}
                        </a></li>
                    ` : `
                        <li><a href="#hero" class="active">
                            <i class="fa-solid fa-house"></i> الرئيسية
                        </a></li>
                    `;
                    const newLinks = adminNav.filter(link => link.href !== '#hero' && !/^(?:\.\/)?admin\.html(?:[?#].*)?$/i.test(link.href || '')).map(link => `
                        <li><a href="${link.href}" class="awas">
                            <i class="fa-solid ${link.icon || 'fa-circle'}"></i> ${link.text}
                        </a></li>
                    `).join('');
                    navUl.innerHTML = (mobileHeader ? mobileHeader.outerHTML : '') + homeNavItem + newLinks + (mobileCTA ? mobileCTA.outerHTML : '');
                }
            }

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
let schoolsData = (function() {
    try {
        const cms = JSON.parse(localStorage.getItem('site_cms_v1') || 'null');
        if (cms && Array.isArray(cms.schools) && cms.schools.length > 0) return cms.schools;
        const saved = JSON.parse(localStorage.getItem('admin_schools'));
        if (saved && Array.isArray(saved) && saved.length > 0) return saved;
    } catch(e) {}
    return null;
})() || [
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

const filterState = {
    searchQuery: "",
    category: "all",
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
            return nameNorm.includes(queryNorm) || 
                   locNorm.includes(queryNorm) || 
                   typeNorm.includes(queryNorm) ||
                   descNorm.includes(queryNorm);
        });
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

function renderSchoolCard(school) {
    const configuredLink = typeof school.link === "string" ? school.link.trim() : "";
    const keepExistingSite = String(school.id) === "4" &&
        /^https:\/\/al-edara-esnblawen\.vercel\.app(?:\/|$)/i.test(configuredLink);
    const siteUrl = keepExistingSite
        ? configuredLink
        : `school.html?id=${encodeURIComponent(school.id)}`;
    const targetAttr = keepExistingSite ? 'target="_blank" rel="noopener noreferrer"' : "";
    const adminLogo = school.type === "administration"
        ? window.dakahliaAdministrationLogos[String(school.id)]
        : "";

    return `
        <article class="school-card" data-id="${school.id}">
            <div class="card-media">
                <img src="${school.image}" alt="${school.imageAlt || school.name}" loading="lazy" onerror="this.onerror=null;this.src='re.jpg'">
                ${adminLogo ? `<img class="admin-logo-badge" src="${adminLogo}" alt="شعار ${school.name}" loading="lazy">` : ""}
                <span class="card-type-tag">
                    <i class="fa-solid fa-graduation-cap"></i>
                    ${school.typeName}
                </span>
                <span class="card-status-badge">
                    <span class="dot"></span>
                    محافظه الدقهليه
                </span>
            </div>
            
            <div class="card-body">
                <h3 class="card-title" title="${school.name}"><a href="${siteUrl}" ${targetAttr}>${school.name}</a></h3>
                
                <div class="card-meta-list">
                    <div class="meta-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${school.location}</span>
                    </div>
                    <div class="meta-item">
                        <i class="fa-solid fa-id-card"></i>
                        <span>نطاق الإدارة: <strong>${school.area}</strong></span>
                    </div>
                    <div class="meta-item">
                        <i class="fa-solid fa-landmark"></i>
                        <span>إدارة تعليمية بمحافظة الدقهلية</span>
                    </div>
                </div>

                <div class="card-actions">
                    <a href="${siteUrl}" ${targetAttr} class="btn-card-visit" title="عرض موقع ${school.name}">
                        <i class="fa-solid ${keepExistingSite ? "fa-arrow-up-right-from-square" : "fa-building-columns"}"></i>
                        ${keepExistingSite ? "زيارة الموقع الحالي" : "عرض صفحة الإدارة"}
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

    const filtered = getFilteredSchools();

    if (countBadge) {
        countBadge.textContent = filtered.length;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <i class="fa-solid fa-magnifying-glass"></i>
                <h3>لم نتمكن من العثور على مدارس مطابقة</h3>
                <p>يرجى تجربة كلمات بحث أخرى أو إعادة ضبط عوامل التصفية.</p>
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
    filterState.area = "all";
    filterState.sort = "default";

    const searchInput = document.getElementById("schoolSearch");
    if (searchInput) searchInput.value = "";

    const searchClear = document.getElementById("searchClearBtn");
    if (searchClear) searchClear.style.display = "none";

    const typeSelect = document.getElementById("typeFilter");
    if (typeSelect) typeSelect.value = "all";

    const areaSelect = document.getElementById("areaFilter");
    if (areaSelect) areaSelect.value = "all";

    const sortSelect = document.getElementById("sortFilter");
    if (sortSelect) sortSelect.value = "default";

    document.querySelectorAll(".category-chip").forEach(chip => {
        if (chip.getAttribute("data-category") === "all") {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });

    renderSchools();
}

document.addEventListener("DOMContentLoaded", () => {
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

    const typeSelect = document.getElementById("typeFilter");
    if (typeSelect) {
        typeSelect.addEventListener("change", (e) => {
            filterState.category = e.target.value;
            
            document.querySelectorAll(".category-chip").forEach(chip => {
                if (chip.getAttribute("data-category") === e.target.value) {
                    chip.classList.add("active");
                } else {
                    chip.classList.remove("active");
                }
            });

            renderSchools();
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

    document.querySelectorAll(".category-chip").forEach(chip => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".category-chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            const cat = chip.getAttribute("data-category") || "all";
            filterState.category = cat;

            if (typeSelect) {
                typeSelect.value = cat;
            }

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
        if (navLinks) navLinks.classList.remove("open");
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
            if (window.scrollY > 400) {
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