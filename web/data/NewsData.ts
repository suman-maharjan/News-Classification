import { EContentType, ENewsType, INews } from "@/types/news.types";

export const NewsData: INews[] = [
  {
    _id: "1",
    title: "Olympics in 2021 unrealistic unless COVID-19 vaccine found",
    author: "Professor Devi Sridhar / SNS Web",
    description:
      "Olympics is not the only sporting tournament to be pushed back because of the dreaded coronavirus pandemic...",
    content: [
      {
        type: EContentType.TEXT,
        data: "Holding the Tokyo Olympics any time before a vaccine is found will be 'very unrealistic,' according to a leading global health expert.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1761839256547-0a1cd11b6dfb?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: EContentType.TEXT,
        data: "Professor Devi Sridhar said that the development of the vaccine will be key to when the Olympics can be held.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    publishedAt: "2020-04-19T14:41:24Z",
    type: ENewsType.BREAKING,
    place: "Tokyo, Japan",
  },
  {
    _id: "2",
    title: "Tech Giants Announce Breakthrough in AI",
    author: "John Smith / TechDaily",
    description:
      "Tech companies collaborated on next-gen AI chips that promise faster performance and lower energy usage.",
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: [
      {
        type: EContentType.TEXT,
        data: "The AI chip is expected to reduce training time for large models by 40%.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1761839256547-0a1cd11b6dfb?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: EContentType.TEXT,
        data: "Experts say this will accelerate the adoption of AI in everyday products.",
      },
    ],
    publishedAt: "2025-11-20T10:00:00Z",
    type: ENewsType.READ,
    place: "San Francisco, USA",
  },
  {
    _id: "3",
    title: "Global Markets Rally After Positive Economic Forecast",
    author: "Jane Doe / FinanceWorld",
    description:
      "Economists anticipate a stable growth trend through the next quarter, boosting investor confidence.",
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: [
      {
        type: EContentType.TEXT,
        data: "Markets reacted positively to the government's economic stimulus package.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1616745309801-963c1c6f22c0?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: EContentType.TEXT,
        data: "Investors are optimistic about tech and manufacturing sectors leading the recovery.",
      },
    ],
    publishedAt: "2025-11-21T08:30:00Z",
    type: ENewsType.NORMAL,
    place: "London, UK",
  },
  {
    _id: "4",
    title: "New High-Speed Rail Line Opens to the Public",
    author: "Emily Carter / RailNews",
    description:
      "The new rail line aims to revolutionize regional transportation and reduce carbon emissions.",
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: [
      {
        type: EContentType.TEXT,
        data: "Travelers can now go from city A to city B in just 90 minutes.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1526481280691-3bfa7568f55e?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: EContentType.TEXT,
        data: "Officials say this project is a major milestone in sustainable transportation.",
      },
    ],
    publishedAt: "2025-11-19T12:00:00Z",
    type: ENewsType.NORMAL,
    place: "Tokyo, Japan",
  },
  {
    _id: "5",
    title: "Breakthrough in Cancer Treatment Shows Promise",
    author: "Dr. Alex Johnson / MedicalNews",
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Researchers report a new targeted therapy could improve survival rates for patients with aggressive cancers.",
    content: [
      {
        type: EContentType.TEXT,
        data: "The therapy uses immunotherapy combined with personalized medication.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1588776814546-1bfa1d46fa30?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: EContentType.TEXT,
        data: "Clinical trials are ongoing and early results are very promising.",
      },
    ],
    publishedAt: "2025-11-18T15:45:00Z",
    type: ENewsType.READ,
    place: "Berlin, Germany",
  },
  {
    _id: "6",
    title: "Art Exhibition Showcases Young Talent",
    author: "Sophia Lee / ArtsDaily",
    image:
      "https://images.unsplash.com/photo-1763244737839-220b4cd0259e?q=80&w=1487&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "The exhibition features works from over 50 young artists exploring modern themes.",
    content: [
      {
        type: EContentType.TEXT,
        data: "Visitors can see innovative paintings, sculptures, and installations.",
      },
      {
        type: EContentType.IMAGE,
        data: "https://images.unsplash.com/photo-1761839256547-0a1cd11b6dfb?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        type: EContentType.TEXT,
        data: "Curators believe this exhibition highlights the future of contemporary art.",
      },
    ],
    publishedAt: "2025-11-17T09:30:00Z",
    type: ENewsType.NORMAL,
    place: "New York, USA",
  },
];
