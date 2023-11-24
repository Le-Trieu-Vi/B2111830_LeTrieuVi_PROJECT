import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import store from '@/store/index.js';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

// modal stuff
import Swal from 'sweetalert2'
window.Swal = Swal;

const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 1500,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

window.Toast = Toast;

import '@fortawesome/fontawesome-free/css/all.css';



// my custom css
import '@/assets/main.css'

const app = createApp(App);
// app.component('fa', FontAwesomeIcon); // trong template ghi la <fa icon="coffee" />
app.use(router);
app.use(store);
app.mount('#app');




