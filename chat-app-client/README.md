# Ottonova Bot Chat Client

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Login Page /login

use one of the following credentials to login
```
	[
		{
			username: 'dominic',
			password: 'savio',
		},
		{
			username: 'john',
			password: 'doe'
		},
		{
			username: 'foo',
			password: 'bar'
		}
	]

```

## Chat Page /chat

you can perform the following actions on the chat page

1. send a message
	you can send send messages to the bot by typing in a message and clicking the send button.
	the chats section will then get appended with your message and a response from the bot

2. trigger a command 
	you can trigger a command by clicking the trigger command button.
	the bot will then respond with a widget in the chats section
	you can interact with each widget only once. Except for the map widget.

3. close chat
	closing the chat will take you to the user resonses section.
	if you interacted with any of the widgets in the chats, yoour respeonses will be visible here.
	else a message will be displayed saying you have no responses.

4. logout
	if you click the logout button, you will be redirected to login page.

## widgets

1. Map Widget
	display a map with coordinates sent in the command payload.

2. Date Widget 
	displays days sorted as per payload in command data

3. Complete Widget
	displays widget with a card to select yes or no. if you select yes the chat section will close and responses page will open.

4. Rate Widget
	display a widget asking user to rate the experience. No.of stars depends on response from server command payload.


### Authentication

If you try to access the chat or responses page without logiing in, you will be taken back to the login page


### Invalid URL

If you try to access any url that does not exist you will be take to the 404 page.

