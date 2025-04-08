import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.job.createMany({
    data: [
      {
        title: 'Full Stack Developer',
        companyName: 'Amazon',
        location: 'Bangalore',
        jobType: 'FULL_TIME',
        minSalary: 80000,
        maxSalary: 100000,
        description: 'Build scalable applications for millions of users.',
        requirements:
          '1-3 years of experience in full stack development using React and Node.js.',
        responsibilities:
          'Develop and maintain web applications using React and Node.js.',
        applicationDeadline: new Date('2025-05-15'),
      },
      {
        title: 'Node Js Developer',
        companyName: 'Tesla',
        location: 'Hyderabad',
        jobType: 'FULL_TIME',
        minSalary: 85000,
        maxSalary: 100000,
        description: 'Build high-performance backend services.',
        requirements:
          '1-3 years of hands-on experience with Node.js and MongoDB.',
        responsibilities: 'Write clean, efficient, and scalable backend code.',
        applicationDeadline: new Date('2025-05-10'),
      },
      {
        title: 'UX/UI Designer',
        companyName: 'Swiggy',
        location: 'Remote',
        jobType: 'FULL_TIME',
        minSalary: 75000,
        maxSalary: 95000,
        description: 'Design intuitive and delightful user experiences.',
        requirements:
          '1-3 years of experience in UI/UX design with tools like Figma or Adobe XD.',
        responsibilities: 'Create wireframes, prototypes, and design systems.',
        applicationDeadline: new Date('2025-05-18'),
      },
      {
        title: 'Frontend Developer',
        companyName: 'Amazon',
        location: 'Mumbai',
        jobType: 'INTERNSHIP',
        minSalary: 85000,
        maxSalary: 100000,
        description: 'Build performant and responsive web apps.',
        requirements:
          '1-3 years of experience in building web UIs using React.js and JavaScript.',
        responsibilities:
          'Collaborate with design teams to implement UI components.',
        applicationDeadline: new Date('2025-05-12'),
      },
      {
        title: 'Backend Developer',
        companyName: 'Swiggy',
        location: 'Delhi',
        jobType: 'FULL_TIME',
        minSalary: 90000,
        maxSalary: 100000,
        description: 'Work on the heart of our systems.',
        requirements:
          '1-3 years of backend development experience using Node.js and databases (SQL/NoSQL).',
        responsibilities:
          'Build scalable RESTful APIs and maintain system stability.',
        applicationDeadline: new Date('2025-05-14'),
      },
      {
        title: 'UI Designer Intern',
        companyName: 'Amazon',
        location: 'Bangalore',
        jobType: 'INTERNSHIP',
        minSalary: 15000,
        maxSalary: 20000,
        description: 'Learn UI design with real-world projects.',
        requirements:
          '0-1 year of experience or basic understanding of Figma or Sketch.',
        responsibilities:
          'Assist senior designers and contribute to design libraries.',
        applicationDeadline: new Date('2025-04-30'),
      },
      // Additional dummy data
      {
        title: 'DevOps Engineer',
        companyName: 'Microsoft',
        location: 'Pune',
        jobType: 'FULL_TIME',
        minSalary: 90000,
        maxSalary: 120000,
        description:
          'Build and maintain cloud infrastructure and CI/CD pipelines.',
        requirements:
          '2-4 years of experience with AWS, Docker, and Kubernetes.',
        responsibilities: 'Automate deployments and manage cloud resources.',
        applicationDeadline: new Date('2025-06-15'),
      },
      {
        title: 'Data Scientist',
        companyName: 'Amazon',
        location: 'Bangalore',
        jobType: 'FULL_TIME',
        minSalary: 95000,
        maxSalary: 130000,
        description:
          'Apply machine learning to solve complex business problems.',
        requirements: '3+ years experience in ML, Python, and data analysis.',
        responsibilities:
          'Build and deploy ML models and analyze large datasets.',
        applicationDeadline: new Date('2025-06-10'),
      },
      {
        title: 'Mobile Developer',
        companyName: 'Swiggy',
        location: 'Hyderabad',
        jobType: 'FULL_TIME',
        minSalary: 85000,
        maxSalary: 110000,
        description: 'Create native mobile applications for iOS and Android.',
        requirements: '2+ years of experience with React Native or Flutter.',
        responsibilities:
          'Design and implement mobile app features and functionality.',
        applicationDeadline: new Date('2025-05-25'),
      },
      {
        title: 'QA Engineer',
        companyName: 'Amazon',
        location: 'Chennai',
        jobType: 'CONTRACT',
        minSalary: 70000,
        maxSalary: 90000,
        description:
          'Ensure software quality through automated and manual testing.',
        requirements: '1-3 years of software testing experience.',
        responsibilities:
          'Create test cases, perform regression testing, and report bugs.',
        applicationDeadline: new Date('2025-05-20'),
      },
      {
        title: 'Product Manager',
        companyName: 'Tesla',
        location: 'Gurgaon',
        jobType: 'FULL_TIME',
        minSalary: 100000,
        maxSalary: 150000,
        description: 'Lead product development from concept to launch.',
        requirements: '3+ years of product management experience in tech.',
        responsibilities:
          'Define product vision, roadmap, and work with cross-functional teams.',
        applicationDeadline: new Date('2025-06-05'),
      },
      {
        title: 'Technical Writer',
        companyName: 'Tesla',
        location: 'Remote',
        jobType: 'PART_TIME',
        minSalary: 60000,
        maxSalary: 80000,
        description: 'Create technical documentation for developers and users.',
        requirements:
          '1 - 3ong writing skills and familiarity with technical concepts.',
        responsibilities:
          'Write API docs, tutorials, and maintain knowledge base.',
        applicationDeadline: new Date('2025-05-22'),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
