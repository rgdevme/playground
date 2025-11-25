import { jest } from '@jest/globals';
import { todoStub } from '../todo.stub';

const mock = jest.fn<any>()

export const ToDosService = mock.mockReturnValue({
  create: mock.mockResolvedValue(todoStub()),
  find: mock.mockResolvedValue(todoStub()),
  findOneAndUpdate: mock.mockResolvedValue(todoStub()),
  findAll: mock.mockResolvedValue([todoStub()]),
})