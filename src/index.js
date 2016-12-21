import injectTapEventPlugin  from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';

import router from './components/router';

injectTapEventPlugin();

ReactDOM.render(router, document.getElementById('root'));
