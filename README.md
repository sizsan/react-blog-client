# Deploy a React app

It's time to deploy our client and show everyone our awesome work! We have several options to store our webapp, specially when is a static client, so we'll see some of them. Some of them are easy to use, but have more limitations, others are trickier but they can offer a better functionality. After the lesson, it will be your choice which one is your favourite! 

We are going to deploy the last version of the client we built in the React Axios lesson, make sure that the project is a git repo because we'll need it for some of the deployment tools.


- [Deploy a React app](#deploy-a-react-app)
  - [Deploy to Heroku](#deploy-to-heroku)
  - [Deploy to Netlify](#deploy-to-netlify)
  - [Deploy to github pages](#deploy-to-github-pages)
  - [Challenge](#challenge)


## Deploy to Heroku

When we deployed our server we did it on Heroku, so that will be our first option. We need to check some things first:
- Log in to Heroku
- heroku-cli is installed (type `heroku -v` in your console)
- Check your node version (type `node -v` in your console)
- add the node engine to package.json including your version
```javascript
"engines": {
    "node": "10.x"
}
```
In `config/api.js` we already added a link to connect our client with the server, but it's a better practice if we add an environment variable, for example, if the server's url changes we don't need to change the code, we just change the variable. 
```javascript
baseURL: process.env.EXPRESS_URI ||'your_server_url/',
```

We are going to check the client locally in port 5000 before the deployment with:
```javascript
heroku local web
```
If everything works fine it's time to start the push to Heroku, these are the steps:
```javascript
$ git add .
$ git commit -m "Add the environment variable"
$ heroku login -i
Enter your Heroku credentials.
...
$ heroku create
```
Last step before the deployment is to set the EXPRESS_URI variable:
```javascript
heroku config:set EXPRESS_URI=your_server
```
And finally:
```javascript
git push heroku master
```
And now everything should work correctly. Let's go now with other options.

## Deploy to Netlify
We are going to deploy the project now with netlify. It's a nice tool for deployment that offers different kind of hosting, and includes an option to deploy our app for free.

First of all, we are going to visit [netlify.com](https://www.netlify.com/) and sign up. I recommend to sign up with your github account, the main advantage is that we can deploy our github repost almost with one click.

Our deployment will be done from the console and these are the steps:
- Build the project (choose your package manager)
```javascript
npm run build

yarn run build
```
This command will create a build folder where our webapp will be build. Take a look to the folder and see what files have been created.

- Install netlify CLI
```javascript
npm i netlify-cli -g
```

- Login to your account
```javascript
netlify login
```
- Deploy the app to netlify (it'll prompt you for the directory to use, you need to say `build`)
```javascript
npm run deploy
```
This will provide a temporary link just to check if everything works fine, if it does we can run the production deployment
```javascript
npm run deploy --prod
```
There are more things we can do with netlify, for example add environment variables. We can this in [app.netlify.com](https://app.netlify.com) if we choose our app -> settings -> build&deploy -> environment -> edit variables.

What happen if you refresh the page? The blog client is gone. Netlify has some issues managing routes and redirects, but the solution is quite simple. We will open our build directory and we'll create a file named `_redirects` where we are going to add a rewrite rule
```javascript 
/*    /index.html   200
```
After that run the deploy again and if the 404 error is fixed.

Notice that after the deployment a `.netlify` directory has been created. If we are going to push the project to github is recommended to include this folder in .gitignore. 

## Deploy to Github pages

*Make sure you're connected is in a github repo

Github offers a way to deploy our webapps with github pages. The process is similar to netlify (build and deploy). To start, we can remove the build directory. And build it:
```javascript  
npm run build
```
Notice that we have a message telling us that we should add a home page in our package.json, so let's do that
```javascript 
"homepage":"https://jairoaussie.github.io/blog-client",
```
We need to install the github-pages library:
```javascript
npm install --save gh-pages
```
If it's included in the dependencies let's do the deployment. We can run `gh-pages -d build` and it should work. In this case we are going to add a couple of script in package.json
```javascript
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
```
If now we go to our github repo -> settings -> github pages we see that is already there. Go back to the top of the repo and now we have a second branch, if we select it, you'll see that contains the content of build. 

Open the page and notice that our posts are not displayed, we have the NotFound component instead. The bad news is that github-pages is not the best to hadle the routes and SPAs. But, same as netlify, the solution is quite simple. Go to app.js and replace the `BrowserRouter` component for the `HashRouter` component. Build the project and do the deployment again and see that the project is working fine with a `#` in the path.

Other solution is to pass the 'basename' prop to the router to set the base URL for all locations. For example:
```javascript
<BrowserRouter basename="/blog-client">
```
or using an environment variable, much better!
```javascript
<BrowserRouter basename={process.env.PUBLIC_URL}>
```

## Challenge
Do some research about other deployment webapps (now, amazon S3, ...) so you can decide which one suits you best!
