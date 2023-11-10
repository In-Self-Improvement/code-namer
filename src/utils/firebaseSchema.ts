export const userSchema = (uid: string) => ({
  fields: {
    createdAt: { timestampValue: new Date().toISOString() },
    uid: { stringValue: uid },
    // recommendName: { stringValue: "recommendName" },
  },
});

export const recommendNameSchema = {
  FunctionNames: {
    functionId1: {
      name: 'calculateTotal',
      creatorId: 'userId1',
    },
  },
};

const data = {
  fields: {
    recommendedNames: {
      mapValue: {
        // fields: fields,
      },
    },
    selectedName: { stringValue: 'selected name' },
    likes: { integerValue: 0 },
    username: { stringValue: '테스터' },
    createdAt: { timestampValue: new Date().toISOString() },
    // desc: { stringValue: functionality },
  },
};
