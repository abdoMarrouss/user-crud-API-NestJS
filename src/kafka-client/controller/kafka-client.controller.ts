import { Body, Get, Param, Post, Query, Inject, Res, HttpStatus, Delete } from "@nestjs/common";
import { Controller } from '@nestjs/common';
import { Client, ClientKafka, Transport } from "@nestjs/microservices";
import { AppService } from "../../app.service";
import { KafkaClientService } from "../service/kafka-client.service";
import { PaginationQueryDto } from "../../user/pagination/paginationQuery";
import { CreateProjectDto } from "../dto/create-project.dto";
import { firstValueFrom, lastValueFrom, Observable } from "rxjs";
import { InjectModel } from "@nestjs/mongoose";
import { Project } from "../entities/project.entity";
import { Model } from "mongoose";

@Controller('kafka-client')
export class KafkaClientController {

  constructor(private readonly kafkaClientService: KafkaClientService,

  ) { }

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
    this.client.subscribeToResponseOf('test-topic-2');
    this.client.subscribeToResponseOf('create-project-topic');
    this.client.subscribeToResponseOf('delete-project-topic');
    await this.client.connect();
  }



  // @Get('projects')
  // async getAllUsers(
  //   @Query() paginationQuery: PaginationQueryDto,
  //   @Query('search') searchQuery?: string,
  // ): Promise<any> {
  //   const data = {};
  //   const message = { action: 'read', entity: 'projects', query: { paginationQuery, searchQuery } };
  //   return this.client.send('test-topic', message)
  //     .toPromise()
  //     .then(response => console.log('Response from consumer:', response))
  //     .catch(error => console.error('Error from consumer:', error));
  // }

  @Get('projects')
  async getAllProjects(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') searchQuery?: string,
  ): Promise<any> {
    let data = {};
    const message = { action: 'read', entity: 'projects', query: { paginationQuery, searchQuery } };
    return this.client.send('test-topic', message)
      .toPromise()
      .then(response => {
        //console.log('Response from consumer:', response);
        data = response; // Assign response to data variable
        return data; // Return data variable
      })
      .catch(error => console.error('Error from consumer:', error));
  }


  @Post()
  getProjectData(@Body() project: Project) {
    return this.client.send('create-project-topic', JSON.stringify(project)); // args - topic, message
  }



  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.client.send('delete-project-topic', id);
  }





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



  // // @Get('send-message')
  // // async sendMessage() {
  // //   const message = { value: 'hi' };
  // //   const response = await lastValueFrom(this.client.send('test-topic', message.value)) ;
  // //   console.log('Received response:', response);
  // // }


  // @Get('send-message')
  // async sendMessage() {
  //   const message = { value: 'hi' };
  //   const test = await this.client.send('test-topic', message).toPromise();
  //   return console.log(test);
  //   //console.log('Received response:', response);
  //   //return response;
  // }







  // @Post()
  // getProject(@Body() data: any) {
  //   return this.client.emit('test-topic', data);
  // }

  // @Get()
  // async sendMessage() {
  //   const message = { value: 'hi' };
  //   const test = await this.kafkaClientService.sendMessage();
  //   return console.log(test);
  //   //console.log('Received response:', response);
  //   //return response;
  // }



}
