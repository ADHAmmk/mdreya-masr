(() => {
    "use strict";

    const administrations = [
        { id: 1, name: "إدارة شرق المنصورة التعليمية", area: "شرق المنصورة", image: "unnamed.jpg" },
        { id: 2, name: "إدارة غرب المنصورة التعليمية", area: "غرب المنصورة", image: "unnamed (1).jpg" },
        { id: 3, name: "إدارة طلخا التعليمية", area: "طلخا", image: "unnamed (2).jpg" },
        { id: 4, name: "إدارة السنبلاوين التعليمية", area: "السنبلاوين", image: "0ba5ffc0-292e-40b1-9998-2c21a95eeb9b.png" },
        { id: 5, name: "إدارة أجا التعليمية", area: "أجا", image: "unnamed (3).jpg" },
        { id: 6, name: "إدارة ميت غمر التعليمية", area: "ميت غمر", image: "df.jpg" },
        { id: 7, name: "إدارة بلقاس التعليمية", area: "بلقاس", image: "ll.png" },
        { id: 8, name: "إدارة دكرنس التعليمية", area: "دكرنس", image: "unnamed (4).jpg" },
        { id: 9, name: "إدارة شربين التعليمية", area: "شربين", image: "unnamed (5).jpg" },
        { id: 10, name: "إدارة نبروه التعليمية", area: "نبروه", image: "uiik.png" },
        { id: 11, name: "إدارة منية النصر التعليمية", area: "منية النصر", image: "unnamed (6).jpg" },
        { id: 12, name: "إدارة بني عبيد التعليمية", area: "بني عبيد", image: "cd69376b-a3d9-46d0-8a2d-57c139e2fab1.png" },
        { id: 13, name: "إدارة الجمالية التعليمية", area: "الجمالية", image: "io,m.jpg" },
        { id: 14, name: "إدارة المنزلة التعليمية", area: "المنزلة", image: "okh.jpg" },
        { id: 15, name: "إدارة المطرية التعليمية", area: "المطرية", image: "unnamed (7).jpg" },
        { id: 16, name: "إدارة ميت سلسيل التعليمية", area: "ميت سلسيل", image: "ooooo.jpg" },
        { id: 17, name: "إدارة تمي الأمديد التعليمية", area: "تمي الأمديد", image: "unnamed (8).jpg" }
    ];

    const palettes = [
        ["#165f78", "#e0a357"], ["#914252", "#e4b45c"], ["#65539a", "#e2ad62"],
        ["#004c46", "#d9a72e"], ["#a34f32", "#e9c366"], ["#3b5f9a", "#e2a56d"],
        ["#197069", "#d5a846"], ["#814d72", "#e7b863"], ["#456344", "#d6a858"],
        ["#28789a", "#e4a957"], ["#786036", "#d9aa5c"], ["#3a6380", "#d4b366"],
        ["#96513f", "#e0ae78"], ["#276b65", "#d9b469"], ["#455b96", "#e3a15e"],
        ["#75517c", "#dcb967"], ["#41614d", "#d49a5e"]
    ];

    const data = window.dakahliaSchoolData;
    const params = new URLSearchParams(location.search);
    const adminId = Number(params.get("id"));
    const admin = administrations.find(item => item.id === adminId);
    const main = document.querySelector("main");

    if (admin && admin.id === 4) {
        location.replace("https://al-edara-esnblawen.vercel.app/");
        return;
    }

    if (!admin) {
        main.innerHTML = '<section class="no-results"><h1>الإدارة غير موجودة</h1><p>اختر إدارة من دليل إدارات الدقهلية.</p><a class="btn-primary" href="index.html">العودة إلى الدليل</a></section>';
        return;
    }

    const [primary, accent] = palettes[admin.id - 1];
    const colorChannels = hex => hex.match(/\w\w/g).map(value => parseInt(value, 16));
    const rgba = (hex, alpha) => `rgba(${colorChannels(hex).join(", ")}, ${alpha})`;
    const primaryRgb = colorChannels(primary);
    const accentRgb = colorChannels(accent);
    const darkerPrimary = `#${primaryRgb.map(value => Math.round(value * 0.72).toString(16).padStart(2, "0")).join("")}`;
    const lighterPrimary = `#${primaryRgb.map(value => Math.min(255, Math.round(value * 1.22)).toString(16).padStart(2, "0")).join("")}`;
    const lighterAccent = `#${accentRgb.map(value => Math.min(255, Math.round(value * 1.12)).toString(16).padStart(2, "0")).join("")}`;
    const root = document.documentElement;
    root.style.setProperty("--primary-dark-rgb", primaryRgb.map(value => Math.round(value * 0.72)).join(", "));
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--primary-rgb", primaryRgb.join(", "));
    root.style.setProperty("--primary-dark", darkerPrimary);
    root.style.setProperty("--primary-light", lighterPrimary);
    root.style.setProperty("--primary-soft", rgba(primary, 0.1));
    root.style.setProperty("--primary-gradient", `linear-gradient(135deg, ${darkerPrimary} 0%, ${primary} 55%, ${lighterPrimary} 100%)`);
    root.style.setProperty("--gold", accent);
    root.style.setProperty("--gold-rgb", accentRgb.join(", "));
    root.style.setProperty("--gold-hover", lighterAccent);
    root.style.setProperty("--gold-light", rgba(accent, 0.13));
    root.style.setProperty("--gold-gradient", `linear-gradient(135deg, ${lighterAccent} 0%, ${accent} 100%)`);
    root.style.setProperty("--shadow-gold", `0 8px 20px ${rgba(accent, 0.25)}`);
    root.style.setProperty("--admin-background-image", `url("${admin.image}")`);

    const revealTargets = new Set();
    const revealObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealTargets.delete(entry.target);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" })
        : null;
    function revealVisible() {
        revealTargets.forEach(element => {
            const bounds = element.getBoundingClientRect();
            if (bounds.bottom >= 0 && bounds.top <= window.innerHeight) {
                element.classList.add("is-visible");
                revealTargets.delete(element);
                if (revealObserver) revealObserver.unobserve(element);
            }
        });
    }
    const reveal = element => {
        element.classList.add("reveal-on-scroll");
        revealTargets.add(element);
        if (revealObserver) revealObserver.observe(element);
        else revealVisible();
    };

    const schools = data.schools.filter(school => school.administration === admin.area);
    const unassignedSchools = admin.area === "شرق المنصورة" || admin.area === "غرب المنصورة" ? data.unassigned : [];
    const description = `بوابة ${admin.name} بمحافظة الدقهلية. تعرّف على المدارس الواردة في البيانات المتاحة والخدمات والمنصات التعليمية.`;
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${admin.name}، محافظة الدقهلية، مصر`)}`;
    document.title = `${admin.name} | البوابة الرسمية ودليل المدارس`;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[name="theme-color"]').content = primary;
    document.querySelectorAll("[data-name]").forEach(element => { element.textContent = admin.name; });
    document.querySelectorAll("[data-area]").forEach(element => { element.textContent = `مدينة ${admin.area} - محافظة الدقهلية`; });
    document.querySelectorAll("[data-description]").forEach(element => { element.textContent = description; });
    document.querySelectorAll("[data-map]").forEach(element => { element.href = mapUrl; });
    document.querySelector("[data-hero-title]").textContent = `جميع مدارس ${admin.area} التعليمية`;
    document.querySelector("[data-emblem-title]").textContent = admin.name;
    document.querySelector("[data-notice]").textContent = `أهلاً بكم في البوابة الموحدة لـ${admin.name} - مديرية التربية والتعليم بمحافظة الدقهلية`;
    document.querySelector("[data-schools-heading]").textContent = `قائمة المدارس التابعة لـ${admin.name}`;
    document.querySelector("[data-admin-image]").src = admin.image;
    document.querySelector("[data-admin-image]").alt = admin.name;
    const adminLogo = window.dakahliaAdministrationLogos[admin.id];
    document.querySelectorAll("[data-admin-logo]").forEach(image => {
        image.src = adminLogo || "op-removebg-preview.png";
        image.alt = adminLogo ? `شعار ${admin.name}` : "شعار وزارة التربية والتعليم";
    });
    document.querySelector("[data-year]").textContent = new Date().getFullYear();

    function animateMetric(element, value) {
        element.textContent = Number(value);
    }

    animateMetric(document.querySelector("[data-school-count]"), schools.length);
    animateMetric(document.querySelector("[data-type-count]"), new Set(schools.map(school => school.type)).size);
    animateMetric(document.querySelector("[data-review-count]"), schools.filter(school => school.review).length);

    document.querySelectorAll(".hero-content, .hero-emblem-card, .stat-item, .filter-card, .section-title-wrap, .data-notice, .service-card, .about-card, .footer-col")
        .forEach(reveal);

    const schoolsGrid = document.getElementById("schoolsGrid");
    const countBadge = document.getElementById("schoolsCount");
    const typeFilter = document.getElementById("typeFilter");
    const areaFilter = document.getElementById("areaFilter");
    const sortFilter = document.getElementById("sortFilter");
    const searchInput = document.getElementById("schoolSearch");
    const clearSearch = document.getElementById("searchClearBtn");
    const categoryChips = document.getElementById("categoryChips");
    const state = { query: "", type: "all", area: "all", sort: "default", view: "grid" };

    function addOptions(select, values) {
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.textContent = value;
            select.append(option);
        });
    }

    const types = [...new Set(schools.map(school => school.type))];
    const areas = [...new Set(schools.map(school => school.area || "غير محدد"))];
    addOptions(typeFilter, types);
    addOptions(areaFilter, areas);

    function makeChip(value, text) {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = `category-chip${state.type === value ? " active" : ""}`;
        chip.dataset.category = value;
        chip.append(document.createTextNode(text));
        chip.addEventListener("click", () => {
            state.type = value;
            typeFilter.value = value;
            renderSchools();
        });
        categoryChips.append(chip);
    }

    makeChip("all", "جميع المدارس");
    types.forEach(type => makeChip(type, type));

    function normalize(text) {
        return String(text || "").trim().toLowerCase()
            .replace(/[إأآا]/g, "ا")
            .replace(/ة/g, "ه")
            .replace(/ى/g, "ي")
            .replace(/[ًٌٍَُِّْ]/g, "");
    }

    function getFilteredSchools() {
        let filtered = [...schools];
        if (state.query) {
            const query = normalize(state.query);
            filtered = filtered.filter(school =>
                normalize(`${school.name} ${school.type} ${school.area} ${school.source}`).includes(query)
            );
        }
        if (state.type !== "all") filtered = filtered.filter(school => school.type === state.type);
        if (state.area !== "all") filtered = filtered.filter(school => (school.area || "غير محدد") === state.area);
        if (state.sort === "name-asc") filtered.sort((a, b) => a.name.localeCompare(b.name, "ar"));
        if (state.sort === "name-desc") filtered.sort((a, b) => b.name.localeCompare(a.name, "ar"));
        return filtered;
    }

    function createSchoolCard(school, index) {
        const card = document.createElement("article");
        card.className = "school-card";
        card.dataset.id = school.id;
        card.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 55}ms`);

        const media = document.createElement("div");
        media.className = "card-media administration-media";
        const schoolIcon = document.createElement("i");
        schoolIcon.className = "fa-solid fa-school";
        media.append(schoolIcon);

        const typeTag = document.createElement("span");
        typeTag.className = "card-type-tag";
        const typeIcon = document.createElement("i");
        typeIcon.className = "fa-solid fa-graduation-cap";
        typeTag.append(typeIcon, document.createTextNode(` ${school.type}`));
        media.append(typeTag);

        const status = document.createElement("span");
        status.className = "card-status-badge";
        const statusDot = document.createElement("span");
        statusDot.className = "dot";
        status.append(statusDot, document.createTextNode(school.review ? "يحتاج مراجعة" : "ضمن القائمة الحالية"));
        media.append(status);

        const body = document.createElement("div");
        body.className = "card-body";
        const title = document.createElement("h3");
        title.className = "card-title";
        title.textContent = school.name;
        body.append(title);

        const details = document.createElement("div");
        details.className = "card-meta-list";
        const areaRow = document.createElement("div");
        areaRow.className = "meta-item";
        const areaIcon = document.createElement("i");
        areaIcon.className = "fa-solid fa-location-dot";
        const areaText = document.createElement("span");
        areaText.textContent = school.location || (school.area ? `نطاق الإدارة: ${school.area}` : `الإدارة: ${admin.area}`);
        areaRow.append(areaIcon, areaText);
        details.append(areaRow);

        const sourceRow = document.createElement("div");
        sourceRow.className = "meta-item school-source";
        const sourceIcon = document.createElement("i");
        sourceIcon.className = "fa-solid fa-circle-info";
        const sourceText = document.createElement("span");
        sourceText.textContent = school.source;
        sourceRow.append(sourceIcon, sourceText);
        details.append(sourceRow);
        body.append(details);

        const actions = document.createElement("div");
        actions.className = "card-actions";
        const link = document.createElement("a");
        link.className = "btn-card-visit";
        link.href = school.website || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${school.name}، ${school.mapArea || admin.area}، محافظة الدقهلية، مصر`)}`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        const linkIcon = document.createElement("i");
        linkIcon.className = school.website ? "fa-solid fa-arrow-up-right-from-square" : "fa-solid fa-map-location-dot";
        link.append(linkIcon, document.createTextNode(school.website ? " زيارة الموقع" : " البحث عن المدرسة"));
        actions.append(link);
        body.append(actions);
        card.append(media, body);
        return card;
    }

    function renderSchools() {
        const filtered = getFilteredSchools();
        countBadge.textContent = filtered.length;
        countBadge.classList.remove("count-updated");
        void countBadge.offsetWidth;
        countBadge.classList.add("count-updated");
        schoolsGrid.replaceChildren();
        schoolsGrid.classList.toggle("list-view", state.view === "list");
        categoryChips.querySelectorAll(".category-chip").forEach(chip => {
            chip.classList.toggle("active", chip.dataset.category === state.type);
        });
        if (!filtered.length) {
            const empty = document.createElement("div");
            empty.className = "no-results";
            const icon = document.createElement("i");
            icon.className = "fa-solid fa-magnifying-glass";
            const title = document.createElement("h3");
            title.textContent = "لا توجد مدارس مطابقة";
            const message = document.createElement("p");
            message.textContent = "غيّر كلمات البحث أو خيارات التصفية لعرض النتائج.";
            empty.append(icon, title, message);
            schoolsGrid.append(empty);
            return;
        }
        const fragment = document.createDocumentFragment();
        filtered.forEach((school, index) => fragment.append(createSchoolCard(school, index)));
        schoolsGrid.append(fragment);
        schoolsGrid.querySelectorAll(".school-card").forEach(reveal);
    }

    typeFilter.addEventListener("change", () => {
        state.type = typeFilter.value;
        renderSchools();
    });
    areaFilter.addEventListener("change", () => {
        state.area = areaFilter.value;
        renderSchools();
    });
    sortFilter.addEventListener("change", () => {
        state.sort = sortFilter.value;
        renderSchools();
    });
    searchInput.addEventListener("input", () => {
        state.query = searchInput.value;
        clearSearch.style.display = state.query ? "block" : "none";
        renderSchools();
    });
    clearSearch.addEventListener("click", () => {
        searchInput.value = "";
        state.query = "";
        clearSearch.style.display = "none";
        searchInput.focus();
        renderSchools();
    });
    document.getElementById("viewGridBtn").addEventListener("click", event => {
        state.view = "grid";
        document.getElementById("viewGridBtn").classList.add("active");
        document.getElementById("viewListBtn").classList.remove("active");
        renderSchools();
    });
    document.getElementById("viewListBtn").addEventListener("click", () => {
        state.view = "list";
        document.getElementById("viewListBtn").classList.add("active");
        document.getElementById("viewGridBtn").classList.remove("active");
        renderSchools();
    });

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const backdrop = document.getElementById("navBackdrop");
    const closeMenu = () => {
        navLinks.classList.remove("active");
        backdrop.classList.remove("show");
        document.body.classList.remove("menu-locked");
    };
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        backdrop.classList.toggle("show");
        document.body.classList.toggle("menu-locked", navLinks.classList.contains("active"));
    });
    document.getElementById("drawerCloseBtn").addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", closeMenu));

    const unassignedSection = document.getElementById("unassignedSection");
    const unassignedNotice = document.getElementById("unassignedNotice");
    if (unassignedSchools.length) {
        unassignedSection.hidden = false;
        unassignedNotice.textContent = `هذه المدارس وردت للمنصورة دون تحديد هل تتبع إدارة شرق أم غرب؛ لذلك تظهر منفصلة ولا تُحسب ضمن مدارس الإدارة المعروضة بالأعلى.`;
        const unassignedGrid = document.getElementById("unassignedSchoolsGrid");
        const fragment = document.createDocumentFragment();
        unassignedSchools.forEach((school, index) => fragment.append(createSchoolCard(school, index)));
        unassignedGrid.append(fragment);
        unassignedGrid.querySelectorAll(".school-card").forEach(reveal);
    }

    const backToTop = document.getElementById("backToTop");
    const scrollProgress = document.createElement("div");
    scrollProgress.className = "scroll-progress";
    scrollProgress.setAttribute("aria-hidden", "true");
    document.body.prepend(scrollProgress);
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 400);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        scrollProgress.style.transform = `scaleX(${progress})`;
        revealVisible();
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    renderSchools();
    revealVisible();
})();
