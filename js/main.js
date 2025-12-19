// Mobile nav toggle: accessible hamburger for small screens
(() => {
	const toggle = document.querySelector('.nav__toggle');
	const menu = document.querySelector('.nav__menu');
	if (!toggle || !menu) return;

	const links = menu.querySelectorAll('a.nav__link');
	const setExpanded = (expanded) => {
		toggle.setAttribute('aria-expanded', String(expanded));
		menu.classList.toggle('open', expanded);
		document.body.style.overflow = expanded ? 'hidden' : '';
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
	root.setAttribute('data-theme', 'light');
	localStorage.setItem('theme', 'light');
}
if (themeToggle) {
	themeToggle.addEventListener('click', () => {
		const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		root.setAttribute('data-theme', current);
		localStorage.setItem('theme', current);
	});
}
