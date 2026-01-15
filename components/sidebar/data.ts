import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map as MapIcon,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

export const sidebarData = {
  teams: [
    {
      name: "Creotik",
      logo: "/logo.svg",
      plan: "Підприємство",
    },
    {
      name: "Acme Corp.",
      logo: "/logo.svg",
      plan: "Стартап",
    },
    {
      name: "Evil Corp.",
      logo: "/logo.svg",
      plan: "Безкоштовно",
    },
  ],
  navMain: [
    {
      title: "Пісочниця",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Історія", url: "#" },
        { title: "Вибране", url: "#" },
        { title: "Налаштування", url: "#" },
      ],
    },
    {
      title: "Моделі",
      url: "#",
      icon: Bot,
      items: [
        { title: "Генезис", url: "#" },
        { title: "Оглядач", url: "#" },
        { title: "Квант", url: "#" },
      ],
    },
    {
      title: "Документація",
      url: "#",
      icon: BookOpen,
      items: [
        { title: "Вступ", url: "#" },
        { title: "Почати", url: "#" },
        { title: "Підручники", url: "#" },
        { title: "Журнал змін", url: "#" },
      ],
    },
    {
      title: "Налаштування",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Загальні", url: "#" },
        { title: "Команда", url: "#" },
        { title: "Оплата", url: "#" },
        { title: "Ліміти", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Інженерія дизайну", url: "#", icon: Frame },
    { name: "Продажі та маркетинг", url: "#", icon: PieChart },
    { name: "Подорожі", url: "#", icon: MapIcon },
  ],
};
