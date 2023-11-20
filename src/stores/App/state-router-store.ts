import {IStateRouterStore, MenuItemType} from "@/types";

export const StateRouterStore: IStateRouterStore = {
    menuItems: [
        {
            id: 1,
            title: "Первая лабораторная",
            to: '/firstLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-1',
        },
        {
            id: 2,
            title: "Вторая лабораторная",
            to: '/secondLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-2'
        },
        {
            id: 3,
            title: "Третья лабораторная",
            to: '/thirdLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-3'
        },
        {
            id: 4,
            title: "Четвёртая лабораторная",
            to: '/fourthLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-4'
        },
        {
            id: 5,
            title: "Пятая лабораторная",
            to: '/fifthLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-5'
        },
        {
            id: 6,
            title: "Шестая лабораторная",
            to: '/sixthLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-6'
        },
        {
            id: 7,
            title: "Седьмая лабораторная",
            to: '/seventhLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-7'
        },
        {
            id: 8,
            title: "Восьмая лабораторная",
            to: '/eighthLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-8'
        },
        {
            id: 9,
            title: "Девятая лабораторная",
            to: '/ninthLab',
            type: MenuItemType.Link,
            subtitle: 'Lab-9'
        },
    ]
}