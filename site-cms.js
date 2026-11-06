(() => {
    "use strict";

    const STORAGE_KEY = "site_cms_v1";
    const readSettings = () => {
        try {
            const settings = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
            return settings && typeof settings === "object" ? settings : {};
        } catch (error) {
            console.error("تعذر قراءة إعدادات الموقع.", error);
            return {};
        }
    };

    const settings = readSettings();
    const content = settings.content || {};
    const images = settings.images || {};

    function safeImage(value) {
        const source = String(value || "").trim();
        if (/^data:image\/(?:png|jpe?g|webp|gif);base64,/i.test(source)) return source;
        if (/^https:\/\//i.test(source)) return source;
        if (/^(?:\.{1,2}\/)?[^:]+?\.(?:png|jpe?g|webp|gif|svg)(?:[?#].*)?$/i.test(source)) return source;
        return "";
    }

    function safeLink(value) {
        const link = String(value || "").trim();
        if (/^(?:https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(link)) return link;
        if (/^[\w.-]+(?:\/[\w .%()\-]*)*$/i.test(link)) return link;
        return "#";
    }

    function setText(selector, value) {
        const element = document.querySelector(selector);
        if (!element || value == null) return;
        const textNodes = Array.from(element.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        if (textNodes.length) {
            textNodes[0].nodeValue = ` ${value} `;
            textNodes.slice(1).forEach(node => node.remove());
        } else {
            element.append(document.createTextNode(String(value)));
        }
    }

    function setPlainText(selector, value) {
        const element = document.querySelector(selector);
        if (element && value != null) element.textContent = String(value);
    }

    function validIcon(value, prefix = "fa-solid") {
        const icon = String(value || "").trim();
        return /^fa-[a-z0-9-]+$/i.test(icon) ? icon : "fa-circle";
    }

    function applyContent() {
        const textTargets = {
            noticeBadgeText: ".notice-badge",
            noticeText: ".notice-text",
            topSchoolsLink: ".top-bar-links a:first-child",
            topServicesLink: ".top-bar-links a:last-child",
            ministry: ".sub-ministry",
            mainTitle: ".main-title",
            tagline: ".tagline",
            mobileMinistry: ".mobile-drawer-subtitle",
            mobileTitle: ".mobile-drawer-title",
            headerCta: ".btn-header-cta",
            heroPill: ".hero-pill",
            heroDescription: ".hero-desc",
            heroPrimary: ".hero-buttons .btn-primary",
            heroSecondary: ".hero-buttons .btn-secondary",
            emblemTitle: ".hero-emblem-card h4",
            emblemDescription: ".hero-emblem-card p",
            filterTitle: ".filter-title",
            schoolsEyebrow: ".schools-section .section-subtitle",
            schoolsTitle: ".schools-section .section-main-title",
            servicesEyebrow: ".services-section .section-subtitle",
            servicesTitle: ".services-section .section-main-title",
            aboutEyebrow: ".about-section .section-subtitle",
            aboutTitle: ".about-section .section-main-title",
            aboutDescription: ".about-content > p",
            aboutButton: ".about-content > div a",
            aboutOverlayTitle: ".about-overlay-card h5",
            aboutAddress: ".about-overlay-card p",
            scopeLocation: ".footer-contact-item span",
            footerBrandDescription: ".footer-brand-info > p",
            quickLinksTitle: ".footer-container .footer-col:nth-child(2) h4",
            platformsTitle: ".footer-container .footer-col:nth-child(3) h4",
            scopeTitle: ".footer-container .footer-col:nth-child(4) h4",
            footerCopyright: ".footer-bottom-inner > div:last-child"
        };
        Object.entries(textTargets).forEach(([key, selector]) => {
            if (content[key] !== undefined) setText(selector, content[key]);
        });

        if (content.heroTitle !== undefined || content.heroHighlight !== undefined) {
            const title = document.querySelector(".hero-title");
            const highlight = title && title.querySelector("span");
            if (title && content.heroTitle !== undefined) {
                const firstText = Array.from(title.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                if (firstText) firstText.nodeValue = ` ${content.heroTitle} `;
            }
            if (highlight && content.heroHighlight !== undefined) highlight.textContent = content.heroHighlight;
        }

        if (content.pageTitle) document.title = content.pageTitle;
        const mobileCta = document.querySelector(".mobile-drawer-cta a");
        if (mobileCta && content.heroSecondary) setText(".mobile-drawer-cta a", content.heroSecondary);

        if (Array.isArray(settings.navigation)) {
            const list = document.querySelector(".nav-links");
            if (list) {
                const header = list.querySelector(".mobile-drawer-header");
                const mobileCtaItem = list.querySelector(".mobile-drawer-cta");
                const dashboardLabel = document.createElement("li");
                dashboardLabel.className = "nav-label-only";
                const dashboardIcon = document.createElement("i");
                dashboardIcon.className = "fa-solid fa-gauge-high";
                dashboardLabel.append(dashboardIcon, document.createTextNode(" لوحة التحكم"));
                list.replaceChildren();
                if (header) list.append(header);
                settings.navigation.forEach(item => {
                    if (!item || !item.text) return;
                    const target = safeLink(item.href);
                    if (new URL(target, location.href).pathname.toLowerCase().endsWith("/admin.html")) return;
                    const li = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = target;
                    link.className = item.href === "#hero" ? "active" : "awas";
                    const icon = document.createElement("i");
                    icon.className = `fa-solid ${validIcon(item.icon)}`;
                    link.append(icon, document.createTextNode(` ${item.text}`));
                    li.append(link);
                    list.append(li);
                });
                list.append(dashboardLabel);
                if (mobileCtaItem) list.append(mobileCtaItem);
            }
        }
    }

    function appendIcon(iconName, className) {
        const icon = document.createElement("i");
        icon.className = `${className || "fa-solid"} ${validIcon(iconName)}`;
        return icon;
    }

    function applyFeatures() {
        if (!Array.isArray(settings.features)) return;
        const container = document.querySelector(".about-features");
        if (!container) return;
        const fragment = document.createDocumentFragment();
        settings.features.forEach(feature => {
            if (!feature) return;
            const item = document.createElement("div");
            item.className = "about-feat-item";
            item.append(appendIcon("fa-check-circle"), document.createTextNode(` ${feature}`));
            fragment.append(item);
        });
        container.replaceChildren(fragment);
    }

    function applyStats() {
        if (!Array.isArray(settings.stats)) return;
        const grid = document.querySelector(".stats-grid");
        if (!grid) return;
        const fragment = document.createDocumentFragment();
        settings.stats.forEach(stat => {
            const item = document.createElement("div");
            item.className = "stat-item";
            const iconWrap = document.createElement("div");
            iconWrap.className = "stat-icon";
            iconWrap.append(appendIcon(stat.icon));
            const info = document.createElement("div");
            const number = document.createElement("div");
            number.className = "stat-number";
            number.textContent = stat.number || "";
            const label = document.createElement("div");
            label.className = "stat-label";
            label.textContent = stat.label || "";
            info.append(number, label);
            item.append(iconWrap, info);
            fragment.append(item);
        });
        grid.replaceChildren(fragment);
    }

    function applyServices() {
        if (!Array.isArray(settings.services)) return;
        const grid = document.querySelector(".services-grid");
        if (!grid) return;
        const fragment = document.createDocumentFragment();
        settings.services.forEach(service => {
            const card = document.createElement("article");
            card.className = "service-card";
            const iconWrap = document.createElement("div");
            iconWrap.className = "service-icon-wrap";
            iconWrap.append(appendIcon(service.icon));
            const title = document.createElement("h4");
            title.className = "service-title";
            title.textContent = service.title || "";
            const description = document.createElement("p");
            description.className = "service-desc";
            description.textContent = service.description || "";
            const link = document.createElement("a");
            link.className = "service-link";
            link.href = safeLink(service.link);
            if (/^https?:\/\//i.test(link.href)) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
            link.append(document.createTextNode(` ${service.linkText || "عرض الخدمة"} `));
            link.append(appendIcon("fa-arrow-left"));
            card.append(iconWrap, title, description, link);
            fragment.append(card);
        });
        grid.replaceChildren(fragment);
    }

    function applyFooterLinks() {
        const lists = document.querySelectorAll(".footer-links-list");
        [
            [lists[0], settings.quickLinks, "fa-chevron-left"],
            [lists[1], settings.platforms, "fa-arrow-up-right-from-square"]
        ].forEach(([list, links, iconName]) => {
            if (!list || !Array.isArray(links)) return;
            const fragment = document.createDocumentFragment();
            links.forEach(item => {
                const li = document.createElement("li");
                const link = document.createElement("a");
                link.href = safeLink(item.href);
                if (/^https?:\/\//i.test(link.href)) {
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                }
                link.append(appendIcon(iconName), document.createTextNode(` ${item.text || ""}`));
                li.append(link);
                fragment.append(li);
            });
            list.replaceChildren(fragment);
        });
    }

    function applyImages() {
        const logo = safeImage(images.brandLogo);
        const eagle = safeImage(images.eagle);
        const emblem = safeImage(images.emblem);
        const favicon = safeImage(images.favicon);
        const about = safeImage(images.aboutImage);

        if (logo) document.querySelectorAll(".brand-logo, .mobile-drawer-logo").forEach(image => {
            image.src = logo;
            if (content.brandLogoAlt) image.alt = content.brandLogoAlt;
        });
        if (eagle) document.querySelectorAll(".brand-eagle").forEach(image => {
            image.src = eagle;
            if (content.eagleAlt) image.alt = content.eagleAlt;
        });
        if (emblem) {
            const image = document.querySelector(".hero-emblem-card img");
            if (image) {
                image.src = emblem;
                if (content.emblemAlt) image.alt = content.emblemAlt;
            }
        } else if (logo) {
            const image = document.querySelector(".hero-emblem-card img");
            if (image) {
                image.src = logo;
                if (content.emblemAlt) image.alt = content.emblemAlt;
            }
        }
        if (about) {
            const image = document.querySelector(".about-image-side img");
            if (image) {
                image.src = about;
                if (content.aboutImageAlt) image.alt = content.aboutImageAlt;
            }
        }
        if (favicon) document.querySelectorAll('link[rel="shortcut icon"]').forEach(link => { link.href = favicon; });
        const background = safeImage(images.heroBackground);
        if (background) {
            const hero = document.querySelector(".hero-section");
            if (hero) {
                hero.style.backgroundImage = `linear-gradient(115deg, rgba(16, 76, 99, .42), rgba(16, 76, 99, .22)), url(${JSON.stringify(background)})`;
                hero.style.backgroundSize = "cover";
                hero.style.backgroundPosition = "center";
            }
        }
    }

    function elementSelector(element) {
        if (element.id) return `#${CSS.escape(element.id)}`;
        const segments = [];
        let current = element;
        while (current && current !== document.body) {
            if (current.hasAttribute("data-id")) {
                segments.unshift(`[data-id="${current.getAttribute("data-id").replace(/"/g, '\\"')}"]`);
                break;
            }
            let segment = current.tagName.toLowerCase();
            if (current.parentElement) {
                const sameType = Array.from(current.parentElement.children).filter(child => child.tagName === current.tagName);
                if (sameType.length > 1) segment += `:nth-of-type(${sameType.indexOf(current) + 1})`;
            }
            segments.unshift(segment);
            if (current.parentElement && current.parentElement.id) {
                segments.unshift(`#${CSS.escape(current.parentElement.id)}`);
                break;
            }
            current = current.parentElement;
        }
        return segments.join(" > ");
    }

    function getTextNode(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                const parent = node.parentElement;
                if (!parent || parent.closest("script, style, i, svg, button[data-no-text-edit]")) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        return walker.nextNode();
    }

    function applyTextOverrides() {
        if (!Array.isArray(settings.textOverrides)) return;
        settings.textOverrides.forEach(item => {
            try {
                const element = document.querySelector(item.selector);
                if (!element) return;
                let textNode = element.childNodes[item.nodeIndex];
                if (!textNode || textNode.nodeType !== Node.TEXT_NODE) textNode = getTextNode(element);
                if (textNode) textNode.nodeValue = item.value;
            } catch (error) {
                console.warn("تعذر تطبيق تعديل نص مرئي.", error);
            }
        });
    }

    function startVisualEditor() {
        if (new URLSearchParams(location.search).get("editor") !== "1") return;
        document.body.classList.add("visual-editor-active");
        const style = document.createElement("style");
        style.textContent = `
            .visual-editor-active [data-visual-hover] { outline: 2px dashed var(--primary) !important; outline-offset: 3px; cursor: text !important; }
            .visual-editor-bar { position: fixed; inset: 12px 12px auto; z-index: 99999; display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 11px 15px; border: 1px solid rgba(136,188,196,.2); border-radius: 14px; background: #0b1c22; color: #e5f1f2; box-shadow: 0 8px 26px rgba(0,0,0,.3); font: 700 13px Cairo, sans-serif; }
            .visual-editor-bar button { padding: 7px 12px; border: 0; border-radius: 9px; background: var(--primary); color: #071016; font: inherit; }
            .visual-editor-backdrop { position: fixed; inset: 0; z-index: 100000; display: grid; place-items: center; padding: 18px; background: rgba(2, 8, 12, .78); }
            .visual-editor-dialog { width: min(100%, 480px); padding: 22px; border: 1px solid rgba(136,188,196,.18); border-radius: 17px; background: #0e1c24; color: #e5f1f2; box-shadow: 0 20px 60px rgba(0,0,0,.4); font: 14px Cairo, sans-serif; }
            .visual-editor-dialog h2 { margin: 0 0 6px; font-size: 19px; }
            .visual-editor-dialog p { margin: 0 0 14px; color: #91a8ad; font-size: 12px; }
            .visual-editor-dialog textarea { width: 100%; min-height: 110px; padding: 10px; border: 1px solid rgba(136,188,196,.2); border-radius: 10px; background: #071016; color: inherit; font: inherit; resize: vertical; }
            .visual-editor-dialog-actions { margin-top: 13px; display: flex; gap: 8px; }
            .visual-editor-dialog-actions button { padding: 8px 14px; border: 0; border-radius: 9px; background: var(--primary); color: #071016; font: 700 12px Cairo, sans-serif; }
            .visual-editor-dialog-actions button:last-child { background: #172a32; color: #c4d6d7; }
            body.visual-editor-active { padding-top: 62px; }
        `;
        document.head.append(style);
        const bar = document.createElement("div");
        bar.className = "visual-editor-bar";
        const message = document.createElement("span");
        message.textContent = "المحرر المرئي: اضغط على أي نص لتعديله وحفظه مباشرة.";
        const close = document.createElement("button");
        close.type = "button";
        close.textContent = "إنهاء التحرير";
        close.addEventListener("click", () => {
            const url = new URL(location.href);
            url.searchParams.delete("editor");
            location.href = url.href;
        });
        bar.append(message, close);
        document.body.append(bar);

        document.addEventListener("mouseover", event => {
            const element = event.target instanceof Element ? event.target.closest("body *") : null;
            if (element && !bar.contains(element) && getTextNode(element)) element.setAttribute("data-visual-hover", "");
        });
        document.addEventListener("mouseout", event => {
            const element = event.target instanceof Element ? event.target.closest("[data-visual-hover]") : null;
            if (element) element.removeAttribute("data-visual-hover");
        });
        document.addEventListener("click", event => {
            const element = event.target instanceof Element ? event.target.closest("body *") : null;
            if (!element || bar.contains(element) || element.closest(".visual-editor-backdrop")) return;
            const node = getTextNode(element);
            if (!node) return;
            event.preventDefault();
            event.stopPropagation();
            const target = node.parentElement;
            const selector = elementSelector(target);
            const nodeIndex = Array.from(target.childNodes).indexOf(node);
            const backdrop = document.createElement("div");
            backdrop.className = "visual-editor-backdrop";
            const dialog = document.createElement("form");
            dialog.className = "visual-editor-dialog";
            const heading = document.createElement("h2");
            heading.textContent = "تعديل النص";
            const hint = document.createElement("p");
            hint.textContent = "سيظهر التعديل على هذا الجهاز بعد حفظه.";
            const textarea = document.createElement("textarea");
            textarea.value = node.nodeValue.trim();
            textarea.setAttribute("aria-label", "النص الجديد");
            const actions = document.createElement("div");
            actions.className = "visual-editor-dialog-actions";
            const save = document.createElement("button");
            save.type = "submit";
            save.textContent = "حفظ النص";
            const cancel = document.createElement("button");
            cancel.type = "button";
            cancel.textContent = "إلغاء";
            cancel.addEventListener("click", () => backdrop.remove());
            actions.append(save, cancel);
            dialog.append(heading, hint, textarea, actions);
            dialog.addEventListener("submit", saveEvent => {
                saveEvent.preventDefault();
                const value = textarea.value;
                node.nodeValue = value;
                const existing = (settings.textOverrides || []).find(item => item.selector === selector && item.nodeIndex === nodeIndex);
                if (existing) existing.value = value;
                else {
                    if (!Array.isArray(settings.textOverrides)) settings.textOverrides = [];
                    settings.textOverrides.push({ selector, nodeIndex, value });
                }
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
                    message.textContent = "تم حفظ النص. اضغط على نص آخر للمتابعة.";
                    backdrop.remove();
                } catch (error) {
                    console.error("تعذر حفظ النص المرئي.", error);
                    hint.textContent = "تعذر الحفظ؛ مساحة التخزين في المتصفح ممتلئة.";
                }
            });
            backdrop.addEventListener("click", backdropEvent => {
                if (backdropEvent.target === backdrop) backdrop.remove();
            });
            backdrop.append(dialog);
            document.body.append(backdrop);
            textarea.focus();
        }, true);
    }

    function applyAll() {
        applyContent();
        applyImages();
        applyFeatures();
        applyStats();
        applyServices();
        applyFooterLinks();
        applyTextOverrides();
        startVisualEditor();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyAll, { once: true });
    } else {
        applyAll();
    }

    if (Array.isArray(settings.textOverrides) && settings.textOverrides.length) {
        const observer = new MutationObserver(() => applyTextOverrides());
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
})();
