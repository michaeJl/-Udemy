const closeModals = () => {
    const windows = document.querySelectorAll('[data-modal]');

    windows.forEach(item => {
        item.style.display = 'none';
    });
}

export default closeModals;