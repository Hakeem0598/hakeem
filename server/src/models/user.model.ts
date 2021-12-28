import crypto from 'crypto';
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export type Role = 'user' | 'admin'

export type UserInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    avatar: string;
}

export type UserDocument = UserInput & Document & {
    createdAt: Date;
    updatedAt: Date;
    passwordChangedAt: Date,
    passwordResetToken: string;
    passwordResetExpires: number;
    comparePasswords(candidatePassword: string): Promise<boolean>;
    createPasswordResetToken(): string;
    changedPasswordAfter(timeStamp: number): boolean;
}

const userSchema = new mongoose.Schema<UserDocument, Model<UserDocument>>(
    {
        firstName: { type: String, required: true, unique: true },
        lastName: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        role: { type: String, default: 'user' },
        avatar: String,
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function (this, next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

userSchema.pre('save', function(this, next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = new Date(Date.now() - 1000);

    next();
});

userSchema.methods.comparePasswords = function(this, candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
}

userSchema.methods.changedPasswordAfter = function (cookieTimeStamp: number) {
    if (this.passwordChangedAt) {
        const changedTimestamp = ~~(this.passwordChangedAt.getTime() / 1000);
        return cookieTimeStamp < changedTimestamp;
    }
    return false;
}

userSchema.methods.createPasswordResetToken = function(this) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken
}

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;