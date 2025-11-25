// import { faker } from '@faker-js/faker'
import { ToDo } from "./todo.schema"

export const todoStub = (): ToDo => {
  // const createdAt = faker.date.past()
  const createdAt = new Date()
  return ({
    title: 'faker.lorem.sentence({ min: 1, max: 5 })',
    description: 'faker.lorem.paragraph()',
    createdAt,
    updatedAt: new Date()
    // updatedAt: faker.date.between({ from: createdAt, to: new Date() })
  })
}