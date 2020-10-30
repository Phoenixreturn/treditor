import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import colors from 'vuetify/lib/util/colors';
import CircleIcon from '../components/icons/CircleIcon';
import LabelIcon from '../components/icons/LabelIcon';
import LineIcon from '../components/icons/LineIcon';
import RectangleIcon from '../components/icons/RectangleIcon';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      circle: {
        component: CircleIcon, // you can use string here if component is registered globally
        props: {
          // pass props to your component if needed
          name: 'cad-circle',
        },
      },
      rectangle: {
        component: RectangleIcon, // you can use string here if component is registered globally
        props: {
          // pass props to your component if needed
          name: 'cad-rectangle',
        },
      },
      label: {
        component: LabelIcon, // you can use string here if component is registered globally
        props: {
          // pass props to your component if needed
          name: 'cad-label',
        },
      },
      line: {
        component: LineIcon, // you can use string here if component is registered globally
        props: {
          // pass props to your component if needed
          name: 'cad-line',
        },
      },
    },
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        background: colors.indigo.lighten5, // Not automatically applied
      },
      dark: {
        primary: colors.blue.lighten3,
        background: colors.indigo.base, // If not using lighten/darken, use base to return hex
      },
    },
  },
});
