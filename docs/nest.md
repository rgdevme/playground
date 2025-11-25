# [Nest.js 🔗](mobx.js.org)

Opinionated backend-framework built on top of express.

It allows you to create 3 types of applications:
- HTTP server: Listens to requests in a port
- Microservices: Commmunicates on local networks with alternative protocols
- Standalone app: No network communication. Excelent for scheduled or system-based tasks

## Key takeaways:

- Modules act as **building blocks relating functionalities/modules** in a graph-like structure, and are instantiated by any class anotated with the **@Module decorator**.
  - Modules are built by importing and injecting providers, controllers and other modules.
  - Modules can also export any internal providers, controllers, or imported modules.
  - Re-exporting instances ensures stability, and better use of resources.

- Controllers are in charge of **receiving requests and returning responses**, and are instantiated by classes anotated with the **@Controller decorator**. Each method of a class corresponds to a handler which we can:
  - Decorate with a verb (**@GET, @POST, @PUT, @DEL**) to define endpoints.
  - Decorate it's arguments with **@Body** or **@Param** to access data.

- **Providers are classes that can be injected as dependencies**, and are instantiated with the **@Injectabe decorator**.
  - As the name implies, **Providers provide functionalities wherever they are injected**.
  - Examples of providers are: **Services**

- For **microservices**, we use the microservices package and decorate the methods of our controller with **@EventPattern** (to trigger an event) or **@MessagePattern** (to trigger an event and wait for its response).
  - To **communicate between services** we need to create a **ClientProvider** by registering a ClientModule and **inject it in the requiring Provider**.
  - To access the payload we decorate the arguments with **@Payload**.

### Basic dependency injection flow
```ts
/** Main module declaration */
@Module({
  controllers: [MainController],
  providers: [MainService],
  imports: [NestedModule] // Register module in
})
export class MainApp {} 

@Controller()
export class MainController {
  constructor(private mainService: MainService) {}
}

@Injectable()
export class MainService {}

/** Nested modules */
@Module({
  controllers: [MainController],
  providers: [MainService]
})
export class NestedModule {} 

@Controller()
export class NestedController {
  constructor(private mainService: NestedService) {}
}

@Injectable()
export class NestedService {}

```

## Recommended code structure
```
src/
├── modules/
│   ├── [concern]/
│   │   ├── dto/
│   │   ├── [concern].controller.ts
│   │   ├── [concern].module.ts
│   │   ├── [concern].service.ts
│   │   ├── [concern].spec.ts
├── common/
│   ├── filters/
│   ├── interceptors/
│   ├── guards/
│   ├── pipes/
├── main.ts
└── app.module.ts
```

### Request flow
- Middlewares: *@Injectable* **NestMiddelware**
- Guards: *@Injectable* **CanActivate**
- Interceptors: *@Injectable* **NestInterceptor**
- Pipes: *@Injectable* **PipeTransform**
- Handler: Our logic
- Interceptors: *@Injectable* **NestInterceptor**
- Exception Filters: *@Catch* **ExceptionFilter**
- Response
