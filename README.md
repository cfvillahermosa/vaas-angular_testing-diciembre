# Angular Laboratory

> A sample project for Angular workshop demos

- [♊ Clone Repository on gitHub](https://github.com/TrainingITCourses/vaas-angular_testing-diciembre)

- 🚚 Install dependencies `npm i`

- 🚀 Execute `npm run api` and `npm start` to run the app.

- 📕 Read the `docs` folder content for more info.

## Unit and Integration testing with only Jasmine alone

- [Base Store](src\app\services\base.store.ts) (Unit)
- [Api Store](src\app\services\api.store.ts) (Integration)
- `npm install karma-spec-reporter --save-dev` (Add spec reporter)
- [tests](src\test.ts) (Choose running context)
- [Karma Config](karma.conf.js)(Configuration)

## Jasmine Spy and test doubles

- [Options Service](src\app\routes\options\options.service.ts) (Spy calls to Collaborator)
- [Base Store](src\app\services\base.store.ts) (Spy private methods)
- [Api Store](src\app\services\api.store.ts) (Spy and stub dependencies)
- [TimeSpan Pipe](src\app\pipes\time-span\time-span.pipe.ts) (Extract logic from Angular artifacts)

## Test Bed: imports and providers

- [Api Service](src\app\services\api.service.ts) (HttpClientTestingModule)
- [Utils Service](src\app\services\utils.service.ts) (inject a mock)
- [Home Service](src\app\routes\home\home.service.ts) (integrated -> imports vs isolated -> providers)

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
