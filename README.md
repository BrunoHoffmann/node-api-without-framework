database
  - a file which store all application data

src -all source code 
  - entities - object mappings
  - factories - instance generators
  - repositories - data acess 
  - routes - endpoint mappings 
  - services - commmunication between the routes and repositories layer (business logic)
  - util - shared code
  - handler - commmunication between routes and server
  - index - server instance 

tests -> all automated test suites
  - integration tests - testing on the user point of view. it's  also an E2E test because there's no app consuming it

  - unit tests 
    all tests that must run wihtout any external connections such as 
    databases, external APIs and on our case, the fileSystem

bruno-api-client -> API client file https://www.usebruno.com/