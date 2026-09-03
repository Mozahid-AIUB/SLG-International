/**
 * The seven brands SLG Engineering represents.
 *
 * Every line here is transcribed from the client's own company profile.
 * Nothing is embellished, and SLG is never described as the manufacturer —
 * it imports, supplies, installs and services these products.
 *
 * `origin` is deliberately absent on every brand: the profile does not state
 * country of origin, and guessing it would misinform buyers. It is a typed
 * optional field so the moment the client confirms origins, the data fills in
 * and the plates render an extra row with no component change.
 */

export type BrandCategory = "elevator" | "generator";

export type BrandFeature = {
  title: string;
  description: string;
};

export type Brand = {
  id: string;
  name: string;
  category: BrandCategory;
  /** The brand's own line, as used in the profile. */
  headline: string;
  /** One sentence on what it is for. */
  positioning: string;
  image: string;
  imageAlt: string;
  /** Where it is used — becomes plate rows and chips. */
  applications: string[];
  /** What the profile calls the safety or protection set. */
  featuresTitle: string;
  features: BrandFeature[];
  /** The profile's own caveat. Kept, because specs really do vary. */
  disclaimer: string;
  origin?: string;
};

export const brands: Brand[] = [
  {
    id: "sigma",
    name: "Sigma",
    category: "elevator",
    headline: "Engineered for a higher standard",
    positioning:
      "Advanced vertical mobility for modern buildings, from apartments to high-rise towers.",
    image: "/media/sigma.webp",
    imageAlt: "Sigma elevator car with brushed metal interior in a lobby",
    applications: ["Residential", "Commercial", "Hospital", "High-rise"],
    featuresTitle: "Safety systems",
    features: [
      {
        title: "Unintended car movement protection",
        description:
          "Helps protect against unintended movement of the elevator car.",
      },
      {
        title: "Ascending car overspeed protection",
        description: "Additional protection against abnormal upward overspeed.",
      },
      {
        title: "Overspeed governor",
        description:
          "Detects excessive elevator speed and activates the safety system.",
      },
      {
        title: "High-performance safety gear",
        description: "Provides controlled emergency stopping.",
      },
      {
        title: "Energy-absorbing buffers",
        description: "Additional protection at the bottom of the shaft.",
      },
      {
        title: "Advanced door safety system",
        description: "Multi-beam light curtain support for doorway protection.",
      },
      {
        title: "Advanced electronic control",
        description:
          "Precise motion, braking and door control for dependable performance.",
      },
    ],
    disclaimer:
      "Features and configurations vary by elevator model and project specification.",
  },
  {
    id: "sino-hyundai",
    name: "Sino Hyundai",
    category: "elevator",
    headline: "Go high and build your confidence",
    positioning:
      "Smarter vertical mobility, designed for comfort and engineered for dependability.",
    image: "/media/sino-hyundai.webp",
    imageAlt: "Sino Hyundai elevator doors in a marble-clad lobby",
    applications: [
      "Passenger",
      "Residential",
      "Commercial",
      "Hospital",
      "Panoramic",
      "Freight",
      "Home and villa",
    ],
    featuresTitle: "Safety systems",
    features: [
      {
        title: "Multi-beam door protection",
        description:
          "Detects passengers or objects in the doorway and supports safe door reopening.",
      },
      {
        title: "Overspeed protection",
        description: "Responds to abnormal elevator speed.",
      },
      {
        title: "Emergency alarm and communication",
        description: "Passenger assistance during unexpected situations.",
      },
      {
        title: "Automatic rescue device",
        description:
          "Selected configurations move the lift to a landing during power interruption.",
      },
      {
        title: "Overload protection",
        description: "Prevents normal operation when the rated load is exceeded.",
      },
      {
        title: "Emergency lighting",
        description: "Supports cabin visibility during loss of normal supply.",
      },
    ],
    disclaimer:
      "Final safety functions depend on the selected Sino Hyundai model, controller and project specification.",
  },
  {
    id: "fuji",
    name: "Fuji",
    category: "elevator",
    headline: "Premium vertical mobility",
    positioning:
      "Elevators that integrate with the architecture rather than intrude on it.",
    image: "/media/fuji.webp",
    imageAlt: "Fuji elevator car with patterned ceiling lighting",
    applications: [
      "Passenger",
      "Home",
      "Hospital",
      "Panoramic",
      "Commercial",
    ],
    featuresTitle: "Safety systems",
    features: [
      {
        title: "Overspeed protection",
        description:
          "Detects abnormal speed and supports safe elevator operation.",
      },
      {
        title: "Safety gear and buffers",
        description:
          "Controlled stopping with additional impact protection.",
      },
      {
        title: "Infrared light-curtain door protection",
        description:
          "Detects passengers or objects in the doorway and supports safe reopening.",
      },
      {
        title: "Emergency alarm and communication",
        description: "Lets passengers call for assistance.",
      },
      {
        title: "Emergency lighting",
        description: "Cabin visibility during loss of normal electrical supply.",
      },
      {
        title: "UPS automatic rescue function",
        description:
          "Selected configurations move the lift to a landing during power interruption.",
      },
    ],
    disclaimer:
      "Safety equipment varies by Fuji manufacturer, elevator model and selected specification.",
  },
  {
    id: "perkins",
    name: "Perkins",
    category: "generator",
    headline: "Dependable power when it matters",
    positioning:
      "Perkins-powered diesel gensets for standby and prime duty across commercial and critical sites.",
    image: "/media/perkins.webp",
    imageAlt: "Perkins-powered diesel generator in a soundproof canopy",
    applications: [
      "Commercial",
      "Industrial",
      "Residential",
      "Critical infrastructure",
    ],
    featuresTitle: "Engine protection",
    features: [
      {
        title: "Low oil pressure monitoring",
        description: "Protects the engine against inadequate lubrication.",
      },
      {
        title: "High coolant temperature protection",
        description: "Prevents continued operation during abnormal overheating.",
      },
      {
        title: "Overspeed protection",
        description:
          "Available on selected engine series to respond to excessive speed.",
      },
      {
        title: "Electronic shut-off",
        description: "Supports controlled engine shutdown when required.",
      },
      {
        title: "Coolant-level monitoring",
        description: "Available on selected electronic engine configurations.",
      },
      {
        title: "Engine sensor and ECM monitoring",
        description:
          "Selected electronic series continuously monitor critical operating parameters.",
      },
    ],
    disclaimer:
      "Equipment varies according to engine and genset configuration.",
  },
  {
    id: "cummins",
    name: "Cummins",
    category: "generator",
    headline: "Power you can count on",
    positioning:
      "Cummins power generation for demanding applications, with PowerCommand control.",
    image: "/media/cummins.webp",
    imageAlt: "Cummins power generation set in an equipment hall",
    applications: ["Standby", "Prime", "Commercial", "Industrial"],
    featuresTitle: "Control and protection",
    features: [
      {
        title: "PowerCommand control",
        description: "Integrated monitoring and generator control.",
      },
      {
        title: "AmpSentry protection",
        description:
          "Generator-set protection designed around electrical operating conditions.",
      },
      {
        title: "Automatic fault detection",
        description: "Monitors system conditions and identifies abnormal operation.",
      },
      {
        title: "Alarm and status monitoring",
        description: "Clear operating information for technicians and operators.",
      },
      {
        title: "Automatic shutdown on critical faults",
        description: "Protects equipment when critical conditions are detected.",
      },
      {
        title: "Voltage and frequency regulation",
        description: "Supports stable generator output.",
      },
    ],
    disclaimer:
      "Functions depend on the Cummins genset and controller configuration.",
  },
  {
    id: "ricardo",
    name: "Ricardo",
    category: "generator",
    headline: "Robust power. Practical performance.",
    positioning:
      "Ricardo diesel gensets for prime and standby duty in commercial and industrial settings.",
    image: "/media/ricardo.webp",
    imageAlt: "Ricardo diesel generator in a soundproof canopy",
    applications: [
      "Prime power",
      "Standby power",
      "Commercial",
      "Industrial",
    ],
    featuresTitle: "Controller protection",
    features: [
      {
        title: "Low oil pressure shutdown",
        description:
          "Protects the engine when lubrication pressure falls below safe levels.",
      },
      {
        title: "High coolant temperature shutdown",
        description: "Prevents operation during abnormal overheating.",
      },
      {
        title: "Engine overspeed protection",
        description: "Responds to excessive engine speed conditions.",
      },
      {
        title: "Over and under voltage protection",
        description: "Monitors abnormal voltage conditions.",
      },
      {
        title: "Overload and overcurrent protection",
        description: "Electrical protection under heavy load conditions.",
      },
      {
        title: "Emergency stop",
        description: "Immediate shutdown in emergency situations.",
      },
      {
        title: "Start-failure alarm",
        description: "Alerts operators when the generator does not start correctly.",
      },
      {
        title: "Automatic transfer system option",
        description: "Automatic switching to backup power when configured.",
      },
    ],
    disclaimer:
      "Protection depends on the generator controller and selected configuration. Confirm the final specification before ordering.",
  },
  {
    id: "evol",
    name: "EVOL",
    category: "generator",
    headline: "Power that keeps you moving",
    positioning:
      "EVOL diesel gensets for standby and prime duty, from home backup to industrial load.",
    image: "/media/evol.webp",
    imageAlt: "EVOL diesel generator outside a commercial building at night",
    applications: ["Commercial", "Residential", "Industrial", "Construction"],
    featuresTitle: "Protection functions",
    features: [
      {
        title: "Low oil pressure protection",
        description:
          "Shuts down the generator to prevent damage from insufficient oil pressure.",
      },
      {
        title: "High coolant temperature protection",
        description:
          "Shuts down when coolant temperature exceeds safe limits.",
      },
      {
        title: "Engine overspeed protection",
        description: "Prevents engine damage in the case of overspeed.",
      },
      {
        title: "Overload and overcurrent protection",
        description:
          "Protects the generator and connected equipment from high current.",
      },
      {
        title: "Voltage monitoring",
        description:
          "Continuously monitors output voltage for a stable, safe supply.",
      },
      {
        title: "Emergency stop",
        description: "Quick manual shutdown in an unsafe condition.",
      },
      {
        title: "Battery and charging monitoring",
        description:
          "Monitors battery voltage and charging for reliable starting.",
      },
      {
        title: "Automatic transfer capability",
        description: "Supports automatic transfer between utility and generator.",
      },
    ],
    disclaimer:
      "Confirm the final protection set from the specification sheet of the selected EVOL generator.",
  },
];

export const elevatorBrands = brands.filter((b) => b.category === "elevator");
export const generatorBrands = brands.filter((b) => b.category === "generator");

/** Building types the engineering division serves, from the profile. */
export const engineeringSegments = [
  "Residential buildings",
  "Commercial complexes",
  "Hospitals and healthcare",
  "Hotels and hospitality",
  "Industrial facilities",
  "Educational institutions",
  "Data centres",
  "Warehouses",
];

/** What SLG does around the product, as distinct from what it sells. */
export const engineeringServices = [
  {
    title: "Product consultation",
    description:
      "Match the brand, capacity and configuration to the building and the budget.",
  },
  {
    title: "Project planning",
    description:
      "Shaft, machine room, electrical and load planning ahead of installation.",
  },
  {
    title: "Supply",
    description:
      "Import, delivery and site handover of the selected equipment.",
  },
  {
    title: "Technical coordination",
    description:
      "Work alongside the contractor and consultant through installation and commissioning.",
  },
  {
    title: "Maintenance",
    description:
      "Scheduled servicing and call-out support after the system is running.",
  },
];
