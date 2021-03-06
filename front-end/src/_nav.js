export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-pie-chart',
     /// tipoUsuario: '3','1','2',//coordinador
     
    },
    /*{
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },*/
    {
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
      tipoUsuario: 'aaa',//extra
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
      tipoUsuario: 'aaa',//extra
    },
    /*{
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },*/

    //MENU PARA
    //TIPO DE USUARIO Profesor
  {
    name:'Nuevo Enunciado',
    url: '/enunciadosPro/nuevo',
     tipoUsuario: '3',//coordinador
     icon: 'icon-note',
  },
  {
    name:'Lista de Enunciados',
    url: '/enunciadosPro',
    icon: 'icon-list',
     tipoUsuario: '3',//coordinador
  },

    //MENU PARA
    //TIPO DE USUARIO Profesor
  {
    name:'Nuevo Enunciado',
    url: '/enunciadosPro/nuevo',
    icon: 'icon-note',
     tipoUsuario: '2',//Profesor
  },
  {
    name:'Lista de Enunciados',
    url: '/enunciadosPro',
    icon: 'icon-list',
     tipoUsuario: '2',//Profesor
  },
   

    //MENU PARA
    //TIPO DE USUARIO ALUMNO
    {
      name:'Enunciados',
      url: '/enunciados',
      icon: 'icon-list',
      tipoUsuario: '1',//ALUMNO
    },
    {
      name:'Consola Libre',
      url: '/consola',
      icon: 'icon-note',
      tipoUsuario: '1',//ALUMNO 
      children:[
        {
          name:'Python',
          url: '/consola/python',
          icon: 'icon-doc',

        },
        {
          name:'C',
          url: '/consola/c_cpp',
          icon: 'icon-doc',

        },
        {
          name:'Java',
          url:'/consola/java',
          icon: 'icon-doc',

        }
      ]
    },
    {
      name: 'Base',
      url: '/base',
      icon: 'icon-puzzle',
      tipoUsuario: 'aaa',//extra
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/buttons',
      icon: 'icon-cursor',
      tipoUsuario: 'aaa',//extra
      children: [
        {
          name: 'Buttons',
          url: '/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart',
      tipoUsuario: 'aaa',//extra
    },
    {
      name: 'Icons',
      url: '/icons',
      icon: 'icon-star',
      tipoUsuario: 'aaa',//extra
      children: [
        {
          name: 'CoreUI Icons',
          url: '/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/notifications',
      icon: 'icon-bell',
      tipoUsuario: 'aaa',//extra
      children: [
        {
          name: 'Alerts',
          url: '/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/widgets',
      icon: 'icon-calculator',
      tipoUsuario: 'aaa',//extra
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    /*{
     divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },*/
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      tipoUsuario: 'aaa',//extra
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    /*{
      name: 'Download CoreUI',
      url: 'http://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
    },
    {
      name: 'Try CoreUI PRO',
      url: 'http://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
    },*/
  ],
};
