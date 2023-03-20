import { faker } from '@faker-js/faker';

type Overrides = Record<string, any>;

export const storeGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  index: faker.datatype.number(),
  rating: faker.datatype.float(),
  promotion: faker.datatype.string(),
  isNew: faker.datatype.boolean(),
  categoryId: faker.datatype.uuid(),
  minCookTime: faker.datatype.number(),
  maxCookTime: faker.datatype.number(),
  restaurant: faker.company.companySuffix(),
  name: faker.company.name(),
  imageUrl: faker.image.imageUrl(),
  ...overrides,
});

export const CategoryGenerator = (overrides?: Overrides) => ({
  id: faker.datatype.uuid(),
  name: faker.company.name(),
});
