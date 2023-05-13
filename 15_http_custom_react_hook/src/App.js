import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((taskobj) => {
    const loadedTasks = [];
    for (const taskKey in taskobj) {
      loadedTasks.push({ id: taskKey, text: taskobj[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  //傳進去hook的值也要注意 在App rerender會重新create
  const { isLoading, error, sendRequest: fetchTasks } = useHttp(transformTasks);

  useEffect(() => {
    fetchTasks({
      url: "https://react-complete-guide-85a78-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
