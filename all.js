Array.prototype.removeByKey = function(index) {
	var numToRemove = 1;
	return this.splice(index, numToRemove);
};