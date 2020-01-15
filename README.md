## Welcome to the Praxis CLI Employee Tracker

This handy tool allows you to easily view, add, update, and remove employees from the comfort of your own terminal

### Features
- :eyeglasses: View All Employee roster (includes Title, Department, Salary, and Manager)
- :mag: Retrieve Employee roster by Department or Manager
- :woman_office_worker: Add new employees to Employee roster :star2:
- :memo: Quickly update an employee's role or manager
- :wastebasket: Remove employee from roster

### Implementation
- I decided to use the mysql2 package to take advantage of its Promise API support: https://www.npmjs.com/package/mysql2#using-promise-wrapper
- All my queries return a result promise which I used to:
    * Control the actions workflow 
    * Avoid collisions between the inquirer prompt and console printed query results
    * Utilize query results in my prompt answer choice arrays
    * Keep returning the user back to the Actions menu until she decides to exit
    
- I also implemented a mysql connection pool which I could let handle opening and closing my connections
- TODO: Add validation to Add Employee name input
