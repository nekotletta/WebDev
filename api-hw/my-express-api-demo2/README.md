# Adriana N Hernandez Vega
# CCOM4995 | Wed Desgin
# Assignment #3: API
# *Updated README

## How to run the project:

1. Download and decompress the zip file.
2. Navigate to the src/ folder inside the project.
3. Run node server.js on the terminal.
4. To test all requests, you should download Postman with the url http://localhost:3000/api/v1/[endpoint] to execute them.
5. Make sure to add the appropriate key and value pair to the headers in the authorization tab in postman to be able to use the API. Read the API middleware and the .env file to obtain the correct credentials. 

## Information on the endpoints programmed

### The project is divided into 5 components:

User: Records of a user's information.

Skill: A collection of records of users' skills, along with how proficient they are at them. A user can have more than one skill.

Experiences: A collection of records of users' projects, or work experiences, along with dates and descriptions on them.

Education: A collection of records about users' education.

Portfolio: A record which shows the user's information, skills, experiences, and education, all concatenated into a single JSON object / shown in a single page.

### Each of these components share the following validation tests:

When adding records to any of these, it is validated that all required fields are filled. 

When editing or deleting any of these, it is validated that the user, or record, exists beforehand. This validation is also applied when retrieving things by ID.

### Specific validations:

Some components have a start date and end date field (education and experience), for these it is validated that the start date comes before the end date. i.e. you're not starting your job in April 1st and finishing it in March 30th the same year. These dates are in (YYYY-MM-DD) format.

## User endpoints [/users/]

### GET (/)

Description: Retrieves all users registered in the User table.

Payload: N/A

Notes: N/A 

### GET (/:id)

Description: Retrieves a specific user based on ID; requires a user ID in the request url.

Payload: N/A

Notes: N/A

### POST (/)

Description: Creates a new user.

Payload: {
    "firstName":"example",
    "lastName":"example",
    "password":"examplepw",
    "email":"example@example.com",
    "role":"Admin"
}

Notes: The password is hashed when adding the user to the database. The role attribute can only be either Admin, Supervisor, or User.

### PUT (/:id)

Description: Allows to edit a specific user's info based on their ID; requires a user ID in the request url.

Payload: {
    "firstName":"example",
    "lastName":"example",
    "email":"example@example.com",
    "role":"Admin"
}

Notes: All fields can be altered, except the password, hence why it's not included in the payload.

### DELETE (/:id)

Description: Removes the specified user's record from the User table; requires a user ID in the request url.

Payload: N/A

Notes: N/A 

## Skills endpoints [/skills/]

### GET (/)

Description: Retrieves all skill records registered in the Skill table.

Payload: N/A

Notes: N/A 

### GET (/:userId)

Description: Retrieves every skill that a specific user possesses; requires a user ID in the request url.

Payload: N/A

Notes: N/A 

### POST (/:userId)

Description: Creates a new skill for a specific user; requires a user ID in the request url.

Payload: {
    "name": "example",
    "proficiency": "example"
}

Notes: N/A 

### PUT (/:userId/:id)

Description: Allows to a edit a specific skill possessed by a specific user, hence the two parameters. Requieres a user's ID (first) and the skill's ID (second) in the request url.

Payload: Same as the POST endpoint.

Notes: N/A 

### DELETE (/:userId/:id)

Description: Reomves a specific skill possesed by a specific user. Requieres a user's ID (first) and the skill's ID (second) in the request url.

Payload: N/A

Notes: N/A 

## Experience [/experience/]

### GET (/)

Description: Retrieves all experience records registered in the Experience table.

Payload: N/A

Notes: N/A 

### GET (/:userId)

Description: Retrieves every experience record that a specific user possesses; requires a user ID in the request url.

Payload: N/A

Notes: N/A

### POST (/:userId)

Description: Creates a new experience record for a specific user; requires a user ID in the request url.

Payload: {
    "jobtitle": "example",
    "company": "example",
    "description": "example",
    "startdate": "2022-01-01",
    "enddate": "2022-01-01",
    "isproject": "true"
}

Notes: isproject is a boolean field, meaning the user must explicitly write "true" or "false", in quotes. It is worth noting that a "false" project means that this is a job experience, rather than a personal project.

### PUT (/:userId/:id)

Description: Allows to edit a sepcific experience record possesed by a specific user. Requieres a user's ID (first) and the experience's ID (second) in the request url.

Payload: Same as the POST endpoint.

Notes: N/A

### DELETE (/:userId/:id)

Description: Removes a specific experience record possessed by a specific user. Requieres a user's ID (first) and the experience's ID (second) in the request url.

Payload: N/A

Notes: N/A

## Education [/education/]

### GET (/)

Description: Retrieves all education records registered in the Education table.

Payload: N/A

Notes: N/A 

### GET (/:userId)

Description: Retrieves every education record that a specific user possesses; requires a user ID in the request url.

Payload: N/A

Notes: N/A

### POST (/:userId)

Description: Creates a new education record for a specific user; requires a user ID in the request url.

Payload: {
    "institution": "example",
    "degreeid": 1,
    "fieldofstudy": "example",
    "startdate": "2024-01-01",
    "enddate": "2024-01-01"
}

Notes: degreeid is a foreign key to the Degree table in the database. For this reason, it is validated that the ID provided actually exists in the table beforehand.

### PUT (/:userId/:id)

Description: Allows to edit a sepcific education record possesed by a specific user. Requieres a user's ID (first) and the education's ID (second) in the request url.

Payload: Same as the POST endpoint.

Notes: N/A

### DELETE (/:userId/:id)

Description: Removes a specific education record possessed by a specific user. Requieres a user's ID (first) and the education's ID (second) in the request url.

Payload: N/A

Notes: N/A

## Portfolio (/portfolios/)

### GET (/:userId)

Description: Retrieves a specific user's portfolio; requires a user ID in the request url.

Payload: N/A

Notes: N/A