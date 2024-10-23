# Contributing to `Formity`

As the creators and maintainers of this project, we want to ensure that `formity` lives and continues to grow and evolve. We would like to encourage everyone to help and support this library by contributing.

## Code contributions

Here is a quick guide to doing code contributions to the library.

1. Fork and clone the repo to your local machine `git clone https://github.com/YOUR_GITHUB_USERNAME/formity.git`

2. Create a new branch from `main` with a meaningful name for a new feature or an issue you want to work on: `git checkout -b your-meaningful-branch-name`

3. Install packages by running:

   ```shellscript
   npm install
   ```

4. Try to write some unit tests to cover as much of your code as possible.

5. Ensure your code lints without errors.

   ```shellscript
   pnpm lint
   ```

6. Ensure the the end to end tests pass by running these commands:

   ```shellscript
   npm start
   ```

   ```shellscript
   npm run cypress:run
   ```

7. Ensure build passes.

   ```shellscript
   npm build
   ```

8. Push your branch: `git push -u origin your-meaningful-branch-name`

9. Submit a pull request to the upstream formity repository.

10. Choose a descriptive title and describe your changes briefly.

## Coding style

Please follow the coding style of the project. Formity uses eslint and prettier. If possible, enable their respective plugins in your editor to get real-time feedback.

## License

By contributing your code to the formity GitHub repository, you agree to license your contribution under the MIT license.
