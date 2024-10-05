export const USERS_MESSAGES = {
	VALIDATION_ERROR: 'Validation error',
	ACCESS_CODE_SENT: 'Access code successfully sent',
	FAILED_TO_SEND_ACCESS_CODE: 'Failed to send access code',
	WRONG_PHONE_NUMBER_OR_ACCESS_CODE: 'Wrong phone number or access code',
	ACCESS_CODE_VALIDATED: 'Access code validated',

	CREATE_USER_SUCCESS: 'User created successfully',
	GET_PROFILE_SUCCESS: 'Get profile success',
};


// Generic CRUD Message Type
type CrudMessage<T extends string> = {
	CREATE_SUCCESS: `${T} created successfully`;
	GET_SUCCESS: `Get ${string} success`; // Change from T.toLowerCase() to just string
	UPDATE_SUCCESS: `${T} updated successfully`;
	DELETE_SUCCESS: `${T} deleted successfully`;
	VALIDATION_ERROR: 'Validation error';
	NOT_FOUND: `${T} not found`;
};

// Enhanced Helper function to return specific message or full messages
export const MessageFactory = <T extends string, K extends keyof CrudMessage<T>>(
	entityName: T,
	messageKey?: K
): CrudMessage<T> | CrudMessage<T>[K] => {
	const messages: CrudMessage<T> = {
		CREATE_SUCCESS: `${entityName} created successfully`,
		GET_SUCCESS: `Get ${entityName.toLowerCase()} success`, // Lowercase at runtime
		UPDATE_SUCCESS: `${entityName} updated successfully`,
		DELETE_SUCCESS: `${entityName} deleted successfully`,
		VALIDATION_ERROR: 'Validation error',
		NOT_FOUND: `${entityName} not found`
	};

	// If a specific message key is provided, return that message only
	if (messageKey) {
		return messages[messageKey];
	}

	// Otherwise, return the full messages object
	return messages;
};

