import { Injectable,Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Project } from "../entities/project.entity";
import { Model } from "mongoose";
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { tap } from 'rxjs';

@Injectable()
export class KafkaClientService {

  constructor(
    //@Inject('kafka_client') private readonly client: ClientKafka
    ) {
  }
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'kafkaSample',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'my-group' // Should be the same thing we give in consumer
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    // Need to subscribe to topic 
    // so that we can get the response from kafka microservice
    this.client.subscribeToResponseOf('test-topic');
    await this.client.connect();
  }



  async sendMessage() {
    const message = { value: 'hi' };
    const test = await this.client.send('test-topic', message).toPromise();
    return console.log(test);
    //console.log('Received response:', response);
    //return response;
  }
  




















  // findByUserId(id:string){
  //   return this.projectModel.find({userId: id});
  // }

  // async onModuleInit() {
  //   // Need to subscribe to topic
  //   // so that we can get the response from kafka microservice
  //   this.client.subscribeToResponseOf('test-topic');
  //   this.client.subscribeToResponseOf('create-project-topic');
  //   this.client.subscribeToResponseOf('get-project-topic');
  //   await this.client.connect();
  // }

  // @Get("kafka")
  // getHello() {
  //   return this.client.send('test-topic', 'Hello Kafka'); // args - topic, message
  // }

  // @Post()
  // getProjectData(@Body() project: CreateProjectDto) {
  //   return this.client.send('create-project-topic', JSON.stringify(project)); // args - topic, message
  // }


  // @Get("user/:id")
  // getProjectsByUserId() {
  //   return this.client.send('get-project-topic', 'this is for getting data');
  // }

  // @Post('/projects/byUserId/:userId')
  // async getProjectByUserId(@Param('userId') userId: string): Promise<any> {
  //   const message = { action: 'getProjectByUserId', data: userId };
  //   const result = await this.client.send('get-project-topic', message).toPromise();
  //   return result;
  // }


  // @Get("projects")
  // getHi() {
  //   return this.client.send('get-project-topic', 'this is for getting data');
  // }



  // @Get('send-message')
  // async sendMessage() {
  //   const message = { value: 'hi' };
  //   const response = await lastValueFrom(this.client.send('test-topic', message.value)) ;
  //   console.log('Received response:', response);
  // }



  // async sendMessage() {
  //   const message = { value: 'hi' };

  //   try {
  //     const test = await this.client.send('test-topic', message).toPromise();
  //   } catch (error) {
  //     console.log(error);
  //   }
    
    
    //console.log("this is response", test);
    //console.log('Received response:', response);
    //return response;
  // }




}
