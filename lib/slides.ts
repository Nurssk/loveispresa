export type PhoneScreen =
  | {
      kind: "login";
      label: "Login";
    }
  | {
      kind: "sms";
      label: "SMS";
    }
  | {
      kind: "interests";
      label: "Interests";
    }
  | {
      kind: "home";
      label: "Home";
    }
  | {
      kind: "team";
      label: "Team";
    }
  | {
      kind: "cart";
      label: "Cart";
    }
  | {
      kind: "checkout";
      label: "Checkout";
    };

export type MvpShot = {
  src: string;
  label: string;
};

export type Slide =
  | {
      id: "title";
      kind: "title";
      label: "Обложка";
      title: "Покупать дешевле вместе";
      subtitle: "Коллективные покупки товаров с глобальных маркетплейсов";
      tag: "Мобильное приложение · Expo";
      phone: PhoneScreen;
    }
  | {
      id: "problem";
      kind: "cards";
      label: "Проблема";
      eyebrow: "Проблема";
      title: "Покупать в одиночку — дорого и сложно";
      cards: Array<{ number: string; title: string; text: string }>;
    }
  | {
      id: "solution";
      kind: "solution";
      label: "Решение";
      eyebrow: "Решение";
      title: "BirGe объединяет покупателей в команды";
      steps: Array<{ number: string; title: string; text: string; highlight?: string }>;
      phone: PhoneScreen;
    }
  | {
      id: "flow";
      kind: "flow";
      label: "User flow";
      eyebrow: "User flow";
      title: "Путь пользователя: от входа до checkout";
      steps: Array<{ number: string; title: string; text: string; hot?: boolean }>;
      badge: "+5% к скидке за каждого участника команды";
    }
  | {
      id: "mechanics";
      kind: "mechanics";
      label: "Механика скидки";
      eyebrow: "Механика";
      title: "Каждый участник команды даёт 5% скидки";
      teamLabel: "Команда: 4 человека";
      discount: "−20%";
      oldPrice: "100 000 ₸";
      newPrice: "80 000 ₸";
      saving: "Экономия 20 000 ₸";
      progressLabel: "4 участника · −20%";
      maxLabel: "Максимальная скидка — 30%";
    }
  | {
      id: "mvp";
      kind: "mvp";
      label: "MVP и экраны";
      eyebrow: "MVP";
      title: "MVP в реальных экранах";
      shots: MvpShot[];
    }
  | {
      id: "tech";
      kind: "tech";
      label: "Технологии и развитие";
      eyebrow: "Технологии и развитие";
      title: "Стек сегодня и развитие завтра";
      todayTitle: "Работает сегодня";
      today: string[];
      futureTitle: "Концепты в развитии";
      future: string[];
      qrTitle: "QR-код";
      qrSubtitle: "Expo Web";
      qrNote: "Попробовать MVP в браузере";
    }
  | {
      id: "youtube-founder";
      kind: "reveal";
      label: "Основатель YouTube";
      eyebrow: "Социальное доказательство";
      title: "Мы только что общались с основателем YouTube, и он сказал:";
      revealText: "Наше приложение лучше, чем AliExpress";
    }
  | {
      id: "thanks";
      kind: "thanks";
      label: "Спасибо";
      title: "Спасибо!";
      text: string;
      tag: "Покупать дешевле вместе";
    };

export const slides: Slide[] = [
  {
    id: "youtube-founder",
    kind: "reveal",
    label: "Основатель YouTube",
    eyebrow: "Социальное доказательство",
    title: "Мы только что общались с основателем YouTube, и он сказал:",
    revealText: "Наше приложение лучше, чем AliExpress"
  },
  {
    id: "title",
    kind: "title",
    label: "Обложка",
    title: "Покупать дешевле вместе",
    subtitle: "Коллективные покупки товаров с глобальных маркетплейсов",
    tag: "Мобильное приложение · Expo",
    phone: { kind: "home", label: "Home" }
  },
  {
    id: "problem",
    kind: "cards",
    label: "Проблема",
    eyebrow: "Проблема",
    title: "Покупать в одиночку — дорого и сложно",
    cards: [
      {
        number: "01",
        title: "Полная цена",
        text: "Один покупатель не получает скидок за объём — платит максимум."
      },
      {
        number: "02",
        title: "Сложный путь",
        text: "Чужой маркетплейс, валюта, доставка — каждый заказ как отдельный квест."
      },
      {
        number: "03",
        title: "Каждый сам по себе",
        text: "Друзья хотят те же товары, но покупают порознь и переплачивают."
      }
    ]
  },
  {
    id: "solution",
    kind: "solution",
    label: "Решение",
    eyebrow: "Решение",
    title: "BirGe объединяет покупателей в команды",
    steps: [
      {
        number: "1",
        title: "Персональная лента",
        text: "Рекомендации по выбранным интересам — нужные товары без поиска."
      },
      {
        number: "2",
        title: "Команда",
        text: "Создать команду или присоединиться по коду — за пару секунд.",
        highlight: "Создать команду или присоединиться по коду"
      },
      {
        number: "3",
        title: "Скидка",
        text: "Индивидуальная или командная корзина — командная цена ниже для каждого.",
        highlight: "Индивидуальная или командная корзина"
      }
    ],
    phone: { kind: "team", label: "Team" }
  },
  {
    id: "flow",
    kind: "flow",
    label: "User flow",
    eyebrow: "User flow",
    title: "Путь пользователя: от входа до checkout",
    steps: [
      { number: "1", title: "Вход", text: "Телефон и пароль" },
      { number: "2", title: "SMS-код", text: "Подтверждение номера" },
      { number: "3", title: "Интересы", text: "Категории товаров" },
      { number: "4", title: "Лента", text: "Персональные рекомендации" },
      { number: "5", title: "Команда", text: "Создать или войти по коду", hot: true },
      { number: "6", title: "Корзина", text: "Личная или командная" },
      { number: "7", title: "Checkout", text: "Единый демо-режим" }
    ],
    badge: "+5% к скидке за каждого участника команды"
  },
  {
    id: "mechanics",
    kind: "mechanics",
    label: "Механика скидки",
    eyebrow: "Механика",
    title: "Каждый участник команды даёт 5% скидки",
    teamLabel: "Команда: 4 человека",
    discount: "−20%",
    oldPrice: "100 000 ₸",
    newPrice: "80 000 ₸",
    saving: "Экономия 20 000 ₸",
    progressLabel: "4 участника · −20%",
    maxLabel: "Максимальная скидка — 30%"
  },
  {
    id: "mvp",
    kind: "mvp",
    label: "MVP и экраны",
    eyebrow: "MVP",
    title: "MVP в реальных экранах",
    shots: [
      { src: "/mvp/login.jpg", label: "Вход" },
      { src: "/mvp/home.jpg", label: "Рекомендации" },
      { src: "/mvp/cart.jpg", label: "Корзина" },
      { src: "/mvp/payment.jpg", label: "Оплата" }
    ]
  },
  {
    id: "tech",
    kind: "tech",
    label: "Технологии и развитие",
    eyebrow: "Технологии и развитие",
    title: "Стек сегодня и развитие завтра",
    todayTitle: "Работает сегодня",
    today: [
      "Expo · React Native",
      "Вход по телефону и паролю, подтверждение по SMS",
      "Команды и приглашение по коду",
      "Индивидуальная и командная корзины",
      "Единый демонстрационный checkout"
    ],
    futureTitle: "Концепты в развитии",
    future: [
      "SIM/eSIM ID — концептуальный слой безопасной идентификации",
      "Интеграция marketplace API",
      "AI-рекомендации в ленте",
      "Реальные платежи"
    ],
    qrTitle: "QR-код",
    qrSubtitle: "Expo Web",
    qrNote: "Попробовать MVP в браузере"
  },
  {
    id: "thanks",
    kind: "thanks",
    label: "Спасибо",
    title: "Спасибо!",
    text: "Мы команда из nFactorial: fullstack-инженеры, AI-инженеры и продакт-менеджеры, которые работают в мировых компаниях.",
    tag: "Покупать дешевле вместе"
  }
];
