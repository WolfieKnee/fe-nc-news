# NC-News

I completed this front end project as part of the Software Development Bootcamp with [Northcoders](https://northcoders.com/). The project "NC News" uses [React](https://react.dev/) to access the [NC News backend API](https://github.com/WolfieKnee/fe-nc-news) which I developed as a back end project. It is now live, and deployed via [Netlify](https://www.netlify.com/) at:
https://celebrated-biscochitos-30e593.netlify.app/

## Software

This project was completed using:

-   [npm](https://www.npmjs.com/)
-   [Vite](vitejs.dev)
-   [axios](https://axios-http.com/)
-   [React](https://react.dev/) with [react router](https://reactrouter.com/)

## Setup

The code for this project is available on this [GitHub repo](https://github.com/WolfieKnee/fe-nc-news) and can be cloned using:

```
$ git clone https://github.com/WolfieKnee/fe-nc-news
```

Npm packages can then be installed:

```
$ npm install
```

You can then run the site locally using Vite with:

```
$ npm run dev
```

If you're using your own api, then this can be configured by changing the axios base url in the utils.js file:

```
|_src
    |_utils
        |_utils.js

baseURL: "https://yoursite.com/api",
```

The site can be built with:

```
$ npm run build
```

The [vite documentation](https://vitejs.dev/guide/static-deploy.html) has a list of options for deployment, such as [Netlify](https://www.netlify.com/), which also offers [Netlify Command Line Interface](https://docs.netlify.com/cli/get-started/) (CLI) tools.

### Minimum Requirements

Node minimum version: v20.8.0

## Other Info

favicon from by Andrew Caliber from [noun project](https://thenounproject.com/icon/news-1829431/) (cc 3.0)
