# Gardening website

This is a website where user can post, comment & like to their favourite posts and also add this to their favourite sections, user can manage their profile and enjoy gardening tips. Also they can be premium users to get the premium contents.

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use


## Backend

### At first clone the backend server for this or download the zip file for it & open this with vs code and run:

```bash
npm install ( to install all dependencies )
```

### Run the following command to make sure the server is running:
```bash
npm run start:dev
```
Now you are done with backend setup.



## Frontend

### clone the repository for frontEnd & open your terminal where give a command:


```bash
git clone https://github.com/Omitul/Gardening-Site-Frontend.git (if you have the git installed or you can download the zip file)
```


### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

### Setup this for images in your next.config.js
```bash
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
```


After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
