##Assuming the list of names are fetched from an actual api, how would you implement authentication, rate limiting handling, error handling, api unavailability? - What kind of retry strategies you’d imagine implementing?

for the authentication usually the API provider provides access token or API key, this is included in each request to the API.
For rate limiting handling the API provider provides information to obtain current limit information and also retry-after information so how long user should wait until the next request become possible.

Application should be designed in a way that it correctly handles the errors, for example, for 400 bad request or 404 not found possible message should be displayed to the user.

In case of APLi downtime, the app should retry later and display a message to user indicating that APi is currently unavailable.

##How can we protect the app from being abused?

we can apply some techniques to protect the app from being abused. Implement authentication and Permission to identify user and specify the access scope of the user. Use captchas to avoid automated attacks and limit the number of user's request.

##How can we be sure the app is running with the latest version of code?

We can use git to easily track changes in the code in a collaboration of several developers.
Configuring CI/CD pipeline is another solution to have the latest version of the code.

##What techniques you can employ to ensure users are not disrupted when you make significant changes to code?
Staged environment: we can have a development environment, when everything is working fine in the development environment then deploy it to the production.


##What kind of accessibility best practices should we keep in mind?

The app should be accessible to all types of users specially those with disabilities, it should be designed with html elements to render and understand easily. The app should have the same look and feel in terms of coloring and theming. alternative text for images and captions for multimedia elements is also helpful.

##How would you structure the css so that we have the most reusability but also the least leakage between components?

CSS preprocessor such as Sass or Less: this makes styles reusable across components without duplication.
Use utility classes make it easier to reuse css styles and avoid writing much css code.





















Staged Deployments: Implement staged deployments where you deploy the new version of the app to a staging environment before rolling it out to production. This allows you to test the new version in a controlled environment before deploying it to the live app.