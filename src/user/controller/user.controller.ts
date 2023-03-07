import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../schema/user.schema";
import { Request } from "express";
import { PaginationQueryDto } from "../pagination/paginationQuery";


@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

 /* @Get()
  findAll() {
    return this.userService.findAll();
  }*/


  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') searchQuery?: string,
  ) {
    const { numberOfElements, page } = paginationQuery;
    const query = searchQuery;
    return this.userService.findAll(paginationQuery, query);
  }



  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }


}












