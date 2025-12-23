// Mobile nav toggle: accessible hamburger for small screens
(() => {
	const toggle = document.querySelector('.nav__toggle');
	const menu = document.querySelector('.nav__menu');
	if (!toggle || !menu) return;

	const closeTopbarMenus = () => {
		document.querySelectorAll('details.topbar__menu[open]').forEach((el) => {
			el.removeAttribute('open');
		});
	};

	const links = menu.querySelectorAll('a.nav__link');
	const setExpanded = (expanded) => {
		toggle.setAttribute('aria-expanded', String(expanded));
		menu.classList.toggle('open', expanded);
		document.body.style.overflow = expanded ? 'hidden' : '';
		if (expanded) closeTopbarMenus();
	};

	toggle.addEventListener('click', () => {
		const expanded = toggle.getAttribute('aria-expanded') === 'true';
		setExpanded(!expanded);
	});

	// Close menu when a link is clicked (single-page feel)
	links.forEach((link) => {
		link.addEventListener('click', () => setExpanded(false));
	});

	// Close on Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') setExpanded(false);
	});

	// Click outside to close
	document.addEventListener('click', (e) => {
		if (!menu.classList.contains('open')) return;
		const withinNav = e.target.closest('.nav');
		if (!withinNav) setExpanded(false);
	});
})();

// Theme toggle with localStorage
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');
// Ensure a default theme is set on every page
if (savedTheme === 'light' || savedTheme === 'dark') {
	root.setAttribute('data-theme', savedTheme);
} else {
	root.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark');
}
if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		root.setAttribute('data-theme', current);
		localStorage.setItem('theme', current);
	});
}

// Topbar dropdowns: keep only one open at a time
(() => {
	const menus = Array.from(document.querySelectorAll('details.topbar__menu'));
	const closeTopbarMenus = () => {
		document.querySelectorAll('details.topbar__menu[open]').forEach((el) => {
			el.removeAttribute('open');
		});
	};

	// Click outside to close
	document.addEventListener('click', (e) => {
		if (!document.querySelector('details.topbar__menu[open]')) return;
		const withinMenu = e.target.closest('details.topbar__menu');
		if (!withinMenu) closeTopbarMenus();
	});

	// Close on Escape
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeTopbarMenus();
	});

	// If any other <details> dropdown is opened, close the topbar menu(s)
	const otherDetails = Array.from(document.querySelectorAll('details:not(.topbar__menu)'));
	otherDetails.forEach((el) => {
		el.addEventListener('toggle', () => {
			if (el.open) closeTopbarMenus();
		});
	});

	if (menus.length < 2) return;

	menus.forEach((menu) => {
		menu.addEventListener('toggle', () => {
			if (!menu.open) return;
			menus.forEach((other) => {
				if (other !== menu) other.removeAttribute('open');
			});
		});
	});
})();
