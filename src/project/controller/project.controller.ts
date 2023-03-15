import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ProjectService } from "../service/project.service";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { CreateProjectDto } from "../dto/create-project.dto";
import { PaginationQueryDto } from "../../user/pagination/paginationQuery";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";

@Controller('projects')
export class ProjectController {


  constructor(private readonly projectService: ProjectService) {
  }

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }



  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('search') searchQuery?: string,
  ) {
    const { numberOfElements, page } = paginationQuery;
    const query = searchQuery;
    return this.projectService.findAll(paginationQuery, query);
  }



  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectService.remove(id);
  }


  @Get("/user/:id")
  findByUserId(@Param("id") id: string) {
    return this.projectService.findByUserId(id);
  }

}
