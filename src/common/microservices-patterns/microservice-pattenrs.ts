interface MicroservicePattern {
    name: string;
    port: number;
}

export const USER_SERVICE: MicroservicePattern = {
    name: 'USER_MICROSERVICE',
    port: 3002,
};


export const COMPANY_SERVICE: MicroservicePattern = {
    name: 'COMPANY_MICROSERVICE',
    port: 3001,
};
export const NATS_SERVICE = {
    name: 'NATS_SERVICE',
    servers: ['nats://nats-server:4222'],
};
