#pragma strict



/* Variables */
private var self : EventCenter = this;
private var bindings = {};



/* Functions */
public function Bind(eventKey : String, callback : Function) {
	var eventBindings : Array = bindings[eventKey];
	if (!eventBindings) {
		eventBindings = [];
	}
	eventBindings.Add(callback);
	bindings[eventKey] = eventBindings;
	return self;
}
public function Unbind(eventKey : String, callback : Function) {
	var bindingsForKey : Array = bindings[eventKey];
	if (!bindingsForKey) {
		return;
	}
	bindingsForKey.Remove(callback);
	return self;
}
public function Trigger(eventKey : String, arguments) {
	Debug.Log("Event: " + eventKey);

	var bindingsForKey : Array = bindings[eventKey] || [];
	var bindingsCount : int = bindingsForKey.length;
	for (var bindingIterator : int = 0; bindingIterator < bindingsCount; bindingIterator++) {
		(bindingsForKey[bindingIterator] as Function)(arguments);
	}
	return self;
}
public function Trigger(eventKey : String) {
	return Trigger(eventKey, null);
}
