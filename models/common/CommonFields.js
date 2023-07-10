// Add all common fields here for mapping.

const CommonFields = {
    createdAt: {type:Date, required:true, default: Date.now()},
    updatedAt: {type:Date, required:true, default: Date.now()},
};

export default CommonFields;