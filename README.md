# Testing RTK-Query with Jest/Testing-Librar with MSW as a API mock

How to run test

```javascript
npm i
npm run test
```

## What seems to be the problem

The problem may be msw library's issue.
This seems to be the case as whenever I try to test the error case first, both success/error case passes, where if I try to test the success case first, the error case always fails.
I have 4 different test files showing this.

### server.resetHandlers() doesn't seem to work properly with MSW

As you can see my 4 different test cases, server.resetHandlers() seems to fail whenever I test the error case SECOND, or after the success case.
