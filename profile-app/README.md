# Assignment #2: React profile
# Adriana N Hernandez Vega

## How to run the app: 

1. Download and decompress the folder with the code. 
2. cd into your decompressed directory
3. Run npm install 
4. Run npm run dev
5. Run o + enter, so that the app is displayed on the browser, or, click on the link provided by the previous command.

## Note

Some of the images used in this assigment are sourced online, meaning that those images will not load if this is revised offline. 

## Features

1. Navbar: Allows the user to visit all pages on the profile.
2. Main page: Displays general information about programming languages and frameworks, along with advantages and disadvantages of some of them. 
3. Experience page: Displays a table describing the user's work experience, personal projects, interships, and relevant courses taken. 
4. Todo List: The user is presented with an empty task list in which they're allowed to do the following:
    - Add task: A prompt pops up. The user should input the title of the task. Once created, it'll be displayed with a "Pending" status.
    - Complete task: The user can click on the status button to update it to a "Completed" task.
    - Remove task: Every task contains a button to remove the specific task. Upon clicking, a warning will pop up, asking the user if they're sure they want to remove it. 
    - Remove completed tasks: The user can remove all tasks that are marked as "Completed" at once. 
5. Blog: The user is presented with four blogposts. The user is able to click each one of them to read its contents. 
6. Contact form: The user must provide a valid email (320 characters max), along with a message (500 characters max). 
    - The user has a checkbox at the bottom, which can be clicked to subscribe to the newsletter in the profile. 
    - The message (alert) displayed to the user upon submitting will dpeend on whether or not this box was checked. 

## Color palette

The color palette can be found in the scss/custom.scss.

Going for a pastel color palette. 

Main two colors are different enough

Primary: #11726F

Secondary: #AFEDD4

Success and danger are always associated with these colors, but I made them pastel to match the theme.

Success: #C1FF9B

Danger: #ff8585

Used pastel yellow to highlight blocks of information, as opposed to leaving the page too empty.

Info: #F5FFC6