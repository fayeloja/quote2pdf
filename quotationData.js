const quotationData = [
  {
    quotationId: "QT-00124",
    currency: {
      code: "NGN",
      symbol: "₦",
      name: "Nigerian Naira",
    },
    customer: {
      name: "Mr. Daniel Okafor",
      phone: "+234 803 456 7890",
      email: "daniel.okafor@example.com",
    },
    projectLocation: "15 Adeyemi Street, Ikeja, Lagos",
    projectDescription:
      "Interior and exterior decorative painting for a 3-bedroom residential building, including surface preparation and finishing.",
    estimatedStartDate: "2026-02-05",
    estimatedCompletionDate: "2026-02-12",
    measurement: {
      totalArea: 1850,
      unit: "square feet",
    },
    lineItems: [
      {
        serviceType: "Surface Preparation",
        description:
          "Scraping, sanding, and minor wall repairs before painting",
        qty: 1850,
        unit: "square feet",
        rate: 1.2,
        markup: 10,
        subtotal: 2442,
      },
      {
        serviceType: "Interior Painting",
        description: "Two coats of premium emulsion paint for interior walls",
        qty: 1200,
        unit: "square feet",
        rate: 2.5,
        markup: 12,
        subtotal: 3360,
      },
      {
        serviceType: "Exterior Painting",
        description: "Weather-resistant exterior paint, two coats",
        qty: 650,
        unit: "square feet",
        rate: 3.0,
        markup: 15,
        subtotal: 2242.5,
      },
      {
        serviceType: "Ceiling Painting",
        description: "White POP ceiling painting",
        qty: 3,
        unit: "rooms",
        rate: 150,
        markup: 10,
        subtotal: 495,
      },
    ],
    summary: {
      subTotal: 8539.5,
      taxRate: 7.5,
      taxAmount: 640.46,
      grandTotal: 9179.96,
    },
    notes:
      "Quotation valid for 14 days. Materials and labor included. Any additional work will be billed separately.",
  },
  {
    quotationId: "QT-00125",
    currency: {
      code: "NGN",
      symbol: "₦",
      name: "Nigerian Naira",
    },
    customer: {
      name: "BrightWorks Solutions Ltd",
      phone: "+234 809 112 3344",
      email: "admin@brightworks.com",
    },
    projectLocation: "3rd Floor, Unity Plaza, Lekki Phase 1, Lagos",
    projectDescription:
      "Decorative painting and finishing for a 250 sqm open-plan office space including meeting rooms.",
    estimatedStartDate: "2026-03-01",
    estimatedCompletionDate: "2026-03-07",
    measurement: {
      totalArea: 2700,
      unit: "square feet",
    },
    lineItems: [
      {
        serviceType: "Surface Preparation",
        description: "Wall patching, sanding, and priming",
        qty: 2700,
        unit: "square feet",
        rate: 1.1,
        markup: 8,
        subtotal: 3207.6,
      },
      {
        serviceType: "Interior Painting",
        description: "Two coats of low-odor commercial-grade paint",
        qty: 2700,
        unit: "square feet",
        rate: 2.3,
        markup: 12,
        subtotal: 6944.4,
      },
      {
        serviceType: "Feature Wall Design",
        description: "Custom textured paint finish for reception area",
        qty: 1,
        unit: "unit",
        rate: 850,
        markup: 15,
        subtotal: 977.5,
      },
    ],
    summary: {
      subTotal: 11129.5,
      taxRate: 7.5,
      taxAmount: 834.71,
      grandTotal: 11964.21,
    },
    notes:
      "Quotation valid for 10 days. Work to be done outside business hours where required.",
  },
  {
    quotationId: "QT-00126",
    currency: {
      code: "NGN",
      symbol: "₦",
      name: "Nigerian Naira",
    },
    customer: {
      name: "PalmView Boutique Hotel",
      phone: "+234 812 998 7766",
      email: "manager@palmviewhotel.ng",
    },
    projectLocation: "Beach Road, Elegushi, Lagos",
    projectDescription:
      "Repainting of guest rooms, corridors, and common areas as part of hotel renovation.",
    estimatedStartDate: "2026-04-10",
    estimatedCompletionDate: "2026-04-25",
    measurement: {
      totalArea: 5200,
      unit: "square feet",
    },
    lineItems: [
      {
        serviceType: "Room Painting",
        description: "Interior painting for 20 guest rooms",
        qty: 20,
        unit: "rooms",
        rate: 220,
        markup: 10,
        subtotal: 4840,
      },
      {
        serviceType: "Corridor Painting",
        description: "High-durability paint for hotel corridors",
        qty: 1800,
        unit: "square feet",
        rate: 2.0,
        markup: 12,
        subtotal: 4032,
      },
      {
        serviceType: "Exterior Touch-Up",
        description: "Minor exterior repainting and finishing",
        qty: 1,
        unit: "unit",
        rate: 1500,
        markup: 15,
        subtotal: 1725,
      },
    ],
    summary: {
      subTotal: 10597,
      taxRate: 7.5,
      taxAmount: 794.78,
      grandTotal: 11391.78,
    },
    notes:
      "Quotation valid for 14 days. Work scheduled in phases to avoid guest disruption.",
  },
];

module.exports = quotationData;
