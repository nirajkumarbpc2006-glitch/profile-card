/**
 * Personal Profile Card - 3D Gyro/Tilt & Interactive Controls
 */

document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('profileCard');
    const wrapper = document.querySelector('.card-wrapper');
    const shareBtn = document.getElementById('shareCardBtn');
    const toast = document.getElementById('toast');
    const modal = document.getElementById('skillsModal');
    const openModalBtn = document.getElementById('openSkillsModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // 1. 3D Tilt Effect on Mouse Move
    if (wrapper && card && window.innerWidth > 768) {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within element.
            const y = e.clientY - rect.top;  // y position within element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });

        wrapper.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    }

    // 2. Share / Copy Link Toast
    shareBtn?.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            showToast();
        }).catch(() => {
            showToast();
        });
    });

    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 3. Quick Info Modal
    openModalBtn?.addEventListener('click', () => {
        modal.classList.add('open');
    });

    closeModalBtn?.addEventListener('click', () => {
        modal.classList.remove('open');
    });

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('open')) {
            modal.classList.remove('open');
        }
    });
});
