# BicycleNL Frontend

This is the official frontend for [Bicycle Newfoundland & Labrador](https://bicyclenl.com), built with [Next.js](https://nextjs.org), React, and Tailwind CSS. It provides information about cycling events, news, resources, and membership for the Newfoundland & Labrador cycling community.

## Features

- Modern, responsive design using Next.js App Router and Tailwind CSS
- Dynamic events calendar and results
- News and updates section
- Downloadable resources for company, events, and policies
- Sanity.io integration for content management
- Custom UI components and reusable sections
- API routes for events, news, and resources

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sadaidevs/bicyclenl-frontend.git
cd bicyclenl-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the development server

```bash
npm run dev
# or

```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## Project Structure

```
├── app/                                      # Next.js app directory (routing, pages, API)
│   ├── globals.css                           # Global CSS styles
│   ├── layout.tsx                            # Root layout component
│   ├── page.tsx                              # Main landing page
│   ├── [...slug]/                            # Dynamic route for catch-all pages
│   │   └── page.tsx                          # Dynamic page renderer
│   ├── api/                                  # API route handlers
│   │   ├── event/
│   │   │   └── route.js                      # Returns event data from Sanity
│   │   ├── event-result/
│   │   │   └── route.js                      # Returns event results data
│   │   ├── events-page/
│   │   │   └── route.js                      # Returns events page sections
│   │   └── news/
│   │       └── route.js                      # Returns news data
│   ├── company/
│   │   ├── AnnualGeneralMeetingSection.tsx   # Section for AGM resources
│   │   ├── FinancialReportsSection.tsx       # Section for financial reports
│   │   └── PoliciesSection.tsx               # Section for company policies
│   ├── events/
│   │   ├── EventExpandableCard.tsx           # Expandable event card UI
│   │   ├── EventsCalendar.tsx                # Events calendar component
│   │   ├── EventsContact.tsx                 # Contact info for events
│   │   ├── EventsHeader.tsx                  # Header for events page
│   │   ├── FormsSection.tsx                  # Downloadable forms for events
│   │   ├── page.tsx                          # Events main page
│   │   └── ResultsSection.tsx                # Event results section
│   └── news/
│       ├── page.tsx                          # News main page
│       └── [slug]/
│           └── page.tsx                      # Individual news article page
├── components/                               # Reusable UI and page components
│   ├── home/
│   │   ├── AboutSection.tsx                  # About BicycleNL section
│   │   ├── EventsSection.tsx                 # Homepage events preview
│   │   ├── Hero.tsx                          # Homepage hero banner
│   │   ├── NewsSection.tsx                   # Homepage news preview
│   │   └── QuickLinks.tsx                    # Quick navigation links
│   ├── layout/
│   │   ├── Footer.tsx                        # Site footer
│   │   ├── HoverDropdown.tsx                 # Dropdown menu component
│   │   └── Navbar.tsx                        # Top navigation bar
│   ├── sections/
│   │   ├── DocumentResourceBrowser.tsx       # File/resource browser UI
│   │   ├── ExpandableSection.tsx             # Expandable/collapsible section
│   │   ├── PageSectionRenderer.tsx           # Renders page sections
│   │   ├── PipeTableSection.tsx              # Table section for data display
│   │   └── SectionRenderer.tsx               # Renders dynamic sections
│   └── ui/
│       ├── badge.tsx                         # Badge UI component
│       ├── button.tsx                        # Button UI component
│       ├── card.tsx                          # Card UI component
│       ├── pagination-controls.tsx           # Pagination controls
│       └── pagination.tsx                    # Pagination logic
├── lib/                                      # Utilities, constants, Sanity integration
│   ├── dateUtils.ts                          # Date utility functions
│   ├── utils.ts                              # General utility functions
│   ├── constants/
│   │   └── navigation.ts                     # Navigation menu constants
│   ├── filters/
│   │   └── filterUtils.ts                    # Filtering utility functions
│   ├── sanity/
│   │   ├── image.js                          # Sanity image helpers
│   │   ├── queries.ts                        # Sanity GROQ queries
│   │   └── sanity.js                         # Sanity client config
│   └── types/
│       └── content.ts                        # TypeScript types for content
├── public/                                   # Static assets (images, PDFs, docs)
│   ├── annualGeneralMeeting/                 # AGM documents
│   ├── financialReport/                      # Financial reports
│   ├── forms/                                # Downloadable forms
│   ├── images/                               # Site images
│   └── policies/                             # Policy documents
├── package.json                              # Project metadata and npm scripts
├── next.config.ts                            # Next.js configuration
├── tsconfig.json                             # TypeScript configuration
├── eslint.config.mjs                         # ESLint config
├── postcss.config.mjs                        # PostCSS config
└── README.md                                 # Project documentation
```

## Environment Variables

You may need to set up environment variables for Sanity or other integrations. See `.env.example` if available, or check `lib/sanity/sanity.js` for required variables.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Deployment

Deploy easily to [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Pull requests are welcome! Please open an issue first to discuss major changes. For local development:

1. Fork the repo and create a new branch
2. Make your changes with clear commit messages
3. Ensure code passes linting and builds
4. Open a pull request describing your changes

## License

MIT

