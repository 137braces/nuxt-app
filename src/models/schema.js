export const schema = {
  models: {
    Post: {
      name: 'Post',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: [],
        },
        content: {
          name: 'content',
          isArray: false,
          type: 'String',
          isRequired: true,
          attributes: [],
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: 'Posts',
      attributes: [
        {
          type: 'model',
          properties: {},
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['create', 'delete', 'update'],
                identityClaim: 'cognito:username',
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: '82a7d5b01d26abb0284295001b95fcf3',
}
