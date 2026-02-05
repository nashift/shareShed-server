import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // VERY IMPORTANT (security)
    },

    // ROLE SYSTEM
    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      required: true,
      default: "user"
    },

    // PROFILE COMPLETION (NEXT PAGE)
    phone: {
      type: String,
      default: ""
    },

    address: {
      street: String,
      city: String,
      pincode: String,
      state: String
    },

    isProfileComplete: {
      type: Boolean,
      default: false
    },

    // USER STATUS
    isActive: {
      type: Boolean,
      default: true
    },

    // PROVIDER-SPECIFIC DATA 
    providerDetails: {
      shopName: String,
      verificationStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
