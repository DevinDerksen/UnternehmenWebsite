// Mobile nav toggle
// (Removed hamburger toggle as per request)

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
