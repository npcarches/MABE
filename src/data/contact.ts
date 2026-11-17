// Contact details shown on the contact page and in the footer.

export const EMAIL = "mabe.product@gmail.com";
export const INSTAGRAM = { handle: "@mabeproduction", url: "https://instagram.com/mabeproduction" };

export interface Channel {
  label: "Zalo" | "Telegram" | "WhatsApp";
  /** Button style class. */
  cls: "zalo" | "tg" | "wa";
  url: string;
}

export interface Person {
  name: string;
  phone: string;
  channels: Channel[];
}

export const PEOPLE: Person[] = [
  {
    name: "Thành",
    phone: "0703 897 267",
    channels: [
      { label: "Zalo", cls: "zalo", url: "https://zalo.me/0703897267" },
      { label: "Telegram", cls: "tg", url: "https://t.me/+84703897267" },
      { label: "WhatsApp", cls: "wa", url: "https://wa.me/84703897267" },
    ],
  },
  {
    name: "Như",
    phone: "0828 823 623",
    channels: [{ label: "Zalo", cls: "zalo", url: "https://zalo.me/0828823623" }],
  },
];

/** Floating Zalo button target. */
export const MAIN_ZALO = PEOPLE[0].channels[0].url;
