import { MenuOption } from "./menu.option";

export type RouteData<T> = {
  title: string,
  icon: string,
  parentMenu?: MenuOption,
  permission?: T
}
