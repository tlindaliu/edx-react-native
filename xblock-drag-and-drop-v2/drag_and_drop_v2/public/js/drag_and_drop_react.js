var initializer;

function setInitializer(d) {
	initializer = d;
}

function DragAndDropReact(runtime, element) {
	initializer.setState({
		rtime: runtime,
		elem: element,
		loaded: true
	});
} 