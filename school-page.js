(() => {
    "use strict";

    const administrations = [
        { id: 1, name: "إدارة شرق المنصورة التعليمية", area: "المنصورة", image: "unnamed.jpg" },
        { id: 2, name: "إدارة غرب المنصورة التعليمية", area: "المنصورة", image: "unnamed (1).jpg" },
        { id: 3, name: "إدارة طلخا التعليمية", area: "طلخا", image: "unnamed (2).jpg" },
        { id: 4, name: "إدارة السنبلاوين التعليمية", area: "السنبلاوين", image: "0ba5ffc0-292e-40b1-9998-2c21a95eeb9b.png", website: "https://al-edara-esnblawen.vercel.app/" },
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
        ["#183c42", "#dfaa55", "#f4f0e7"], ["#263b61", "#e7a25b", "#f4f1ed"],
        ["#55413e", "#d9af68", "#f4eee6"], ["#31483c", "#e7c56e", "#f0f2e9"],
        ["#343f69", "#e4956b", "#eff0f4"], ["#60464e", "#e0b56a", "#f4eeeb"],
        ["#285552", "#e2b665", "#edf3ee"], ["#4c465e", "#d6a86e", "#f1eff3"],
        ["#425343", "#d9a77d", "#f1f0e7"], ["#31536a", "#e4ae62", "#edf2f4"],
        ["#584b35", "#c58d5b", "#f4f0e6"], ["#3e4c61", "#d4b264", "#edf0f3"],
        ["#584543", "#dfa883", "#f3eeeb"], ["#31564f", "#dab976", "#eef2e9"],
        ["#394b70", "#e3a165", "#eff1f4"], ["#5b4d60", "#dbb66a", "#f1edf3"],
        ["#3d5148", "#cf9c64", "#f0f1e8"]
    ];

    function readLocalAdministration(id) {
        for (const key of ["site_cms_v1", "admin_schools"]) {
            try {
                const saved = JSON.parse(localStorage.getItem(key) || "null");
                const list = key === "site_cms_v1" ? saved && saved.schools : saved;
                if (Array.isArray(list)) {
                    const match = list.find(item => String(item.id) === String(id));
                    if (match) return match;
                }
            } catch (error) {
                console.warn(`تعذر قراءة بيانات الإدارات من ${key}.`, error);
            }
        }
        return null;
    }

    const params = new URLSearchParams(location.search);
    const requestedId = Number(params.get("id"));
    const base = administrations.find(item => item.id === requestedId);
    const saved = base && readLocalAdministration(requestedId);
    const admin = base && saved ? { ...base, ...saved } : base;

    if (!admin) {
        document.querySelector("main").innerHTML = '<section class="not-found"><h1>الإدارة غير موجودة</h1><p>اختر إدارة من دليل إدارات الدقهلية.</p><a class="button button-main" href="index.html">العودة إلى الدليل</a></section>';
    } else {
        const [primary, accent, paper] = palettes[(admin.id - 1) % palettes.length];
        document.body.dataset.layout = String((admin.id - 1) % 4 + 1);
        document.documentElement.style.setProperty("--admin-primary", primary);
        document.documentElement.style.setProperty("--admin-accent", accent);
        document.documentElement.style.setProperty("--admin-paper", paper);

        const description = admin.description || `${admin.name} بمحافظة الدقهلية. بوابتكم للتعرّف على الخدمات والمنصات التعليمية والوصول إلى معلومات الإدارة.`;
        const image = typeof admin.image === "string" && admin.image.trim() ? admin.image : base.image;
        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${admin.name}، مدينة ${admin.area}، محافظة الدقهلية، مصر`)}`;
        document.querySelectorAll("[data-name]").forEach(element => { element.textContent = admin.name; });
        document.querySelectorAll("[data-area]").forEach(element => { element.textContent = admin.area; });
        document.querySelectorAll("[data-description]").forEach(element => { element.textContent = description; });
        document.querySelectorAll("[data-image]").forEach(element => {
            element.src = image;
            element.alt = admin.name;
            element.addEventListener("error", () => { element.src = "re.jpg"; }, { once: true });
        });
        document.querySelectorAll("[data-map]").forEach(element => { element.href = mapUrl; });
        document.querySelector("[data-number]").textContent = String(admin.id).padStart(2, "0");
        document.querySelector("[data-year]").textContent = new Date().getFullYear();
        document.title = `${admin.name} | بوابة تعليم الدقهلية`;
        document.querySelector('meta[name="description"]').content = description;

        if (typeof admin.link === "string" && /^https?:\/\//i.test(admin.link) && !/google\.[^/]+\/maps/i.test(admin.link)) {
            const websiteLink = document.createElement("a");
            websiteLink.className = "text-link";
            websiteLink.href = admin.link;
            websiteLink.target = "_blank";
            websiteLink.rel = "noopener noreferrer";
            websiteLink.textContent = "زيارة الموقع الإلكتروني للإدارة";
            document.querySelector(".about-copy").append(websiteLink);
        } else if (base.website) {
            const websiteLink = document.createElement("a");
            websiteLink.className = "text-link";
            websiteLink.href = base.website;
            websiteLink.target = "_blank";
            websiteLink.rel = "noopener noreferrer";
            websiteLink.textContent = "زيارة الموقع الإلكتروني للإدارة";
            document.querySelector(".about-copy").append(websiteLink);
        }
    }
})();
