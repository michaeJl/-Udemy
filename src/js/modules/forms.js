import checkNum from './checkNum';
import closeModals from './closeModals';

const forms = (state) => {
    const form =  document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNum('input[name="user_phone"]');
    
    const message = {
        loading: 'Loading...',
        success: 'Success',
        error: 'error'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    }

    const postData = async (url,data) => {
        document.querySelector('.status').textContent = message.loading;

        let res = await fetch(url, {
            method: 'POST',
            body: data,
        });

        return await res.text();
    };

    form.forEach(item => {
        item.addEventListener('submit', (e)=> {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc-end') === 'end') {
                for (const key in state) {
                    formData.append(key,state[key]);
                }
            }

            postData('assets/server.php',formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(()=> {
                    statusMessage.textContent = message.error;
                })
                .finally(()=> {
                    clearInputs();
                    for (const key in state) {
                        delete state[key];
                    };
                    setTimeout(()=> {
                        statusMessage.remove();
                        closeModals();
                        document.body.classList.remove('modal-open');
                    },3000);
                    
                })

        })
    });
}

export default forms;