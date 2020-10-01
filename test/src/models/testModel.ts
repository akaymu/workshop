import mongoose from 'mongoose';

interface TestAttrs {
  testName: string;
  testNo: number;
  isCorrect: boolean;
}

interface TestDoc extends mongoose.Document {
  testName: string;
  testNo: number;
  isCorrect: boolean;
}

interface TestModel extends mongoose.Model<TestDoc> {
  build(attrs: TestAttrs): TestDoc;
}

const testSchema = new mongoose.Schema({
  testName: {
    type: String,
    required: true
  },
  testNo: {
    type: Number,
    required: true,
    min: 0
  },
  isCorrect: {
    type: Boolean
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

testSchema.statics.build = (attrs: TestAttrs) => {
  return new Test(attrs);
}

const Test = mongoose.model<TestDoc, TestModel>('Test', testSchema);

export { Test };