## Planning  
  
> What do you think are the greatest areas of risk in completing the project?  
  1. API Rate Limits: GitHub's API has rate limits which could affect the ability to fetch data, especially if the application is used frequently.
  2. Error Handling: Properly handling errors from the GitHub API, such as network issues or invalid URLs, is crucial to ensure a smooth user experience.
  3. Performance: Fetching and displaying a large number of issues could impact performance, especially if there are many open, closed, and pull requests.
  4. User Experience: Ensuring that the loading, empty, and error states are intuitive and provide clear feedback to the user.
  
> What changes/additions would you make to the design?  

To emulate GitHub's UI, making the application more intuitive for users who are already familiar with GitHub's design. This will enhance the user experience by providing a familiar interface.
  
> List a two or three features that you would consider implementing in the future that would add significant value to the project.  
  1. Pagination: Implement pagination for the results to handle large datasets more efficiently and improve performance.
  2. Search History: Add a feature to save and display the user's recent searches for quick access.
  3. Advanced Filtering: Allow users to filter issues by additional criteria such as labels, assignees, or milestones.
  4. Authentication: Allow users to authenticate with their GitHub account to access private repositories and increase API rate limits.

## Looking Back  
  
> Describe the major design/build decisions and why you made them.  

I decided to use tabs, because this looks similar to GitHub UI
  
> How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").  

Coding - 2.5 hrs
GitHub API research - 0.5 hrs
  
> If you could go back and give yourself advice at the beginning of the project, what would it be?  

Don't try to make this server side))))
  
> Did you learn anything new?  

GitHub API
  
> Do you feel that this assignment allowed you to showcase your abilities effectively?  

Yeah, i guess
  
> Are there any significant web development-related skills that you possess that were not demonstrated in this exercise? If so, what are they?

Cache (will take much time to implement)
Infinite scroll (same reason)
Auth search (same reason)
Filtering (same reason)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

