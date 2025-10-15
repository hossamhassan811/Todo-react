# TODO: Implement localStorage for Task Persistence

## Steps to Complete:
- [x] Modify App.js to load tasks from localStorage on component mount
- [x] Modify App.js to save tasks to localStorage whenever tasksData changes
- [x] Test the application to ensure tasks persist across reloads

## Notes:
- Use useEffect hooks in App.js for loading and saving data
- Store tasks as JSON string in localStorage under key 'tasks'
- Ensure data is parsed correctly on load
