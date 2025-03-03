import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User> & {
  comparePassword: (password: string) => Promise<boolean>;
};

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  name: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// **Define comparePassword as a schema method**
UserSchema.methods.comparePassword = function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  // Only hash the password if it has been modified or is new
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
