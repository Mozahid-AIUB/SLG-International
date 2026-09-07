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
  /** Portrait in /public/about. Absent until a photograph is supplied. */
  photo?: string;
  photoAlt?: string;
};

/**
 * Ordered as the company would introduce itself: the founder first.
 *
 * The founder's portrait has its own section above this list, so he is not
 * repeated here. Colleagues fill in as their names and photographs arrive.
 */
export const leadership: TeamMember[] = [];

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
