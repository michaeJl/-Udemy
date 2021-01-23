import closeModals from './closeModals';

const modals = (state) => {
    function bindModal(triggerSelector,modalSelector,closeSelector, closeClickOverlay = true,dependency = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              scroll = calcScroll();

        trigger.forEach((item)=>{
            item.addEventListener('click', (e)=>{
                if ( state.form == undefined && dependency) {
                    return false;
                } else if (e.target) {
                    e.preventDefault();
                    closeModals();
                    modal.style.display = "block";
                    document.body.classList.add('modal-open');
                    document.body.style.marginRight = `${scroll}px`;

                }
            });
        })
        close.addEventListener('click', ()=>{
            closeModals();
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = '0px';
        })
        modal.addEventListener('click', (e)=>{
            if (e.target === modal && closeClickOverlay) {
                closeModals();
                modal.style.display = "none"
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = '0px';
            }
        })
    }

    function showModalByTime(selector,time) {
        setTimeout(()=>{
            document.querySelector(selector).style.display = "block";
            document.body.classList.remove('modal-open');
        },time)
    };

    function calcScroll() {
        let div = document.createElement('div');
         
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
            div.remove();

        return scrollWidth;
    }

    bindModal('.popup_engineer_btn','.popup_engineer','.popup_engineer .popup_close');
    bindModal('.phone_link','.popup','.popup .popup_close');
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close', false);
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false, true);
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    // showModalByTime('.popup',60000);
}   

export default modals;