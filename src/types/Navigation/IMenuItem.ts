export enum MenuItemType {
    Link = 'link',
    Divider = 'divider',
}
export interface IMenuItem {
    id: number,
    title?: string,
    type: MenuItemType,
    to?: string,
    icon?: string,
    subtitle?: string,
}