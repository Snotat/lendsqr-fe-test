import home from "../../assets/icons/home 1.png";
import users from "../../assets/icons/user-friends 1.png";
import guarantors from "../../assets/icons/users 1.png";
import loans from "../../assets/icons/sack 1.png";
import decision_models from "../../assets/icons/handshake-regular 1.png";
import savings from "../../assets/icons/piggy-bank 1.png";
import loan_requests from "../../assets/icons/Group 104.png";
import white_list from "../../assets/icons/user-check 1.png";
import karma from "../../assets/icons/user-times 1.png";
import organization from "../../assets/icons/briefcase 1.png";
import savings_product from "../../assets/icons/np_bank_148501_000000 1.png";
import fees_and_charges from "../../assets/icons/coins-solid 1.png";
import transactions from "../../assets/icons/icon.png";
import services from "../../assets/icons/galaxy 1.png";
import service_account from "../../assets/icons/user-cog 1.png";
import settlements from "../../assets/icons/scroll 1.png";
import reports from "../../assets/icons/chart-bar 2.png";
import preferences from "../../assets/icons/sliders-h 1.png";
import fees_and_pricing from "../../assets/icons/badge-percent 1.png";
import audit_logs from "../../assets/icons/clipboard-list 1.png";
import systems_messages from "../../assets/icons/icon.png";

export interface SidebarItem {
  title: string;
  icon?: any;
  link?: string;
  children?: SidebarItem[];
}

export const sidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: home,
    link: "/",
  },
  {
    title: "Customers",
    children: [
      {
        title: "Users",
        icon: users,
        link: "/users",
      },
      {
        title: "Guarantors",
        icon: guarantors,
        link: "/guarantors",
      },
      {
        title: "Loans",
        icon: loans,
        link: "/loans",
      },
      {
        title: "Decision Models",
        icon: decision_models,
        link: "/models",
      },
      {
        title: "Savings",
        icon: savings,
        link: "/soewhere",
      },
      {
        title: "Loan Requests",
        icon: loan_requests,
        link: "/soewhere",
      },
      {
        title: "Whitelist",
        icon: white_list,
        link: "/soewhere",
      },
      {
        title: "Karma",
        icon: karma,
        link: "/soewhere",
      },
    ],
  },
  {
    title: "Businesses",
    children: [
      {
        title: "Organization",
        icon: organization,
        link: "/soewhere",
      },
      {
        title: "Loan Products",
        icon: loans,
        link: "/soewhere",
      },
      {
        title: "Savings Products",
        icon: savings_product,
        link: "/soewhere",
      },
      {
        title: "Fees and Charges",
        icon: fees_and_charges,
        link: "/soewhere",
      },
      {
        title: "Transactions",
        icon: transactions,
        link: "/soewhere",
      },
      {
        title: "Services",
        icon: services,
        link: "/soewhere",
      },
      {
        title: "Service Account",
        icon: service_account,
        link: "/soewhere",
      },
      {
        title: "Settlements",
        icon: settlements,
        link: "/soewhere",
      },
      {
        title: "Reports",
        icon: reports,
        link: "/soewhere",
      },
    ],
  },
  {
    title: "Settings",
    children: [
      {
        title: "Preferences",
        icon: preferences,
        link: "/soewhere",
      },
      {
        title: "Fees and Pricing",
        icon: fees_and_pricing,
        link: "/soewhere",
      },
      {
        title: "Audit Logs",
        icon: audit_logs,
        link: "/soewhere",
      },
      {
        title: "Systems Messages",
        icon: systems_messages,
        link: "/soewhere",
      },
    ],
  },
];