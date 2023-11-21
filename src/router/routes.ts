import MainPage from "@/views/MainPage.vue";
import FirstLabWrapper from "@/views/NumberMethodsLaboratories/FirstLabWrapper.vue";
import SecondLabWrapper from "@/views/NumberMethodsLaboratories/SecondLabWrapper.vue";
import ThirdLabWrapper from "@/views/NumberMethodsLaboratories/ThirdLabWrapper.vue";
import FourthLabWrapper from "@/views/NumberMethodsLaboratories/FourthLabWrapper.vue";
import FifthLabWrapper from "@/views/NumberMethodsLaboratories/FifthLabWrapper.vue";
import SixthLabWrapper from "@/views/NumberMethodsLaboratories/SixthLabWrapper.vue";
import SeventhLabWrapper from "@/views/NumberMethodsLaboratories/SeventhLabWrapper.vue";
import EighthLabWrapper from "@/views/NumberMethodsLaboratories/EighthLabWrapper.vue";
import NinthLabWrapper from "@/views/NumberMethodsLaboratories/NinthLabWrapper.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: MainPage,
        redirect: {name: 'Main'},
        children: [
            {
                path: '/firstLab',
                name: 'FirstLab',
                component: FirstLabWrapper,
            },
            {
                path: '/secondLab',
                name: 'SecondLab',
                component: SecondLabWrapper,
            },
            {
                path: '/thirdLab',
                name: 'ThirdLab',
                component: ThirdLabWrapper,
            },
            {
                path: '/fourthLab',
                name: 'FourthLab',
                component: FourthLabWrapper,
            },
            {
                path: '/fifthLab',
                name: 'FifthLab',
                component: FifthLabWrapper,
            },
            {
                path: '/sixthLab',
                name: 'SixthLab',
                component: SixthLabWrapper,
            },
            {
                path: '/seventhLab',
                name: 'SeventhLab',
                component: SeventhLabWrapper,
            },
            {
                path: '/eighthLab',
                name: 'EighthLab',
                component: EighthLabWrapper,
            },
            {
                path: '/ninthLab',
                name: 'NinthLab',
                component: NinthLabWrapper,
            }
        ],
    }
]

export default routes
