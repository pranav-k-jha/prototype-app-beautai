import { DataSource } from 'typeorm';
import { User } from './modules/users/entities/users.entity';
import { Business } from './modules/businesses/entities/business.entity';
import { Service } from './modules/services/entities/services.entity';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config(); // This loads the .env file

// Create the DataSource instance
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_DATABASE
      : process.env.DB_DATABASE,
  entities: [User, Business, Service],
  synchronize: true, // Avoid accidental schema drops; ensure tables already exist
});

async function seedDatabase() {
  try {
    await dataSource.initialize();
    console.log('Seeding started...');

    // Seed Users
    const userRepository = dataSource.getRepository(User);
    const users = [
      {
        user_id: 1,
        username: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: 'password123', // Assuming hashed passwords are not required for seeding
      },
      {
        user_id: 2,
        username: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password456',
      },
      {
        user_id: 3,
        username: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: 'password789',
      },
    ];
    await userRepository.save(users);
    console.log(`Inserted ${users.length} users`);

    // Seed Businesses
    const businessRepository = dataSource.getRepository(Business);
    const businesses = [
      {
        business_id: 1,
        business_name: 'Skinbyeryka',
        email: 'skinbyeryka@gmail.com',
        phone_number: '514-577-0605',
        address: '4710 Rue St Ambroise, #305-2 Montreal, QC H4C 3E6',
        operating_hours: '9:00 AM - 5:00 PM',
      },
      {
        business_id: 2,
        business_name: 'Clinique Blome',
        email: 'info@blome.ca',
        phone_number: '647-802-2981',
        address: '46 Rue McGill, Montreal, QC H2Y 3W5',
        operating_hours: '10:00 AM - 6:00 PM',
      },
      {
        business_id: 3,
        business_name: 'Clinique Face MD',
        email: 'info@cliniquefacemd.com',
        phone_number: '514-447-9435',
        address: '3451 Rue Saint-Jacques, Montreal, QC, H4C 1H2',
        operating_hours: '9:00 AM - 8:00 PM',
      },
      {
        business_id: 4,
        business_name: 'Clinique Intima',
        email: 'cliniqueintima@gmail.com',
        phone_number: '438-379-8824',
        address: '4915 Rue de Salaberry, 103, Montreal, QC H4J 1H8',
        operating_hours: '10:00 AM - 5:00 PM',
      },
      {
        business_id: 5,
        business_name: 'Naj Aesthetics',
        email: '-',
        phone_number: '438-368-2792',
        address: '4150 Rue Sainte-Catherine Westmount,QC H3Z 2Y5',
        operating_hours: '10:00 AM - 5:00 PM',
      },
      {
        business_id: 6,
        business_name: 'BL Institute',
        email: 'institutbl.info@gmail.com',
        phone_number: '450-667-6676',
        address: '465 Boulevard Curé-Poirier O, Longueuil, QC, J4J 2H4',
        operating_hours: '8:00 AM - 9:00 PM',
      },
      {
        business_id: 7,
        business_name: 'Dr West Aesthetic Medicine',
        email: 'info@drdaniellewest.com',
        phone_number: '905-515-9378',
        address: '691 Brant St, Burlington, ON, L7R 2H4',
        operating_hours: '9:30 AM - 6:00 PM',
      },
      {
        business_id: 8,
        business_name: 'Aesthetic Nurse Marta',
        email: 'aestheticnursemarta@gmail.com',
        phone_number: '647-676-0694',
        address: '325 Weston Road Unit 11B, Toronto, ON, M6N 4Z9',
        operating_hours: '11:00 AM - 5:00 PM',
      },
      {
        business_id: 9,
        business_name: 'The One- Clinic of Aesthetics',
        email: 'info@theoneclinic.ca',
        phone_number: '647-968-4218',
        address:
          'Front of plaza, 325 Weston Road Unit 11B, Toronto, ON, M6N 4Z9',
        operating_hours: '11:00 AM - 5:00 PM',
      },
      {
        business_id: 10,
        business_name: 'Niagara Skin and Body Clinic',
        email: 'niagaraskinandbody@gmail.com',
        phone_number: '905-363-4453',
        address: '432 Niagara St, St. Catharines, ON L2M 4W3',
        operating_hours: '10:00 AM - 6:00 PM',
      },
      {
        business_id: 11,
        business_name: 'Reforme Lab',
        email: 'info@reformelab.com',
        phone_number: '416-901-3133',
        address: '535 Queen St E #7, Toronto, ON M5A 1V1',
        operating_hours: '10:30 AM - 7:00 PM',
      },
      {
        business_id: 12,
        business_name: 'PRECISE by ICELYN',
        email: 'info@precisebyicelyn.com',
        phone_number: '647-460-3838',
        address: '38 Avenue Rd Unit C1-C2, Toronto, ON M5R 2G2',
        operating_hours: '10:00 AM - 6:00 PM',
      },
      {
        business_id: 13,
        business_name: 'Envy Cosmetic Clinic',
        email: 'envycosmeticclinic@gmail.com',
        phone_number: '343-777-4335',
        address: '18 Byward Market Square #300, Ottawa, ON K1N 7A1',
        operating_hours: '10:30 AM - 6:00 PM',
      },
      {
        business_id: 14,
        business_name: 'Beauty Nurse Kim Medical Aesthetics',
        email: 'contact@beautynursekim.com',
        phone_number: '343-321-2607',
        address: '1390 Prince of Wales Dr. G2, Ottawa, ON K2C 3N6',
        operating_hours: '11:00 AM - 5:00 PM',
      },
      {
        business_id: 15,
        business_name: 'Beauty Sekrets Clinic',
        email: 'info@beautysekrets.com',
        phone_number: '613-203-0646',
        address: '110A Clarence Street, Ottawa, ON K1N 5P6',
        operating_hours: '9:00 AM - 5:00 PM',
      },
      {
        business_id: 16,
        business_name: 'Refined Image Ottawa',
        email: 'info@refinedimageottawa.com',
        phone_number: '613-725-5088',
        address: '408A Churchill Ave N, Ottawa, ON K1Z 5C6',
        operating_hours: '9:00 AM - 8:00 PM',
      },
      {
        business_id: 17,
        business_name: 'The Ottawa Clinic',
        email: 'info@theottawaclinic.com',
        phone_number: '613-232-7777',
        address: '2936 Baseline Rd Suite 102, Nepean, ON K2H 1B3',
        operating_hours: '8:00 AM - 4:00 PM',
      },
      {
        business_id: 18,
        business_name: 'Silhouette Medial Spa Inc.',
        email: 'info@silhouettemedispa.com',
        phone_number: '343-202-3668',
        address: '1845 Century Road West, Ottawa, ON K0A 2E0',
        operating_hours: '9:00 AM - 4:00 PM',
      },
    ];

    const savedBusinesses = await businessRepository.save(businesses);
    console.log(`Inserted ${savedBusinesses.length} businesses`);

    // Read services from CSV and seed them
    const serviceRepository = dataSource.getRepository(Service);
    const services = fs
      .readFileSync('./src/services.csv', { encoding: 'utf-8' }) // Read the file
      .split('\n') // Split into rows
      .slice(1) // Skip the header row
      .map((row, index) => {
        const columns = row.split('|').map((col) => col.trim()); // Split and trim columns

        // Validate the row has exactly 6 columns
        if (columns.length !== 7) {
          console.log(`Invalid row at index ${index}:`, columns);
          return null; // Skip malformed rows
        }

        const [
          service_id,
          service_name,
          description,
          invasiveness,
          price,
          business_id,
          concerns,
        ] = columns;

        // Map the `business_id` in the CSV to the corresponding business from `savedBusinesses`
        const businessIndex = parseInt(business_id); // Parse the `business_id` from CSV
        const updatedBusinessId = savedBusinesses[businessIndex]; // Get the corresponding saved business ID

        // Return the parsed service object with the updated business ID
        return {
          service_id: parseInt(service_id),
          service_name,
          description,
          invasiveness,
          price: parseFloat(price),
          business: updatedBusinessId, // Use the updated business ID
          concerns,
        };
      });

    // Save the services
    /*
    await serviceRepository.save(services);
    console.log(`Inserted ${services.length} services`);
    */

    const savedServices = await serviceRepository.save(services);
    console.log(`Inserted ${savedServices.length} services`);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
  }
}

seedDatabase();
