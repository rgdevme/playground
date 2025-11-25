# [Nest.js 🔗](mobx.js.org)

Opinionated backend-framework built on top of express.

It allows you to create 3 types of applications:
- HTTP server: Listens to requests in a port
- Microservices: Commmunicates on local networks with alternative protocols
- Standalone app: No network communication. Excelent for scheduled or system-based tasks

## Key takeaways:

- Modules act as **building blocks relating functionalities/modules** in a graph-like structure, and are instantiated by any class anotated with the **@Module decorator**.
- Controllers are in charge of **receiving requests and returning responses**, and are instantiated by classes anotated with the **@Controller decorator**. Each method of a class corresponds to We can use HTTP_Verbs a handler which we can:
  - Decorate with a verb (**@GET, @POST, @PUT, @DEL**) to define endpointsControllers are in charge of **receiving requests and returning responses**, and are instantiated by classes anotated with the **@Controller decorator**. Each method of a class corresponds to We can use HTTP_Verbs a handler which we can:
  - Decorate with a verb (**@GET
  - Decorate it's arguments with **@Body** or **@Param** to access data
- **Providers are classes that can be injected as dependencies**, and are instantiated with the **@Injectabe decorator**.
  - As the name implies, **Providers provide functionalities wherever they are injected**.
  - Examples of providers are: **Services**

### Basic dependency injection flow
```ts
@Module({
  controllers: [MainController],
  providers: [MainService]
})
export class MainApp {} 

@Controller()
export class MainController {
  constructor(private mainService: MainService) {}
}

@Injectable()
export class MainService {}
```

## HTTP flow
- Middlewares: *@Injectable* **NestMiddelware**
- Guards: *@Injectable* **CanActivate**
- Interceptors: *@Injectable* **NestInterceptor**
- Pipes: *@Injectable* **PipeTransform**
- Handler: Our logic
- Interceptors: *@Injectable* **NestInterceptor**
- Exception Filters: *@Catch* **ExceptionFilter**
- Response

## Microservice flow 