/**
 * What the group actually does, across all three divisions.
 *
 * Written from what a buyer is deciding, not from how the business is filed:
 * they want to know who supplies the machine, who puts it in, and who answers
 * the phone when it stops.
 */

export type Service = {
  title: string;
  description: string;
  division: "engineering" | "renewables" | "manpower" | "group";
  href: string;
};

export const services: Service[] = [
  {
    title: "Elevator supply and installation",
    description:
      "Passenger, hospital, freight, panoramic and home lifts from Sigma, Sino Hyundai and Fuji — specified to the building, then installed.",
    division: "engineering",
    href: "/engineering/elevators",
  },
  {
    title: "Diesel generator supply",
    description:
      "Standby and prime sets from Perkins, Cummins, Ricardo and EVOL, sized to the connected load and the run hours.",
    division: "engineering",
    href: "/engineering/generators",
  },
  {
    title: "Solar power systems",
    description:
      "On-grid, off-grid and hybrid systems: panels, inverters, storage, mounting and protection, supplied as one package.",
    division: "renewables",
    href: "/renewables",
  },
  {
    title: "Energy storage and backup",
    description:
      "Lead-acid, lithium and commercial battery banks matched to the inverter and the backup duration required.",
    division: "renewables",
    href: "/renewables/products",
  },
  {
    title: "Maintenance and service",
    description:
      "Scheduled servicing and call-out support after commissioning, for equipment we supplied and equipment we did not.",
    division: "engineering",
    href: "/engineering/services",
  },
  {
    title: "Overseas workforce placement",
    description:
      "Bangladeshi workers placed with employers abroad through Sahara Link International.",
    division: "manpower",
    href: "/manpower",
  },
  {
    title: "Product consultation",
    description:
      "Which brand, which capacity, which configuration — matched to the building and the budget before anything is ordered.",
    division: "group",
    href: "/engineering/services",
  },
  {
    title: "Project planning",
    description:
      "Shaft, machine room, electrical load and roof structure worked out ahead of installation, alongside your contractor.",
    division: "group",
    href: "/engineering/services",
  },
  {
    title: "Installation and commissioning",
    description:
      "Wiring, protection, testing and handover, with the system left running and explained to whoever operates it.",
    division: "group",
    href: "/renewables/process",
  },
  {
    title: "Spare parts and after-sales",
    description:
      "The question every buyer asks before signing. Parts and support stay available after the warranty ends.",
    division: "group",
    href: "/contact",
  },
];
