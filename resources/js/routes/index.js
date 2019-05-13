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
                path: "/fts3232/cash-note/public/",
                exact: true,
                component: DashboardComponent,
            },
            {
                path: "/fts3232/cash-note/public/detail/",
                component: DetailComponent
            },
            {
                path: "/fts3232/cash-note/public/add/",
                component: AddComponent
            },
        ]
    }
];

export default routes;