import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * The bootstrap function initializes and starts the NestJS application.
 */
async function bootstrap() {
  // Create an instance of the Nest application using the root AppModule
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing (CORS) to allow the frontend to communicate
  app.enableCors();

  // Start the server on the port defined in environment variables, or default to 3000
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Execute the bootstrap function to start the app
bootstrap();
