import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "../../user/schema/user.schema";



export type  ProjectDomucment = Project & Document;

@Schema()
export class  Project {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  userId: Types.ObjectId;


}
export const ProjectSchema = SchemaFactory.createForClass(Project);


