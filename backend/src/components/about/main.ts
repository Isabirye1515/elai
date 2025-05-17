
import About from './about';
import AboutService from './AboutService';

async function main() {
  const service = new AboutService();

  const about = new About(
    'Jane Doe',
    true,
    'Jane Doe',
    'jane@example.com',
    'Kampala, Uganda',
    '+256700000000',
    'https://janesite.com',
    'Full-stack developer with passion for clean code.',
    [],
    'profile-image',
  );

  try {
    const aboutList = await service.getAboutById('1');
    console.log('About retrieved successfully:', aboutList);
    await service.addAbout(about);
    console.log('About added successfully!');
  } catch (error) {
    console.error('Error adding about:', error);
  }
}

main();
