import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './common/errors/filters/http_expecion.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,           // remove campos não declarados no DTO
      forbidNonWhitelisted: true, // erro se vier campo desconhecido
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de Cadastro de Clientes')
    .setDescription('API REST para gerenciamento de clientes e endereços, com autenticação JWT.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Informe o token JWT obtido no endpoint /singIn',
      },
      'JWT',
    )
    .addTag('Auth', 'Autenticação de usuários')
    .addTag('Clientes', 'Gerenciamento de clientes')
    .addTag('Endereços', 'Gerenciamento de endereços dos clientes')
    .addTag('Listagem', 'Listagem paginada de clientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
    customSiteTitle: 'API Clientes - Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`\n Swagger disponível em: http://localhost:${process.env.PORT ?? 3000}/api/docs\n`);
}
bootstrap();