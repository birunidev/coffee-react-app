import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";

const {
  HomeIcon,
  CollectionIcon,
  PhotographIcon,
  DocumentTextIcon,
  UsersIcon,
} = require("@heroicons/react/outline");

const menus = [
  {
    title: "Home",
    link: RouteName.DASHBOARD,
    icon: <HomeIcon />,
  },
  {
    title: "Menu",
    link: RouteName.MENUS,
    icon: <CollectionIcon />,
  },
  {
    title: "Media",
    link: RouteName.MEDIA,
    icon: <PhotographIcon />,
  },
  {
    title: "History",
    link: RouteName.HISTORY,
    icon: <DocumentTextIcon />,
  },
  {
    title: "Employees",
    link: RouteName.EMPLOYEES,
    icon: <UsersIcon />,
  },
];

export default menus;
