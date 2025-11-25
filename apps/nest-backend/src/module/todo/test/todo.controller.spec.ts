import { Test } from '@nestjs/testing'
import { ToDosController } from '../todo.controller'
import { ToDoDocument } from '../todo.schema'
import { ToDosService } from '../todo.service'
import { todoStub } from '../todo.stub'

jest.mock('../todo.service')

describe('TodoController', () => {
  let controller: ToDosController
  let service: ToDosService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ToDosController],
      providers: [ToDosService]
    }).compile()

    controller = moduleRef.get<ToDosController>(ToDosController)
    service = moduleRef.get<ToDosService>(ToDosService)
    jest.clearAllMocks()
  })

  let id: string

  describe('create', () => {
    describe('when create is called', () => {
      const params = todoStub()

      beforeEach(async () => {
        const todo = await controller.create(params)
        id = todo.id
      })

      test('it should call create', () => {
        expect(service.create).toHaveBeenCalledWith(params)
      })
    })
  })

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let todo: ToDoDocument

      beforeEach(async () => {
        todo = await controller.findOne(id)
      })

      test('then is should call todoservice', () => {
        expect(service.find).toHaveBeenCalledWith(id)
      })
    })
  })

  describe('findAll', () => {
    describe('when findAll is called', () => {
      let todos: ToDoDocument[]

      beforeEach(async () => {
        todos = await controller.findAll()
      })

      test('then is should call todoservice', () => {
        expect(service.findAll).toHaveBeenCalled()
      })
    })
  })
})