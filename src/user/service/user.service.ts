import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User, UserDocument } from "../schema/user.schema";
import { PaginationQueryDto } from "../pagination/paginationQuery";

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }


  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userModel.findByIdAndRemove(id);
  }

  findAll(paginationQuery: PaginationQueryDto, searchQuery?: string) {
    const { numberOfElements, page } = paginationQuery;
    const query = searchQuery
      ? {
        $or: [
          { name: new RegExp(searchQuery, 'i') },
          { email: new RegExp(searchQuery, 'i') },
        ],
      }
      : {};
    return this.userModel.find(query).skip(page).limit(numberOfElements).exec();
  }




  // async findAll(): Promise<UserDocument[]> {
  //   return this.userModel.find()
  //     .exec();
  // }

  /*find(options) {
    if (options && options._id) {
      options._id = new Types.ObjectId(options._id);
    }
    return this.userModel.find(options);
  }

  count(options) {
    if (options && options._id) {
      options._id = new Types.ObjectId(options._id);
    }
    return this.userModel.count(options).exec();
  }*/


}