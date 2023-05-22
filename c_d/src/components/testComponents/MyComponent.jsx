import { useSelector, useDispatch } from "react-redux";
import {
  addMetric,
  removeMetric,
  selectMetric,
  deselectMetric,
  updateTimeRange,
} from "../../store";

function MyComponent() {
  const metrics = useSelector((state) => state.dashboard.metrics);
  const selectedMetrics = useSelector(
    (state) => state.dashboard.selectedMetrics
  );
  const timeRange = useSelector((state) => state.dashboard.timeRange);
  const dispatch = useDispatch();

  // Use dispatch to call the actions when necessary
  // dispatch(addMetric({ id: 1, name: "CPU Usage" }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const newMetric = {
      id: Math.random(), // Generate a unique ID
      name: event.target.metricName.value,
    };
    dispatch(addMetric(newMetric));
    event.target.reset();
  };

  return (
    // Render your component using the state values
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="metricName">Metric Name:</label>
        <input type="text" id="metricName" name="metricName" required />
        <button type="submit">Add Metric</button>
      </form>
      <h1>Metrics:</h1>
      {metrics.map((metric) => (
        <div key={metric.id}>
          <h2>{metric.name}</h2>
          <button onClick={() => dispatch(removeMetric(metric.id))}>
            Remove
          </button>
          <button onClick={() => dispatch(selectMetric(metric))}>Select</button>
        </div>
      ))}
      <h1>Selected Metrics:</h1>
      {selectedMetrics.map((metric) => (
        <div key={metric.id}>
          <h2>{metric.name}</h2>
          <button onClick={() => dispatch(deselectMetric(metric.id))}>
            Deselect
          </button>
        </div>
      ))}
      <h1>Time Range:</h1>
      <p>Start: {timeRange.start}</p>
      <p>End: {timeRange.end}</p>
      <button
        onClick={() =>
          dispatch(
            updateTimeRange({ start: Date.now() - 7200000, end: Date.now() })
          )
        }
      >
        Update Time Range
      </button>
    </div>
  );
}

export default MyComponent;
