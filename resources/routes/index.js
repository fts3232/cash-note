import loadable from '@loadable/component'
import Layout from 'fts/views/layout';

const AddComponent = loadable(() => import('fts/views/add'));
const DetailComponent = loadable(() => import('fts/views/detail'));
const DashboardComponent = loadable(() => import('fts/views/dashboard'));

const routes = [
    {
        component: Layout,
        routes   : [
            {
                path     : "/",
                exact    : true,
                component: DashboardComponent,
            },
            {
                path     : "/detail/:date?",
                component: DetailComponent
            },
            {
                path     : "/add/",
                component: AddComponent
            },
        ]
    }
];

export default routes;