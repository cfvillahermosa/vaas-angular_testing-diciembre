# Angular Laboratory

> A sample project for Angular workshop demos

- **♊ Clone Repository on gitHub** _https://github.com/TrainingITCourses/vaas-angular_testing-diciembre _

- 🚚 Install dependencies `npm i`

- 🚀 Execute `npm run api` and `npm start` to run the app.

- 📕 Read the `docs` folder content for more info.

## Unit and Integration testing with only Jasmine alone

- **Base Store** _src\app\services\base.store.ts _ _Unit _
- **Api Store** _src\app\services\api.store.ts _ _Integration _
- `npm install karma-spec-reporter --save-dev` _Add spec reporter _
- **tests** _src\test.ts _ _Choose running context _
- **Karma Config** _karma.conf.js _ _Configuration _

## Jasmine Spy and test doubles

- **Options Service** _src\app\routes\options\options.service.ts _ _Spy calls to Collaborator _
- **Base Store** _src\app\services\base.store.ts _ _Spy private methods _
- **Api Store** _src\app\services\api.store.ts _ _Spy and stub dependencies _
- **TimeSpan Pipe** _src\app\pipes\time-span\time-span.pipe.ts _ _Extract logic from Angular artifacts _

## Test Bed: imports and providers

- **Api Service** _src\app\services\api.service.ts _ _HttpClientTestingModule _
- **Utils Service** _src\app\services\utils.service.ts _ _inject a mock _
- **Home Service** _src\app\routes\home\home.service.ts _ _integrated -> imports vs isolated -> providers _

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
