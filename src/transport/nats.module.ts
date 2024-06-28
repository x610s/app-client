import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NATS_SERVICE_NAME: Joi.string().required(),
                NATS_SERVICE_SERVERS: Joi.string().required(),
            }),
        }),
        ClientsModule.registerAsync({
            clients: [
                {
                    name: process.env.NATS_SERVICE_NAME,
                    imports: [ConfigModule],
                    useFactory: async (configService) => ({
                        transport: Transport.NATS,
                        options: {
                            servers: configService.get('NATS_SERVICE_SERVERS').split(',')
                        }

                    }),
                    inject: [ConfigService],
                }
            ]
        }),
    ],
    exports: [
        ClientsModule.registerAsync({
            clients: [
                {
                    name: process.env.NATS_SERVICE_NAME,
                    imports: [ConfigModule],
                    useFactory: async (configService) => ({
                        transport: Transport.NATS,
                        options: {
                            servers: configService.get('NATS_SERVICE_SERVERS').split(',')
                        }
                    }),
                    inject: [ConfigService],
                }
            ]
        }),
    ]
})
export class NatsModule { }
