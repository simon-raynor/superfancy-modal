import './style.css'

function init() {
    const btns = document.querySelectorAll('.btns button');
    const modal = document.getElementById('modal')!;

    function openModal(evt: Event) {
        if (evt instanceof PointerEvent) {
            modal.style.setProperty('--evtx-in', `${evt.pageX - window.scrollX}px`);
            modal.style.setProperty('--evty-in', `${evt.pageY - window.scrollY}px`);
        }
        const classname = (evt.target as HTMLElement).getAttribute('data-modal')!;
        modal.classList.add(classname);
        modal.setAttribute('data-modal', classname);
        requestAnimationFrame(_ => {
            modal.classList.add('open', 'active');
        });
    }

    function closeModal(evt: Event) {
        if (evt instanceof PointerEvent) {
            modal.style.setProperty('--evtx-out', `${evt.pageX - window.scrollX}px`);
            modal.style.setProperty('--evty-out', `${evt.pageY - window.scrollY}px`);
        }

        modal.classList.remove('open');

        const ac = new AbortController();

        const cleanup = () => {
            const classname = modal.getAttribute('data-modal')!;
            modal.classList.remove('active', classname);
            ac.abort();
        }

        modal.addEventListener('animationend', cleanup, { signal: ac.signal });

        modal.addEventListener('transitionend', cleanup, { signal: ac.signal });
    }

    btns.forEach(btn => {
        btn.addEventListener('click', openModal)
    });
    modal.querySelector('button')?.addEventListener('click', closeModal);
}

document.addEventListener('DOMContentLoaded', init);