function ensureExists(entity, entityName, id) {
	if (!entity) {
		throw new Error(`${entityName}${id ? ` with ID ${id}` : ""} not found`);
	}
}

function validateAllowedValue(value, allowedValues, fieldName = "value") {
	if (!allowedValues.includes(value)) {
		throw new Error(`Invalid ${fieldName}: ${value}`);
	}
}

module.exports = {
	ensureExists,
	validateAllowedValue,
};
