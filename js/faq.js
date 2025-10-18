// FAQ toggle
function toggleFAQ(id) {
    const faq = document.getElementById('faq' + id);
    const icon = document.getElementById('icon' + id);
    const open = faq.classList.contains('hidden');
    document.querySelectorAll('[id^=faq]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^=icon]').forEach(el => el.textContent = '+');
    if (open) {
        faq.classList.remove('hidden');
        icon.textContent = '–';
    }
}