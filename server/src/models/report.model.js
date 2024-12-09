import mongoose from "mongoose";

const reportSchema = new mongoose.Schema (
    {
        title : {
            type: String,
            required: true
        },
        formTitle : {
            type: String,
            required: true
        },
        totalForms: {
            type: Number,
            required: true
        },
        pendingForms: {
            type: Number,
            required: true
        },
        processedForms: {
            type: Number,
            required: true
        },
        rejectedForms: {  
            type: Number,
            required: true
        },
        labels: {
            type: [String],
            required: true
        },
        labelsName: {
            type: String,
            required: true
        },
        data: {
            type: [Number],
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default : Date.now,
        },
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },
    },
    { timestamps: true }
)

export const Report = mongoose.model("Report", reportSchema)