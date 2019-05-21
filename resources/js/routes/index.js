import loadable from '@loadable/component'
import Layout from '../components/layout';

const AddComponent = loadable(() => import('../components/add'));
const DetailComponent = loadable(() => import('../components/detail'));
const DashboardComponent = loadable(() => import('../components/dashboard'));

const routes = [
    {
        component: Layout,
        routes: [
            {
                path: "/",
                exact: true,
                component: DashboardComponent,
            },
            {
                path: "/detail/:date?",
                component: DetailComponent
            },
            {
                path: "/add/",
                component: AddComponent
            },
        ]
    }
];

export default routes;