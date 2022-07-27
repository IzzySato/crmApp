# TODO List

## add user

1. send invite function
* should send an email
* email should contain one time link
* DB: Invite model (userId, inviteId, usedFlag(bool))
* When user clicks invite link, they will be asked to set the password
* invite set used
* note: same as forget password
* [How to handle forgot password to reset password using a one-time link.](https://www.youtube.com/watch?v=72JYhSoVYPc)

## User

### Lock
* No delete user => lock the user
* lock means user no longer login
* confirm --> clear that user from session on server

## Login
* add recaptcha

## Create Logging class
* [How to create a Logger Service using JavaScript](https://enlear.academy/how-to-create-a-logger-service-using-javascript-a0b28f1b0816)

## lib > util
* Logger
* ObjectUtil (clone, filter, isEmpty, isNullOrEmty)
* TimeUtil (timeEnum)

## Customer
* view job btn
* customer detail btn -> page

## UI
* right top icon for configuration and users
* nav just icons

# DB Company Model


Company > user > job
Company > customer > location > job
