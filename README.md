This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

After downloading, make sure to install dependencies:

```sh
yarn install
```

## Development

First, run the development server:

```sh
yarn dev
```

Then, you'll be able to see the application running at http://localhost:3000. Edit files in [`src/pages`](./src/pages) to edit the various pages. All of the various pages are powered by data in the [`src/data`](./src/data) directory.

## Generating the Resume

In Chrome on macOS, navigate to /resume and print the page to either a PDF or a printer, and remember to remove the headers and footers for the cleanest version, without the added page title, date, or url.

## Deploying

This application is cloned to a digital ocean droplet, statically exported, and then served via Apache. See it live at https://matt.dule.one.
