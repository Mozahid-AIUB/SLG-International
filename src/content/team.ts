/**
 * The people behind the group, and the person who keeps its systems running.
 *
 * Two lists, because they answer two different questions. `leadership` is who
 * runs the company — a visitor reads it to know who they would be dealing
 * with. `technology` is who to reach when the website, the domain or the
 * server has a problem — that is a service contact, not an introduction, so
 * it is presented as a nameplate rather than a portrait.
 *
 * Every optional field is optional for the same reason: the client has not
 * supplied it yet. Add the value and the page renders it with no component
 * change. Nothing here is invented — an unknown stays absent rather than
 * being filled with a plausible guess.
 */

export type TeamMember = {
  id: string;
  name: string;
  /** As it should read on the site, not an internal job code. */
  role: string;
  /** One sentence on what this person is responsible for. */
  remit?: string;
  /** A second line under the role, where the person carries a professional
   *  title the job title alone does not convey. */
  credential?: string;
  /** Longer profile, one string per paragraph. Used where a person's
   *  background is worth setting out rather than summarising. */
  bio?: string[];
  /** Named areas of expertise. Rendered as a plate, because that is what
   *  the list is — a specification a client checks against a project. */
  specialisms?: string[];
  /** Portrait in /public/about. Absent until a photograph is supplied. */
  photo?: string;
  photoAlt?: string;
};

/**
 * Ordered as the company would introduce itself.
 *
 * The founder has his own section on the About page, so he is not repeated
 * here. Colleagues fill in as their names and photographs arrive.
 */
export const leadership: TeamMember[] = [
  {
    id: "atiqur-rahman-sohail",
    name: "Md. Atiqur Rahman Sohail",
    role: "Managing Director",
    photo: "/about/md-800.webp",
    bio: [
      "As Managing Director, Md. Atiqur Rahman Sohail oversees operations and strategic growth across the group, holding all divisions to the same standard — passenger elevators and heavy-duty generators, renewable solar systems, and manpower supply.",
      "He studied law, criminology and forensic sciences at Maastricht University in the Netherlands. That training in reading regulation closely and reasoning from evidence carries directly into the work: complex supply chains, stringent international standards, and project risk that has to be seen before it arrives.",
      "Under his leadership the group works to reliable engineering, operational excellence and corporate governance that holds up to scrutiny.",
    ],
  },
  {
    id: "mamunur-rashid",
    name: "Engr. Mamunur Rashid",
    role: "Chief Executive Officer",
    credential: "DUET · Vertical transportation specialist",
    photo: "/about/ceo-800.webp",
    bio: [
      "Engr. Mamunur Rashid is the Chief Executive Officer of Sahara Link Group and a specialist in vertical transportation systems, with a focus on elevator quality control, safety, technical evaluation and project execution.",
      "His expertise spans the complete elevator project lifecycle. He provides the technical leadership and consultancy that keeps installed systems inside their required standards for quality, safety, performance and reliability, and works alongside clients, contractors and project stakeholders as they make technical and procurement decisions.",
    ],
    specialisms: [
      "Design review and technical evaluation",
      "Elevator QC inspection",
      "Safety assessment and compliance",
      "Testing and commissioning",
      "Project supervision",
      "Procurement consultancy",
    ],
  },
  {
    id: "banzir-hazra",
    name: "Banzir Hazra",
    role: "Strategic Growth Partner",
    credential: "BEng Architectural Engineering · MSc Renewable Energy, Heriot-Watt",
    photo: "/about/sgp-800.webp",
    bio: [
      "Banzir Hazra serves as the Strategic Growth Partner of Sahara Link Group, working on its long-term growth, strategic development and expansion. An academic background in both architectural engineering and renewable energy brings a multidisciplinary view to business strategy, sustainable development and emerging opportunities.",
      "She holds a BEng in Architectural Engineering and an MSc in Renewable Energy Engineering from Heriot-Watt University, pairing technical expertise with an understanding of sustainable infrastructure and energy systems.",
      "At Sahara Link Group she identifies strategic opportunities, strengthens partnerships, and supports the group's vision for sustainable and diversified growth.",
    ],
  },
];

export type TechnologyContact = TeamMember & {
  /** Public contact address. Shown on the page, so use a work address. */
  email?: string;
  phone?: string;
  /** What this person actually administers, in the client's own terms. */
  responsibilities: string[];
  links?: { label: string; href: string }[];
};

/**
 * Who administers the group's website, domain and server.
 *
 * Listed publicly on purpose: when a site goes down, the person who can fix
 * it should be findable without an internal directory.
 */
export const technology: TechnologyContact[] = [
  {
    id: "mozahidul-islam",
    name: "MD Mozahidul Islam",
    role: "Software Engineer, web and mobile apps",
    remit:
      "Builds and maintains this website, and administers the domain, server and deployments behind it.",
    email: "mozahidul.islam.ai@gmail.com",
    /** Also the WhatsApp number. */
    phone: "+880 1707 591255",
    responsibilities: [
      "Website",
      "Domain",
      "Server",
      "Deployments",
    ],
    links: [
      { label: "Portfolio", href: "https://mozahidulislam.pro.bd/" },
    ],
  },
];
