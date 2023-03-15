import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Project, ProjectDomucment } from "../schema/project.schema";
import { Model } from "mongoose";
import { UserDocument } from "../../user/schema/user.schema";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateUserDto } from "../../user/dto/update-user.dto";
import { PaginationQueryDto } from "../../user/pagination/paginationQuery";
import { UpdateProjectDto } from "../dto/update-project.dto";

@Injectable()
export class ProjectService {

  constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDomucment>) {
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDomucment> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findOne(id: string) {
    return this.projectModel.findById(id);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDomucment> {
    return this.projectModel.findByIdAndUpdate(id, updateProjectDto);
  }

  async remove(id: string) {
    return this.projectModel.findByIdAndRemove(id);
  }


  findAll(paginationQuery: PaginationQueryDto, searchQuery?: string) {
    const { numberOfElements, page } = paginationQuery;
    const query = searchQuery
      ? {
        $or: [
          { name: new RegExp(searchQuery, 'i') },
          { description: new RegExp(searchQuery, 'i') },
        ],
      }
      : {};
    return this.projectModel.find(query).skip(page).limit(numberOfElements).exec();
  }


  findByUserId(id:string){
    return this.projectModel.find({userId: id});
  }













}
