import bcrypt from "bcryptjs";

const data = {
  servicepersons: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 7483619502",
      address: "Sarthana",
      location: "Surat",
      jobs_done: 25,
      qualification: "Bachelor's in Electrical Engineering",
      bio: "Experienced electrician specializing in residential wiring.",
      rating: {
        rating: 3.8,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/johndoe.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcd", fare: 150 }],
      username: "johndoe123",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Alice Smith",
      email: "alice.smith@example.com",
      phone: "+91 8392710452",
      address: "Piplod",
      location: "Surat",
      jobs_done: 18,
      qualification: "Master's in Plumbing and Pipefitting",
      bio: "Licensed plumber with expertise in commercial plumbing.",
      rating: {
        rating: 2.8,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/alicesmith.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcd", fare: 160 }],
      username: "alicesmith456",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "+91 6291837045",
      address: "Pal",
      location: "Surat",
      jobs_done: 32,
      qualification: "Certified HVAC Technician",
      bio: "Heating and cooling expert with a focus on energy-efficient systems.",
      rating: {
        rating: 3.8,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/michaeljohnson.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcd", fare: 140 }],
      username: "michaelhvacpro",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+91 5190368271",
      address: "Vesu",
      location: "Surat",
      jobs_done: 14,
      qualification: "Certified Interior Designer",
      bio: "Passionate interior designer creating beautiful living spaces.",
      avatar: "https://example.com/avatar/emilydavis.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcd", fare: 200 }],
      username: "emilydesigns",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+91 4081629380",
      address: "Vesu",
      location: "Surat",
      jobs_done: 20,
      qualification: "Certified Carpentry Specialist",
      bio: "Skilled carpenter specializing in custom furniture and cabinetry.",
      rating: {
        rating: 4.5,
        totalReviews: 10
      },
      image_url: "https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      servicesOffered: [{ service: "6514429095402ea423785bcc", fare: 130 }, { service: "6514429095402ea423785bcd", fare: 200 }],
      username: "davidcraftsman",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Olivia Brown",
      email: "olivia.brown@example.com",
      phone: "+91 3972410589",
      address: "Katargam",
      location: "Surat",
      jobs_done: 28,
      qualification: "Certified Landscaping Professional",
      bio: "Experienced landscaper creating beautiful outdoor spaces.",
      avatar: "https://example.com/avatar/oliviabrown.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcc", fare: 140 }, { service: "6514429095402ea423785bcd", fare: 160 }],
      username: "olivialandscapes",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Daniel Lee",
      email: "daniel.lee@example.com",
      phone: "+91 2863531698",
      address: "Udhna",
      location: "Surat",
      jobs_done: 22,
      qualification: "Certified Structural Engineer",
      bio: "Structural engineer specializing in building safety and design.",
      rating: {
        rating: 4.9,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/daniellee.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcc", fare: 200 }],
      username: "danielengineer",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Sophia White",
      email: "sophia.white@example.com",
      phone: "+91 1754652707",
      address: "Sarthana",
      location: "Surat",
      jobs_done: 17,
      qualification: "Bachelor's in Civil Engineering",
      bio: "Civil engineer with expertise in infrastructure development.",
      rating: {
        rating: 3.8,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/sophiawhite.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcc", fare: 150 }],
      username: "sophiacivileng",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Liam Martinez",
      email: "liam.martinez@example.com",
      phone: "+91 9645763816",
      address: "Sachin",
      location: "Surat",
      jobs_done: 23,
      qualification: "Master's in Chemical Engineering",
      bio: "Chemical engineer specializing in process optimization.",
      rating: {
        rating: 3.2,
        totalReviews: 10
      },
      avatar: "https://example.com/avatar/liammartinez.jpg",
      servicesOffered: [{ service: "6514429095402ea423785bcc", fare: 150 }],
      username: "liamchemical",
      password: bcrypt.hashSync("password123", 10),
    },
  ],
  services: [
    {
      name: "Circuit Repair",
      category: "6514429095402ea423785bcc",
      description:
        "Troubleshooting and repairing electrical circuits that may be malfunctioning or overloaded.",
      image_url:
        "https://media.istockphoto.com/id/1007046542/photo/electrical-terminal-in-junction-box-and-service-by-technician-electrical-device-install-in.jpg?s=1024x1024&w=is&k=20&c=T1pNGQf1Ss-Jd_GbtREJyO83PYvyu_j9k7p6qzYjqgA=",
    },
    {
      name: "Electrical Wiring",
      category: "6514429095402ea423785bcc",
      description:
        "Installation, repair, or replacement of electrical wiring in residential, commercial, or industrial buildings.",
      image_url:
        "https://media.istockphoto.com/id/1007046542/photo/electrical-terminal-in-junction-box-and-service-by-technician-electrical-device-install-in.jpg?s=1024x1024&w=is&k=20&c=T1pNGQf1Ss-Jd_GbtREJyO83PYvyu_j9k7p6qzYjqgA=",
    },
    {
      name: "Applicance Installation",
      category: "6514429095402ea423785bcc",
      description:
        "Installing or replacing light fixtures, ceiling fans, switches, outlets, and dimmer switches.",
      image_url:
        "https://media.istockphoto.com/id/1007046542/photo/electrical-terminal-in-junction-box-and-service-by-technician-electrical-device-install-in.jpg?s=1024x1024&w=is&k=20&c=T1pNGQf1Ss-Jd_GbtREJyO83PYvyu_j9k7p6qzYjqgA=",
      duration: "2 hours",
    },
  ],
  serviceCategory: [
    {
      _id: "6514429095402ea423785bcc",
      name: "Electrical Help",
      description:
        "Any kind of assistance related to electrical applicances or power boards for your house.",
      image_url:
        "https://media.istockphoto.com/id/1007046542/photo/electrical-terminal-in-junction-box-and-service-by-technician-electrical-device-install-in.jpg?s=1024x1024&w=is&k=20&c=T1pNGQf1Ss-Jd_GbtREJyO83PYvyu_j9k7p6qzYjqgA=",
    },
    {
      _id: "6514429095402ea423785bcd",
      name: "Painting",
      description:
        "Need an artist for a beautiful and mesmerizing piece of visual art, search no more..",
      image_url:
        "https://media.istockphoto.com/id/1183183783/photo/female-artist-works-on-abstract-oil-painting-moving-paint-brush-energetically-she-creates.jpg?s=1024x1024&w=is&k=20&c=XjERsAzJ3ePdYNUqyH8bm0vu93B_E8ASIwVgOsS8v6s=",
    },
  ],
  users: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+91 9999999999",
      address: "Pal",
      location: "Surat",
      image_url: "https://example.com/user-images/john.doe.jpg",
      username: "johndoe",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "+91 8888888888",
      address: "Piplod",
      location: "Surat",
      image_url: "https://example.com/user-images/jane.doe.jpg",
      username: "janedoe",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Peter Parker",
      email: "peter.parker@example.com",
      phone: "+91 7777777777",
      address: "Majura Gate",
      location: "Surat",
      image_url: "https://example.com/user-images/peter.parker.jpg",
      username: "spiderman",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Bruce Wayne",
      email: "bruce.wayne@example.com",
      phone: "+91 6666666666",
      address: "Athwa",
      location: "Surat",
      image_url: "https://example.com/user-images/bruce.wayne.jpg",
      username: "batman",
      password: bcrypt.hashSync("password123", 10),
    },
    {
      name: "Clark Kent",
      email: "clark.kent@example.com",
      phone: "+91 5555555555",
      address: "Adajan",
      location: "Surat",
      image_url: "https://example.com/user-images/clark.kent.jpg",
      username: "superman",
      password: bcrypt.hashSync("password123", 10),
    },
  ],
};

export { data };
