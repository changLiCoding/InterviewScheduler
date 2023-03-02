# Interview Scheduler

Interview Scheculer is a single page app, built with ReactJS, Axios, Redux, and Web Socket. Allowing user to reserve an interview, Appointments are updated in real-time without refresh the page.

The scheduler API server is made with Express and Node.js at [scheduler-api](https://github.com/javascriptsucks/scheduler-api)

## ScreenShot

![real-time update](https://github.com/javascriptsucks/InterviewScheduler/blob/master/image/schedulerImg.gif)

## Get Start

1. Clone the repository

```
git clone git@github.com:javascriptsucks/InterviewScheduler.git interviewScheduler
```

2. Change directory to the Scheduler

```
cd interviewScheduler
```

3. Install npm packages

```
npm install
```

4. Run application

```
npm start
```

## Test

Tests were done by Storybook, Jest, and Cypress with a code coverage of 95%

1. Jest integration and unit tests

```
npm test
```

2. Cypress ETE tests

```
npm run cypress
```

3. Storybook components isolation tests

```
npm run storybook
```

## Dependencies

### Dependencies

⋅⋅*Normalize.css
⋅⋅*Axios
⋅⋅*Classnames
⋅⋅*React

### Dev-Dependencies

⋅⋅*React-scripts
⋅⋅*Storybook
⋅⋅*Jest-Dom
⋅⋅*Cypress
⋅⋅*SASS
⋅⋅*React-testing-library
⋅⋅\*prop-types
