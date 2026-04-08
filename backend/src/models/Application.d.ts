import mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    userId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    dateApplied: NativeDate;
    status: "Applied" | "Phone Screen" | "Interview" | "Offer" | "Rejected";
    aiSuggestions: string[];
    jdLink?: string | null;
    notes?: string | null;
    salaryRange?: string | null;
    parsedData?: {
        skills: string[];
        niceToHave: string[];
        seniority?: string | null;
        location?: string | null;
    } | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default _default;
//# sourceMappingURL=Application.d.ts.map